# -------------------------------
# Requierements
# -------------------------------

from typing import Optional
from trackerfit.utils.tipo_entrada_enum import TipoEntrada
from trackerfit.session.manager import SessionManager
from trackerfit.utils.rotacion import (
    Normalizar,GradosRotacion
)

# -------------------------------
# Helpers
# -------------------------------

session_manager = SessionManager() # Instancia global de la sesión

def iniciar_sesion(tipo: TipoEntrada, nombre_ejercicio: str, fuente: Optional[str] = None, lado: str = "derecho",normalizar: Normalizar = "auto", forzar_grados_rotacion: GradosRotacion = 0, indice_camara:int = 0) -> None:
    session_manager.iniciar_sesion(tipo,nombre_ejercicio,fuente,lado,normalizar,forzar_grados_rotacion,indice_camara)
    
def detener_sesion() -> None:
    session_manager.detener_sesion()
    
def obtener_repeticiones() -> int:
    return session_manager.obtener_repeticiones()

def generar_resumen(reps) -> dict:
    return session_manager.generar_resumen(reps)

def sesion_activa() -> bool:
    return session_manager.sesion_activa()