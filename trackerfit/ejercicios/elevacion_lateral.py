# core/ejercicios/elevacion_lateral.py
# -------------------------------
# Requierements
# -------------------------------
from trackerfit.ejercicios.base import Ejercicio

# -------------------------------
# Helpers
# -------------------------------

class ElevacionLateral(Ejercicio):
    def __init__(self, lado="derecho"):
            if lado=='derecho':
                puntos = (16,12,24) # Cadera (der) = 24 , Hombro (der) = 12 y Codo (der) = 14
            else:
                puntos = (15,11,23) # Hombro (izq) = 23 , Codo (izq) = 11 y Muñeca (izq) = 13

            super().__init__(angulo_min=40,angulo_max=90,puntos=puntos)
            self.umbral_validacion = self.angulo_min