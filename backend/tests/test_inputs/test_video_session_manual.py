# tests/test_video_session_manual.py
# -------------------------------
# Requierements
# -------------------------------
import sys
import os
import time

from inputs.entradas.video_session import VideoSession

# -------------------------------
# Helpers
# -------------------------------

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

VIDEO_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "recursos", "videos", "curl_bicep", "curl_bicep_1.mp4"))

def main():
    print("Iniciando test de VideoSession...")
    print("Ruta absoluta generada:", VIDEO_PATH)

    session = VideoSession()
    
    if not os.path.exists(VIDEO_PATH):
        print("Ruta no válida:", VIDEO_PATH)
        return
    else:
        print("Ruta encontrada:", VIDEO_PATH)
        
    session.start(nombre_ejercicio="curl_bicep", fuente=VIDEO_PATH)

    tiempo_max = 30
    tiempo_inicio = time.time()
    while session.running and (time.time() - tiempo_inicio) < tiempo_max:
        time.sleep(1)

    print("Sesión finalizada.")
    print(f"Repeticiones detectadas: {session.get_repeticiones()}")

if __name__ == "__main__":
    main()
