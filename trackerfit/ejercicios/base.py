# core/ejercicios/base.py
# -------------------------------
# Requierements
# -------------------------------
from abc import ABC
from trackerfit.utils.angulos import calcular_angulo_landmarks

# -------------------------------
# Helpers
# -------------------------------

class Ejercicio(ABC):
    def __init__(self, angulo_min, angulo_max, puntos):
        """
        puntos: (id1, id2, id3) → Por ejemplo, (hombro, codo, muñeca)
        angulo_min: ángulo en posición contraída
        angulo_max: ángulo en posición extendida
        """
        self.reps = 0
        self.arriba = False
        self.abajo = False
        self.angulo_min = angulo_min
        self.angulo_max = angulo_max
        self.id1, self.id2, self.id3 = puntos

    def actualizar(self, puntos_detectados):
        # Si no tenemos todos los puntos necesarios, ignoramos frame
        if not all(k in puntos_detectados for k in [self.id1, self.id2, self.id3]):
            return None, self.reps

        # Frame a frame iremos calculando el ángulo que forman los puntos clave del ejercicio,buscando detectar transiciones.
        angulo = calcular_angulo_landmarks(puntos_detectados, self.id1, self.id2, self.id3)
        self.detectar_transicion(angulo) # Si se detectara una transición entre arriba y abajo, se agregaría una repetición.
        
        return angulo, self.reps

    def detectar_transicion(self, angulo):
        """
        Detecta cambio de estado y suma repetición si se completa un ciclo (arriba -> abajo -> arriba)
        """
        if angulo >= self.angulo_max:
            self.arriba = True
        if self.arriba and not self.abajo and angulo <= self.angulo_min:
            self.abajo = True
        if self.arriba and self.abajo and angulo >= self.angulo_max:
            self.reps += 1 # Cuando detectamos que ya ha subido y bajado añadimos una repetición
            self.arriba = False
            self.abajo = False

    def reset(self):
        self.reps = 0
        self.arriba = False
        self.abajo = False

    def get_reps(self):
        return self.reps
