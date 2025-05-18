# inputs/entradas/video_paths.py

import os
import re

# -------------------------------
# Rutas base del proyecto
# -------------------------------

# Ruta absoluta al directorio del backend (dos niveles hacia arriba)
BACKEND_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))

# Ruta absoluta a la carpeta de vídeos
VIDEO_ROOT = os.path.join(BACKEND_DIR, "recursos", "videos")

# -------------------------------
# Diccionario de ejemplos (opcional)
# -------------------------------

VIDEO_PATHS = {
    "curl_bicep": os.path.join(VIDEO_ROOT, "curl_bicep", "curl_bicep_1.mp4"),
    # Puedes añadir más vídeos por defecto si lo necesitas
}

# -------------------------------
# Funciones auxiliares
# -------------------------------

def get_video_path(ejercicio: str) -> str:
    path = VIDEO_PATHS.get(ejercicio)
    if not path:
        raise ValueError(f"Ejercicio desconocido: '{ejercicio}'")
    return path

def listar_videos_por_ejercicio(ejercicio: str) -> list[str]:
    print("Valor original de 'ejercicio':", repr(ejercicio))
    ejercicio = re.sub(r"\s+", "", ejercicio, flags=re.UNICODE)
    carpeta_ejercicio = os.path.join(VIDEO_ROOT, ejercicio)

    print("Buscando vídeos en:", carpeta_ejercicio)

    if not os.path.exists(carpeta_ejercicio):
        print("Carpeta no encontrada.")
        return []

    return [
        os.path.join("recursos", "videos", ejercicio, f).replace("\\", "/")
        for f in os.listdir(carpeta_ejercicio)
        if f.lower().endswith((".mp4", ".mov", ".avi"))
    ]
