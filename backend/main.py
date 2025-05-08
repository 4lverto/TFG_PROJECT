# backend/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional

from inputs.session_manager import SessionManager

# Crear instancia FastAPI
app = FastAPI(
    title="TFG Visión Artificial API",
    description="API para gestionar ejercicios físicos con MediaPipe",
    version="1.0.0"
)

# Middleware CORS (Permitir conexión frontend localhost:3000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Estado global
session_manager = SessionManager()
ejercicio_actual: Optional[str] = None
historial_ejercicios: List[dict] = []

# Modelos
class IniciarSesionRequest(BaseModel):
    tipo: str  # "camera" o "video"
    nombre_ejercicio: str
    fuente: Optional[str] = None  # Ruta vídeo si aplica

# Rutas API
@app.get("/")
async def root():
    return {"mensaje": "API del TFG funcionando correctamente 🎯"}

@app.post("/iniciar-ejercicio")
async def iniciar_ejercicio(request: IniciarSesionRequest):
    global ejercicio_actual

    if session_manager.sesion_activa():
        return {"error": "Ya hay un ejercicio en curso"}

    ejercicio_actual = request.nombre_ejercicio
    try:
        session_manager.iniciar_sesion(
            tipo=request.tipo,
            nombre_ejercicio=request.nombre_ejercicio,
            fuente=request.fuente
        )
    except Exception as e:
        return {"error": str(e)}

    return {"mensaje": f"Ejercicio '{ejercicio_actual}' iniciado usando {request.tipo}."}

@app.get("/estado-ejercicio")
async def estado_ejercicio():
    if not ejercicio_actual:
        return {"mensaje": "No hay ejercicio en curso"}

    repeticiones = session_manager.obtener_repeticiones()

    return {
        "ejercicio": ejercicio_actual,
        "repeticiones": repeticiones
    }

@app.post("/finalizar-ejercicio")
async def finalizar_ejercicio():
    global ejercicio_actual, historial_ejercicios

    if not ejercicio_actual:
        return {"error": "No hay ejercicio en curso"}

    repeticiones_finales = session_manager.obtener_repeticiones()
    session_manager.detener_sesion()
    resumen = session_manager.generar_resumen(reps=repeticiones_finales)
    
    historial_ejercicios.append(resumen)
    ejercicio_actual = None
    return {"mensaje": f"Actividad finalizada con éxito." , "resumen": resumen}

@app.get("/historial")
async def ver_historial():
    return {"historial": historial_ejercicios}
