import sys
import os
sys.path.append(os.path.abspath('.'))

import cv2
from pose_module.pose_tracker import PoseTracker
from core.ejercicios.factory import get_ejercicio  # 🔥 usamos la fábrica
from core import video_paths as videos

# Argumento: 1 = vídeo, 2 = cámara
modo = sys.argv[1] if len(sys.argv) > 1 else '1'

if modo == '1':
    cap = cv2.VideoCapture(videos.curl_bicep.curl_bicep1)
    print("🔁 Modo: Reproduciendo vídeo local.")
elif modo == '2':
    cap = cv2.VideoCapture(0)
    print("🎥 Modo: Cámara en vivo.")
else:
    print("❌ Argumento no válido. Usa '1' para vídeo o '2' para cámara.")
    sys.exit(1)

pose_tracker = PoseTracker()

# 🎯 Creamos el contador de ejercicio dinámicamente
contador = get_ejercicio("bicep_curl", lado="derecho")

while True:
    ret, frame = cap.read()
    if not ret:
        break

    results = pose_tracker.procesar(frame)
    puntos = pose_tracker.extraer_landmarks(results, frame.shape)

    angulo, reps = contador.actualizar(puntos)
    if angulo is not None:
        cv2.putText(frame, f"Ángulo: {int(angulo)}", (30, 30),
                    cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 255), 2)
        cv2.putText(frame, f"Reps: {reps}", (30, 70),
                    cv2.FONT_HERSHEY_SIMPLEX, 1.2, (0, 255, 0), 3)

    frame = pose_tracker.dibuja_landmarks(frame, results)
    cv2.imshow("Curl Bíceps", frame)

    if cv2.waitKey(20) & 0xFF == 27:  # Esc para salir
        break

cap.release()
cv2.destroyAllWindows()
