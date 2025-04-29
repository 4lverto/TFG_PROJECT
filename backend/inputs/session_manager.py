# backend/inputs/session_manager.py

from typing import Optional
from inputs.base_session import BaseSession
from inputs.camera_session import CameraSession
from inputs.video_session import VideoSession

class SessionManager:
    def __init__(self):
        self.session: Optional[BaseSession] = None
        self.tipo: Optional[str] = None  # "camera" o "video"
        self.fuente: Optional[str] = None

    def iniciar_sesion(self, tipo: str, nombre_ejercicio: str, fuente: Optional[str] = None):
        """
        Inicia una nueva sesión (camera o video).
        """
        if self.session is not None:
            raise RuntimeError("Ya hay una sesión activa.")

        if tipo == "camera":
            self.session = CameraSession()
            self.session.start(nombre_ejercicio)
            self.tipo = "camera"
        elif tipo == "video":
            self.session = VideoSession()
            self.session.start(nombre_ejercicio, fuente)
            self.tipo = "video"
            self.fuente = fuente
        else:
            raise ValueError(f"Tipo de sesión desconocido: {tipo}")

    def detener_sesion(self):
        """
        Detiene la sesión activa.
        """
        if self.session:
            self.session.stop()
            self.session = None
            self.tipo = None
            self.fuente = None

    def obtener_repeticiones(self) -> int:
        """
        Devuelve el número actual de repeticiones.
        """
        if self.session:
            return self.session.get_repeticiones()
        return 0

    def sesion_activa(self) -> bool:
        """
        Indica si hay una sesión corriendo.
        """
        return self.session is not None
