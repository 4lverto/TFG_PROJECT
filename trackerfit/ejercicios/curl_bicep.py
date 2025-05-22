# core/ejercicios/curl_bicep.py
# -------------------------------
# Requierements
# -------------------------------
from trackerfit.ejercicios.base import Ejercicio

# -------------------------------
# Helpers
# -------------------------------
class CurlBicep(Ejercicio):
    def __init__(self, lado='derecho'):
        if lado == 'derecho':
            puntos = (12, 14, 16)  # hombro, codo, muñeca
        else:
            puntos = (11, 13, 15)

        super().__init__(angulo_min=30, angulo_max=160, puntos=puntos)
        self.umbral_validacion = self.angulo_min