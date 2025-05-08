# backend/inputs/session_manager.py

from typing import Optional
from inputs.base_session import BaseSession
from inputs.camera_session import CameraSession
from inputs.video_session import VideoSession
from datetime import datetime

class SessionManager:
    def __init__(self):
        self.session: Optional[BaseSession] = None
        self.tipo: Optional[str] = None  # "camera" o "video"
        self.fuente: Optional[str] = None
        self.nombre_ejercicio: Optional[str] = None
        self.start_time: Optional[datetime] = None
        self.end_time: Optional[datetime] = None
        

    def iniciar_sesion(self, tipo: str, nombre_ejercicio: str, fuente: Optional[str] = None):
        """
        Inicia una nueva sesión (camera o video).
        """
        if self.session is not None:
            raise RuntimeError("Ya hay una sesión activa.")

        if tipo == "camera":
            self.session = CameraSession()
            self.session.start(nombre_ejercicio)
        elif tipo == "video":
            self.session = VideoSession()
            self.session.start(nombre_ejercicio, fuente)
        else:
            raise ValueError(f"Tipo de sesión desconocido: {tipo}")

        self.tipo = tipo
        self.fuente = fuente
        self.nombre_ejercicio = nombre_ejercicio
        self.start_time = datetime.now()

    def detener_sesion(self):
        """
        Detiene la sesión activa.
        """
        if self.session:
            self.session.stop()
            self.end_time = datetime.now()
            self.session = None

    def obtener_repeticiones(self) -> int:
        """
        Devuelve el número actual de repeticiones.
        """
        if self.session:
            return self.session.get_repeticiones()
        return 0
    
    def generar_resumen(self) -> dict:
        if not self.start_time or not self.end_time:
            return {}
        
        duracion = self.end_time - self.start_time
        reps  = self.session.get_repeticiones() if self.session else 0
        
        return{
            "Ejercicio" : self.nombre_ejercicio,
            "Tipo_entrada": self.tipo,
            "Repeticiones": reps,
            "Inicio": self.start_time,
            "Final": self.end_time,
            "Duracion segundos": int(duracion.total_seconds()),
            "Duracion formateada": str(duracion)
        }
    
    def sesion_activa(self) -> bool:
        """
        Indica si hay una sesión corriendo.
        """
        return self.session is not None
