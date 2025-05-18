import os
import re

# 📁 Directorio base del proyecto
BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))

# 📁 Carpeta que contiene los vídeos de ejercicios
VIDEO_ROOT = os.path.join(BASE_DIR, "recursos", "videos")

# Diccionario con rutas absolutas a un vídeo por ejercicio (ejemplo)
VIDEO_PATHS = {
    "curl_bicep": os.path.join(VIDEO_ROOT, "curl_bicep", "curl_bicep_1.mp4"),
    # Agrega más si tienes vídeos únicos por ejercicio
}

# Función auxiliar para obtener la ruta a un vídeo específico
def get_video_path(ejercicio: str) -> str:
    path = VIDEO_PATHS.get(ejercicio)
    if not path:
        raise ValueError(f"Ejercicio desconocido: '{ejercicio}'")
    return path

# Función para listar todos los vídeos de un ejercicio (subcarpeta)
def listar_videos_por_ejercicio(ejercicio: str) -> list[str]:
    print("🔍 Valor original de 'ejercicio':", repr(ejercicio))
    ejercicio = re.sub(r"\s+", "", ejercicio, flags=re.UNICODE)
    carpeta_ejercicio = os.path.join(VIDEO_ROOT, ejercicio)

    print("🧪 Buscando vídeos en:", carpeta_ejercicio)

    if not os.path.exists(carpeta_ejercicio):
        print("❌ Carpeta no encontrada.")
        return []

    return [
        os.path.join("recursos", "videos", ejercicio, f).replace("\\", "/")
        for f in os.listdir(carpeta_ejercicio)
        if f.lower().endswith((".mp4", ".mov", ".avi"))
    ]



