# inputs/video_session.py
# -------------------------------
# Requierements
# -------------------------------
import os
import threading
import cv2
import time
import ctypes
from typing import Optional

from pose_module.pose_tracker import PoseTracker
from core.factory import get_ejercicio
from inputs.entradas.base_session import BaseSession

# -------------------------------
# Helpers
# -------------------------------

def get_screen_height():
    return ctypes.windll.user32.GetSystemMetrics(1)  # Altura de pantalla


class VideoSession(BaseSession):
    def __init__(self):
        self.pose_tracker = PoseTracker()
        self.contador = None
        self.repeticiones = 0
        self.running = False
        self.thread = None
        self.cap = None
        self.historial_frames = []

    def start(self, nombre_ejercicio: str, fuente: Optional[str] = None, lado: str = "derecho"):
        if self.running:
            return

        if fuente is None:
            raise ValueError("Se debe proporcionar la ruta del archivo de vídeo.")

        print(f"🔍 Ruta inicial: {fuente}")

        fuente = fuente.strip()
        if not os.path.isabs(fuente):
            BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
            fuente = os.path.abspath(os.path.join(BASE_DIR, fuente))

        print(f"📂 Ruta final a abrir: {fuente}")

        if not os.path.exists(fuente):
            print("❌ El archivo de vídeo no existe en el sistema.")
            return

        self.cap = cv2.VideoCapture(fuente)
        if not self.cap.isOpened():
            raise RuntimeError(f"No se pudo abrir el archivo de vídeo")

        self.contador = get_ejercicio(nombre_ejercicio,lado)

        self.repeticiones = 0
        self.running = True
        self.thread = threading.Thread(target=self._loop, daemon=True)
        self.thread.start()

    def _loop(self):
        pantalla_alto = get_screen_height()
        nuevo_alto = pantalla_alto - 120

        # Crear ventana solo una vez
        cv2.namedWindow("Vídeo - Seguimiento", cv2.WINDOW_NORMAL)
        cv2.moveWindow("Vídeo - Seguimiento", 100, 100)

        while self.running and self.cap.isOpened():
            ret, frame = self.cap.read()
            if not ret:
                print("Fin del vídeo o error al leer")
                self.running = False
                break

            results = self.pose_tracker.procesar(frame)
            puntos = self.pose_tracker.extraer_landmarks(results, frame.shape)

            if puntos and self.contador:
                angulo, reps = self.contador.actualizar(puntos)
                self.repeticiones = reps

                timestamp = time.time()
                estado = "activo" if self.contador.arriba or self.contador.abajo else "reposo"

                self.historial_frames.append({
                    "timestamp": timestamp,
                    "angulo": angulo if angulo is not None else None,
                    "repeticiones": self.repeticiones,
                    "estado": estado,
                    "landmarks": puntos
                })

            if results:
                frame = self.pose_tracker.dibuja_landmarks(frame, results)

                alto_original, ancho_original = frame.shape[:2]
                ratio = nuevo_alto / alto_original
                nuevo_ancho = int(ancho_original * ratio)
                frame = cv2.resize(frame, (nuevo_ancho, nuevo_alto))

                cv2.imshow("Vídeo - Seguimiento", frame)

            if cv2.waitKey(25) & 0xFF == 27:
                self.running = False

        print(f"Procesamiento de vídeo finalizado. Total repeticiones: {self.repeticiones}")
        self._cleanup()

    def stop(self):
        self.running = False
        if self.thread:
            self.thread.join()
        self._cleanup()

    def _cleanup(self):
        if self.cap:
            self.cap.release()
        cv2.destroyAllWindows()

    def get_repeticiones(self) -> int:
        return self.repeticiones
