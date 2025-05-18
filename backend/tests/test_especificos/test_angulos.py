# -------------------------------
# Requierements
# -------------------------------

import sys
import os

import cv2
import numpy as np
from utils.angulos import calcular_angulo

# -------------------------------
# Helpers
# -------------------------------

sys.path.append(os.path.abspath('.'))

# Puntos simulados (ejemplo: cadera, rodilla, tobillo)
p1 = (250, 300)  # cadera
p2 = (250, 400)  # rodilla (vértice)
p3 = (350, 400)  # tobillo

angulo = calcular_angulo(p1, p2, p3)
print(f"Ángulo calculado: {angulo:.2f}°")

# Visualización (opcional pero útil)
imagen = np.zeros((500, 500, 3), dtype=np.uint8)
cv2.line(imagen, p1, p2, (0, 255, 0), 2)
cv2.line(imagen, p2, p3, (0, 255, 0), 2)

# Puntos
cv2.circle(imagen, p1, 5, (0, 0, 255), -1)
cv2.circle(imagen, p2, 5, (255, 0, 0), -1)
cv2.circle(imagen, p3, 5, (0, 0, 255), -1)

# Texto con el ángulo
cv2.putText(imagen, f"{angulo:.2f}°", (p2[0] + 10, p2[1] - 10),
            cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 255, 255), 2)

cv2.imshow("Ángulo entre puntos simulados", imagen)
cv2.waitKey(0)
cv2.destroyAllWindows()
