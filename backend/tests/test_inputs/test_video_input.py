# -------------------------------
# Requierements
# -------------------------------

import sys
import os

from pose_module.pose_tracker import PoseTracker
from inputs.entradas import video_paths as video
import cv2

# -------------------------------
# Helpers
# -------------------------------

sys.path.append(os.path.abspath('.'))

cap = cv2.VideoCapture(video.curl_bicep.curl_bicep1)
pose_tracker = PoseTracker()

while True:
    ret, frame = cap.read()
    if not ret:
        break

    results = pose_tracker.procesar(frame)
    frame = pose_tracker.dibuja_landmarks(frame, results)

    puntos = pose_tracker.extraer_landmarks(results, frame.shape)
    if puntos:
        print("Codo derecho:", puntos[14])  # Ejemplo

    cv2.imshow("Pose - Video", frame)
    if cv2.waitKey(25) & 0xFF == 27:
        break

cap.release()
cv2.destroyAllWindows()
