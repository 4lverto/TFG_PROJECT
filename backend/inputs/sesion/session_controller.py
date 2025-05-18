# -------------------------------
# Requierements
# -------------------------------

from typing import Optional
from utils.tipo_entrada_enum import TipoEntrada
from inputs.sesion.session_manager import SessionManager

# -------------------------------
# Helpers
# -------------------------------

session_manager = SessionManager() # Instancia global de la sesión

def iniciar_sesion(tipo: TipoEntrada, nombre_ejercicio: str, fuente: Optional[str] = None, lado: str = "derecho") -> None:
    session_manager.iniciar_sesion(tipo,nombre_ejercicio,fuente,lado)
    
def detener_sesion() -> None:
    session_manager.detener_sesion()
    
def obtener_repeticiones() -> int:
    return session_manager.obtener_repeticiones()

def generar_resumen(reps) -> dict:
    return session_manager.generar_resumen(reps)

def sesion_activa() -> bool:
    return session_manager.sesion_activa()