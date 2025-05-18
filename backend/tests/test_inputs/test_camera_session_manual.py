# -------------------------------
# Requierements
# -------------------------------

import sys, os, time

from inputs.entradas.camera_session import CameraSession

# -------------------------------
# Helpers
# -------------------------------

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

def main():
    session = CameraSession()
    session.start(nombre_ejercicio="curl_bicep")  # Usa ejercicio ya registrado
    print("Cámara iniciada. Haz repeticiones. Pulsa ESC para terminar.")
    while session.running:
        time.sleep(1)
    print(f"Finalizado. Total reps: {session.get_repeticiones()}")

if __name__ == "__main__":
    main()
