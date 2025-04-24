# core/ejercicios.py

from abc import ABC, abstractmethod
from utils.angulos import calcular_angulo_landmarks

class EjercicioContador(ABC):
    def __init__(self):
        self.reps = 0
        self.arriba = False
        self.abajo = False

    @abstractmethod
    def actualizar(self, puntos):
        """Actualiza el estado del ejercicio con los puntos actuales.
        Retorna: (ángulo, repeticiones)"""
        pass

    def reset(self):
        self.reps = 0
        self.arriba = False
        self.abajo = False

    def get_reps(self):
        return self.reps
