# app/main.py
# -------------------------------
# Requierements
# -------------------------------

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.api import router

# -------------------------------
# Helpers
# -------------------------------

app = FastAPI(
    title="TFG Visión Artificial API",
    description="API para gestionar ejercicios físicos con MediaPipe",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)

@app.get("/")
async def root():
    return {"mensaje": "API del TFG funcionando correctamente"}
