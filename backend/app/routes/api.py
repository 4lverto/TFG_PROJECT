# app/routes/api.py
# -------------------------------
# Requierements
# -------------------------------
from fastapi import APIRouter, Query
from pydantic import BaseModel
from typing import Optional, List

from trackerfit.utils.ejercicio_enum import EjercicioId
from trackerfit.utils.tipo_entrada_enum import TipoEntrada
from trackerfit.session.video_paths import listar_videos_por_ejercicio
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
        iniciar_sesion(
            tipo=request.tipo.value,
            nombre_ejercicio=request.nombre_ejercicio,
            fuente=request.fuente,
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