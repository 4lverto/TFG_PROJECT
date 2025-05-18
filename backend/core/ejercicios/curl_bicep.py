# core/ejercicios/curl_bicep.py

from ..base import EjercicioContador

class CurlBicep(EjercicioContador):
    def __init__(self, lado='derecho'):
        if lado == 'derecho':
            puntos = (12, 14, 16)  # hombro, codo, muñeca
        else:
            puntos = (11, 13, 15)

        super().__init__(angulo_min=40, angulo_max=160, puntos=puntos)