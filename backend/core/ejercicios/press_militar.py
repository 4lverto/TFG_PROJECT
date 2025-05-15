# core/ejercicios/press_militar.py
from .base import EjercicioContador

class PressMilitar(EjercicioContador):
    def __init__(self, lado="derecho"):
        if(lado=="derecho"):
            puntos=(14,12,24) # Codo (der) = 14, # Hombro (der) = 12, Cadera (der) = 24
        else:
            puntos=(13,11,23) # Codo (izq) = 13, # Hombro (izq) = 11, Cadera (izq) = 23

        super().__init__(angulo_min=90,angulo_max=160,puntos=puntos)