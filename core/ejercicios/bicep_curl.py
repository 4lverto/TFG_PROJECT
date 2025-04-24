from .base import EjercicioContador
from utils.angulos import calcular_angulo_landmarks

class BicepCurl(EjercicioContador):
    def __init__(self, lado='derecho'):
        super().__init__()
        self.lado = lado
        self.angulo_min = 40
        self.angulo_max = 160

        if lado == 'derecho':
            self.hombro, self.codo, self.muñeca = 12, 14, 16
        else:
            self.hombro, self.codo, self.muñeca = 11, 13, 15

    def actualizar(self, puntos):
        if not all(k in puntos for k in [self.hombro, self.codo, self.muñeca]):
            return None, self.reps

        angulo = calcular_angulo_landmarks(puntos, self.hombro, self.codo, self.muñeca)

        if angulo >= self.angulo_max:
            self.arriba = True
        if self.arriba and not self.abajo and angulo <= self.angulo_min:
            self.abajo = True
        if self.arriba and self.abajo and angulo >= self.angulo_max:
            self.reps += 1
            self.arriba = False
            self.abajo = False

        return angulo, self.reps
