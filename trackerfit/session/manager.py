# trackerfit/session/manager.py
# -------------------------------
# Requierements
# -------------------------------

from typing import Optional
from datetime import datetime

from trackerfit.session.base import BaseSession
from trackerfit.session.camera import CameraSession
from trackerfit.session.video import VideoSession
from trackerfit.utils.tipo_entrada_enum import TipoEntrada

# -------------------------------
# Helpers
# -------------------------------

class SessionManager:
    def __init__(self):
        self.session: Optional[BaseSession] = None
        self.tipo: Optional[str] = None
        self.fuente: Optional[str] = None
        self.nombre_ejercicio: Optional[str] = None
        self.start_time: Optional[datetime] = None
        self.end_time: Optional[datetime] = None
        self.historial_temporal = []

    def iniciar_sesion(self, tipo: TipoEntrada, nombre_ejercicio: str, fuente: Optional[str] = None, lado: str = "derecho"):
        if self.session is not None:
            raise RuntimeError("Ya hay una sesión activa.")

        if tipo == TipoEntrada.CAMARA:
            self.session = CameraSession()
            self.session.start(nombre_ejercicio, lado)
        elif tipo == TipoEntrada.VIDEO:
            if not fuente:
                raise ValueError("Se requiere fuente de vídeo para una sesión tipo 'video'")
            self.session = VideoSession()
            self.session.start(nombre_ejercicio, fuente, lado)
        else:
            raise ValueError(f"Tipo de sesión desconocido: {tipo}")

        self.tipo = tipo
        self.fuente = fuente
        self.nombre_ejercicio = nombre_ejercicio
        self.start_time = datetime.now()

    def detener_sesion(self):
        if self.session:
            self.session.stop()
            self.end_time = datetime.now()
            self.historial_temporal = self.session.historial_frames
            self.session = None

    def obtener_repeticiones(self) -> int:
        if self.session:
            return self.session.get_repeticiones()
        return 0

    def generar_resumen(self, reps: int) -> dict:
        if not self.start_time or not self.end_time:
            return {}

        duracion = self.end_time - self.start_time

        return {
            "ejercicio": self.nombre_ejercicio,
            "tipo_entrada": self.tipo,
            "repeticiones": reps,
            "inicio": self.start_time.isoformat(),
            "fin": self.end_time.isoformat(),
            "duracion_segundos": int(duracion.total_seconds()),
            "duracion_formateada": str(duracion),
            "detalles_frame_a_frame": self.historial_temporal
        }

    def sesion_activa(self) -> bool:
        return self.session is not None