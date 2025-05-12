# backend/inputs/video_session.py

import os
import threading
import cv2
from typing import Optional
import time

from pose_module.pose_tracker import PoseTracker
from core.ejercicios.factory import get_ejercicio
from inputs.base_session import BaseSession

class VideoSession(BaseSession):
    def __init__(self):
        self.pose_tracker = PoseTracker()
        self.contador = None
        self.repeticiones = 0
        self.running = False
        self.thread = None
        self.cap = None
        self.historial_frames = []

    def start(self, nombre_ejercicio: str, fuente: Optional[str] = None):
        if self.running:
            return
        
        if fuente is None:
            raise ValueError("Se debe proporcionar la ruta del archivo de vídeo.")
        
        print(f"🔍 Ruta inicial: {fuente}")
        
        fuente = fuente.strip()  # Elimina saltos de línea, espacios
        if not os.path.isabs(fuente):
            BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
            fuente = os.path.abspath(os.path.join(BASE_DIR, fuente))
        
        print(f"📂 Ruta final a abrir: {fuente}")
        
        print(f"📄 Longitud ruta: {len(fuente)} → Contenido: [{fuente}]")
        for i, c in enumerate(fuente):
            print(f"  [{i}] = {repr(c)}")
        
        if not os.path.exists(fuente):
            print("❌ El archivo de vídeo no existe en el sistema.")
    
        self.cap = cv2.VideoCapture(fuente)
        if not self.cap.isOpened():
            raise RuntimeError(f"No se pudo abrir el archivo de vídeo")

        self.contador = get_ejercicio(nombre_ejercicio)

        self.repeticiones = 0
        self.running = True
        self.thread = threading.Thread(target=self._loop, daemon=True)
        self.thread.start()


    def _loop(self):
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

            frame = self.pose_tracker.dibuja_landmarks(frame, results)
            cv2.imshow("Vídeo - Seguimiento", frame)

            if cv2.waitKey(25) & 0xFF == 27:  # ESC para salir
                self.running = False
        
        print(f"🏁 Procesamiento de vídeo finalizado. Total repeticiones: {self.repeticiones}")
        self._cleanup()


    def stop(self):
        self.running = False
        if self.thread:
            self.thread.join()
        self._cleanup()

    def _cleanup(self):
        if self.cap:
            self.cap.release()
        cv2.destroyAllWindows() # Cierra la ventana al finalizar

    def get_repeticiones(self) -> int:
        return self.repeticiones
