# -------------------------------
# Requierements
# -------------------------------
from fastapi import APIRouter, Query
from pathlib import Path
from pydantic import BaseModel
from typing import Optional, List

from trackerfit.utils.ejercicio_enum import EjercicioId
from trackerfit.utils.tipo_entrada_enum import TipoEntrada
from app.utils.video_paths import listar_videos_por_ejercicio
from inputs.sesion.session_controller import (
    iniciar_sesion,
    detener_sesion,
    obtener_repeticiones,
    generar_resumen,
    sesion_activa,
)

# -------------------------------
# Helpers
# -------------------------------

router = APIRouter()

ejercicio_actual: Optional[str] = None
historial_ejercicios: List[dict] = []

class IniciarSesionRequest(BaseModel):
    tipo: TipoEntrada
    nombre_ejercicio: EjercicioId
    fuente: Optional[str] = None
    lado: Optional[str] = "derecho"

@router.post("/iniciar-ejercicio")
async def iniciar_ejercicio(request: IniciarSesionRequest):
    global ejercicio_actual

    if sesion_activa():
        return {"error": "Ya hay un ejercicio en curso"}

    ejercicio_actual = request.nombre_ejercicio.value

    try:
        fuente_abs = None
        if request.tipo == TipoEntrada.VIDEO and request.fuente:
            p = Path(request.fuente)
            if not p.is_absolute():
                # __file__ = .../app/routes/api.py
                # parents[3] -> TFG_PROJECT (raíz), donde está "recursos/"
                project_root = Path(__file__).resolve().parents[3]
                p = (project_root / request.fuente).resolve()
            fuente_abs = str(p)

        iniciar_sesion(
            tipo=request.tipo,  # pasa el enum, el controller ya hace pass-through al SessionManager
            nombre_ejercicio=request.nombre_ejercicio,
            fuente=fuente_abs,  # <-- usa la ruta ABSOLUTA correcta
            lado=request.lado,
        )
    except Exception as e:
        return {"error": str(e)}

    return {"mensaje": f"Ejercicio '{ejercicio_actual}' iniciado usando {request.tipo}."}

@router.get("/estado-ejercicio")
async def estado_ejercicio():
    if not ejercicio_actual:
        return {"mensaje": "No hay ejercicio en curso"}

    repeticiones = obtener_repeticiones()
    return {
        "ejercicio": ejercicio_actual,
        "repeticiones": repeticiones
    }

@router.post("/finalizar-ejercicio")
async def finalizar_ejercicio():
    global ejercicio_actual, historial_ejercicios

    if not ejercicio_actual:
        return {"error": "No hay ejercicio en curso"}

    repeticiones_finales = obtener_repeticiones()
    detener_sesion()
    resumen = generar_resumen(reps=repeticiones_finales)
    
    historial_ejercicios.append(resumen)
    ejercicio_actual = None
    return {"mensaje": f"Actividad finalizada con éxito.", "resumen": resumen}

@router.get("/historial")
async def ver_historial():
    return {"historial": historial_ejercicios}

@router.get("/videos-disponibles")
async def listar_videos_disponibles(ejercicio: EjercicioId = Query(...)):
    videos = listar_videos_por_ejercicio(ejercicio.value)
    return {"videos": videos}