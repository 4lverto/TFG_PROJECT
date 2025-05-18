# -------------------------------
# Requierements
# -------------------------------

from math import acos, degrees
import numpy as np

# -------------------------------
# Helpers
# -------------------------------

def calcular_angulo(p1, p2, p3) -> float:
    a = np.array(p1)
    b = np.array(p2)
    c = np.array(p3)

    ba = a - b
    bc = c - b

    coseno = np.dot(ba, bc) / (np.linalg.norm(ba) * np.linalg.norm(bc))
    coseno = np.clip(coseno, -1.0, 1.0)
    angulo = degrees(acos(coseno))
    return angulo

def calcular_angulo_landmarks(puntos: dict, id1: int, id2: int, id3: int) -> float:
    p1 = (puntos[id1]['x'], puntos[id1]['y'])
    p2 = (puntos[id2]['x'], puntos[id2]['y'])
    p3 = (puntos[id3]['x'], puntos[id3]['y'])
    return calcular_angulo(p1, p2, p3)
