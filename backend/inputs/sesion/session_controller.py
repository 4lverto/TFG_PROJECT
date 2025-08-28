# -------------------------------
# Requierements
# -------------------------------

from typing import Optional

from trackerfit.session.manager import SessionManager
from trackerfit.utils.rotacion import Normalizar,GradosRotacion
from trackerfit.utils.tipo_entrada_enum import TipoEntrada

# -------------------------------
# Helpers
# -------------------------------

# Instancia global de la sesión.
session_manager = SessionManager()


def iniciar_sesion(
    tipo: TipoEntrada,
    nombre_ejercicio: str,
    fuente: Optional[str] = None,
    lado: str = "derecho",
    normalizar: Normalizar = "auto",
    forzar_grados_rotacion: GradosRotacion = 0,
    indice_camara:int = 0
        ) -> None:
    session_manager.iniciar_sesion(
        tipo,
        nombre_ejercicio,
        fuente,
        lado,
        normalizar,
        forzar_grados_rotacion,
        indice_camara
    )
    
def detener_sesion() -> None:
    """
    Detiene la sesión actual si existe
    """
    session_manager.detener_sesion()
    
def obtener_repeticiones() -> int:
    """
    Devuelve el contador de repeticiones actual
    """
    return session_manager.obtener_repeticiones()

def generar_resumen(reps: int) -> dict:
    """
    Genera un resumen con las repeticiones finales y otros metadatos
    """
    return session_manager.generar_resumen(reps)

def sesion_activa() -> bool:
    """
    Indica si hay una sesión activa
    """
    return session_manager.sesion_activa()