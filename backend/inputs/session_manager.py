# backend/inputs/session_manager.py

from typing import Optional
from urllib import request
from inputs.base_session import BaseSession
from inputs.camera_session import CameraSession
from inputs.video_session import VideoSession
from datetime import datetime
from inputs.tipo_entrada_enum import TipoEntrada

class SessionManager:
    def __init__(self):
        self.session: Optional[BaseSession] = None
        self.tipo: Optional[str] = None  # "camera" o "video"
        self.fuente: Optional[str] = None
        self.nombre_ejercicio: Optional[str] = None
        self.start_time: Optional[datetime] = None
        self.end_time: Optional[datetime] = None
        self.historial_temporal = []
        
    def iniciar_sesion(self, tipo: TipoEntrada, nombre_ejercicio, fuente: Optional[str] = None):
        print(f"🔍 Iniciando sesión con tipo={tipo}, ejercicio={nombre_ejercicio}, fuente={fuente}")
        
        if self.session is not None:
            raise RuntimeError("Ya hay una sesión activa.")

        if tipo == TipoEntrada.CAMARA:
            self.session = CameraSession()
            self.session.start(nombre_ejercicio)
        elif tipo == TipoEntrada.VIDEO:
            if not fuente:
                raise ValueError("Se requiere fuente de vídeo para iniciar una sesión de tipo 'video'")
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
            self.historial_temporal = self.session.historial_frames
            self.session = None


    def obtener_repeticiones(self) -> int:
        """
        Devuelve el número actual de repeticiones.
        """
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
        """
        Indica si hay una sesión corriendo.
        """
        return self.session is not None
    
