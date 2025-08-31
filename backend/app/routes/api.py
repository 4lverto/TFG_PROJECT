# -------------------------------
# Requierements
# -------------------------------

from pathlib import Path
from typing import Optional, List

import cv2
from fastapi import APIRouter, Query
from pydantic import BaseModel
from pygrabber.dshow_graph import FilterGraph

from trackerfit.utils.rotacion import Normalizar, GradosRotacion
from trackerfit.utils.ejercicio_enum import EjercicioId
from trackerfit.utils.tipo_entrada_enum import TipoEntrada

from inputs.sesion.session_controller import (
    sesion_activa,
    detener_sesion,
    iniciar_sesion,
    obtener_repeticiones,
    generar_resumen,
)

from app.utils.video_paths import listar_videos_por_ejercicio

# -------------------------------
# Helpers
# -------------------------------

router = APIRouter()

# Estado simple en memoria
ejercicio_actual: Optional[str] = None
historial_ejercicios: List[dict] = []

class IniciarSesionRequest(BaseModel):
    """
    Petición para iniciar un ejercicio.
    """
    tipo: TipoEntrada
    nombre_ejercicio: EjercicioId
    fuente: Optional[str] = None
    lado: Optional[str] = "derecho"
    normalizar: Optional[Normalizar] = "auto"
    forzar_grados_rotacion: Optional[GradosRotacion] = 0
    indice_camara: Optional[int] = 0

@router.post("/iniciar-ejercicio")
async def iniciar_ejercicio(request: IniciarSesionRequest):
    """
    Inicia una nueva sesión de ejercicio.
    Si hay otra sesión activa, primero se detiene.
    """
    global ejercicio_actual
    try:
        # Cierro con seguridad una sesión 'colgada'
        try:
            if sesion_activa():
                detener_sesion()
        except Exception:
            pass

        ejercicio_actual = request.nombre_ejercicio.value

        # Normalizo la ruta de vídeo si es relativa y el tipo de entrada es 'VIDEO' 

        fuente_abs = None
        if request.tipo == TipoEntrada.VIDEO and request.fuente:
            p = Path(request.fuente)
            if not p.is_absolute():
                # parents[3] apunta a la raíz del proyecto, donde se encuentran los vídeos (/recursos).
                project_root = Path(__file__).resolve().parents[3]
                p = (project_root / request.fuente).resolve()
            fuente_abs = str(p)

        iniciar_sesion(
            tipo=request.tipo,
            nombre_ejercicio=request.nombre_ejercicio,
            fuente=fuente_abs, 
            lado=request.lado,
            normalizar=request.normalizar,
            forzar_grados_rotacion=request.forzar_grados_rotacion or 0,
            indice_camara=request.indice_camara or 0,
        )
        
        # return {"mensaje": f"Ejercicio '{ejercicio_actual}' iniciado usando {request.tipo}."}
    except Exception as e:
                return {"error": str(e)}

@router.get("/estado-ejercicio")
async def estado_ejercicio():
    """
    Devuelve el ejercicio en curso y las repeticiones actuales.
    """
    if not ejercicio_actual:
        return {"mensaje": "No hay ejercicio en curso"}

    repeticiones = obtener_repeticiones()
    return {
        "ejercicio": ejercicio_actual,
        "repeticiones": repeticiones
    }

@router.post("/finalizar-ejercicio")
async def finalizar_ejercicio():
    """
    Detiene la sesión y devuelve un resumen de la misma.
    """
    global ejercicio_actual, historial_ejercicios

    if not ejercicio_actual:
        return {"error": "No hay ejercicio en curso"}

    try:
        repeticiones_finales = obtener_repeticiones()
        detener_sesion()
        resumen = generar_resumen(reps=repeticiones_finales)
        historial_ejercicios.append(resumen) 
    finally:
        ejercicio_actual = None
    
    return {"mensaje": f"Ejercicio finalizado con éxito.", "resumen": resumen}

@router.get("/historial")
async def ver_historial():
    """
    Historial de resúmenes de ejercicios anteriores (NO IMPLEMENTADO)
    """
    return {"historial": historial_ejercicios}

@router.get("/videos-disponibles")
async def listar_videos_disponibles(ejercicio: EjercicioId = Query(...)):
    """
    Lista los vídeos de ejemplo disponibles para un ejercicio dado.
    Se eliminan los espacios en blanco.
    """
    videos = listar_videos_por_ejercicio(ejercicio.value)
    return {"videos": videos}

@router.get("/camaras-disponibles")
async def camaras_disponibles():
    """
    Devuelve la lista de cámaras disponibles en el host donde se encuentra el backend.
    Primero lo entienda con DirectShow (Windows). Si falla, se hace un sondeo rápido con OpenCV.
    """
    try:
        names = FilterGraph().get_input_devices()
        devices = [{"index": i, "label":names[i]} for i in range(len(names))]
        return {"devices": devices}
    except Exception:
        # Si no encontramos dispositivos, se devuelve el resultado genérico:
        dispositivos_encontrados = []
        for i in range(4):
            cap = cv2.VideoCapture(i)
            try:
                if cap is not None and cap.isOpened():
                    dispositivos_encontrados.append({"index":i, "label": f"Camara {i}"})
            finally:
                if cap is not None:
                    cap.release()
                
        return {"devices": dispositivos_encontrados}