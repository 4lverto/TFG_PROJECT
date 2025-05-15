# core/ejercicios/factory.py

from core.ejercicios.ejercicio_enum import EjercicioId
from core.ejercicios.curl_bicep import CurlBicep
from core.ejercicios.sentadilla import Sentadilla
from core.ejercicios.flexion import Flexion

def get_ejercicio(nombre: EjercicioId, lado='derecho'):
    if nombre == EjercicioId.CURL_BICEP:
        return CurlBicep(lado=lado)
    elif nombre == EjercicioId.SENTADILLA:
        return Sentadilla(lado=lado)
    elif nombre == EjercicioId.FLEXION:
        return Flexion(lado=lado)
    
    raise ValueError(f"Ejercicio desconocido: {nombre}")