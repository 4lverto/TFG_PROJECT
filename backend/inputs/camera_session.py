# backend/inputs/camera_session.py

import threading
import cv2
from typing import Optional

from pose_module.pose_tracker import PoseTracker
from core.ejercicios.factory import get_ejercicio
from inputs.base_session import BaseSession

class CameraSession(BaseSession):
    def __init__(self):
        self.pose_tracker = PoseTracker()
        self.contador = None
        self.repeticiones = 0
        self.running = False
        self.thread = None
        self.cap = None

    def start(self, nombre_ejercicio: str):
        print("🚀 CameraSession.start() invocado")
        if self.running:
            return
        
        self.cap = cv2.VideoCapture(0)
        if not self.cap.isOpened():
            print("❌ Cámara no se pudo abrir")
            raise RuntimeError("No se pudo abrir la cámara")

        self.contador = get_ejercicio(nombre_ejercicio)

        self.repeticiones = 0
        self.running = True
        print("🚀 Lanzando hilo de cámara")
        self.thread = threading.Thread(target=self._loop, daemon=True)
        self.thread.start()

    def _loop(self):
        print("🎥 Entrando en bucle de captura de cámara")
        while self.running and self.cap.isOpened():
            ret, frame = self.cap.read()
            if not ret:
                print("❌ No se pudo capturar frame")
                break

            print("📸 Frame capturado correctamente")
            results = self.pose_tracker.procesar(frame)
            puntos = self.pose_tracker.extraer_landmarks(results, frame.shape)

            if puntos and self.contador:
                angulo, reps = self.contador.actualizar(puntos)
                self.repeticiones = reps

            # 🧠 Mostrar ventana de cámara (nuevo)
            frame = self.pose_tracker.dibuja_landmarks(frame, results)
            cv2.imshow("Cámara - Seguimiento de Ejercicio", frame)

            if cv2.waitKey(1) & 0xFF == 27:  # Presionar ESC para detener sesión
                self.running = False

        self._cleanup()


    def stop(self):
        self.running = False
        if self.thread:
            self.thread.join()
        self._cleanup()

    def _cleanup(self):
        if self.cap:
            self.cap.release()
        cv2.destroyAllWindows()  # Cierra la ventana al finalizar


    def get_repeticiones(self) -> int:
        return self.repeticiones
