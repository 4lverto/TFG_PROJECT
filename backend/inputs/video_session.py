# backend/inputs/video_session.py

import threading
import cv2
from typing import Optional

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

    def start(self, nombre_ejercicio: str, fuente: Optional[str] = None):
        if self.running:
            return
        
        if fuente is None:
            raise ValueError("Se debe proporcionar la ruta del archivo de vídeo.")

        self.cap = cv2.VideoCapture(fuente)
        if not self.cap.isOpened():
            raise RuntimeError(f"No se pudo abrir el archivo de vídeo: {fuente}")

        self.contador = get_ejercicio(nombre_ejercicio)

        self.repeticiones = 0
        self.running = True
        self.thread = threading.Thread(target=self._loop, daemon=True)
        self.thread.start()



    def _loop(self):
        while self.running and self.cap.isOpened():
            ret, frame = self.cap.read()
            if not ret:
                break

            results = self.pose_tracker.procesar(frame)
            puntos = self.pose_tracker.extraer_landmarks(results, frame.shape)

            if puntos and self.contador:
                _, reps = self.contador.actualizar(puntos)
                self.repeticiones = reps

            frame = self.pose_tracker.dibuja_landmarks(frame, results)
            cv2.imshow("Vídeo - Seguimiento de Ejercicio", frame)

            if cv2.waitKey(25) & 0xFF == 27:
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
        # cv2.destroyAllWindows()

    def get_repeticiones(self) -> int:
        return self.repeticiones
