from math import acos, degrees
import numpy as np

def calcular_angulo(p1, p2, p3) -> float:
    """
    Calcula el ángulo entre tres puntos (en píxeles) usando trigonometría.
    El ángulo se forma en el punto p2, entre los segmentos p2p1 y p2p3.

    Parámetros:
        p1, p2, p3: Tuplas o arrays (x, y)

    Retorna:
        Ángulo en grados (float)
    """
    a = np.array(p1)
    b = np.array(p2)
    c = np.array(p3)

    ba = a - b
    bc = c - b

    coseno = np.dot(ba, bc) / (np.linalg.norm(ba) * np.linalg.norm(bc))
    coseno = np.clip(coseno, -1.0, 1.0)  # evita errores por redondeo

    angulo = degrees(acos(coseno))
    return angulo
