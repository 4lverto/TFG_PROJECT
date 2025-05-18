# -------------------------------
# Requierements
# -------------------------------

import sys
import os

from pose_module.pose_tracker import PoseTracker
import cv2

# -------------------------------
# Requierements
# -------------------------------

sys.path.append(os.path.abspath('.'))

# Abrimos la webcam y creamos una instancia de la clase PoseTracker para inicializar el modelo de pose de MediaPipe
cap = cv2.VideoCapture(0)
pose_tracker = PoseTracker()

while True:
    # Leemos cada frame que nos proporciona la cámara y si falla por lo que sea, se sale.
    ret, frame = cap.read()
    if not ret:
        break
    
    # Se procesa cada frame con MediaPipe y se dibujan los puntos y conexiones del cuerpo
    results = pose_tracker.procesar(frame)
    frame = pose_tracker.dibuja_landmarks(frame, results)

    # Extraigo los puntos clave del cuerpo y muestro por consola las coordenadas del codo derecho (id 14)
    puntos = pose_tracker.extraer_landmarks(results, frame.shape)
    if puntos:
        print("Codo derecho:", puntos[14])  # Ejemplo

    # Muestro el frame con los puntos dibujados y salimos del bucle al pulsar ESC
    cv2.imshow("Pose", frame)
    if cv2.waitKey(1) & 0xFF == 27:
        break

cap.release()
cv2.destroyAllWindows()
