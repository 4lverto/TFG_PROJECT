# core/ejercicios/factory.py

from core.ejercicio_enum import EjercicioId
from core.ejercicios.curl_bicep import CurlBicep
from core.ejercicios.sentadilla import Sentadilla
from core.ejercicios.flexion import Flexion
from core.ejercicios.press_militar import PressMilitar
from core.ejercicios.quad_extension import QuadExtension
from core.ejercicios.crunch_abdominal import CrunchAbdominal
from core.ejercicios.tricep_dip import TricepDip
from core.ejercicios.elevacion_lateral import ElevacionLateral


def get_ejercicio(nombre: EjercicioId, lado='derecho'):
    if nombre == EjercicioId.CURL_BICEP:
        return CurlBicep(lado=lado)
    elif nombre == EjercicioId.SENTADILLA:
        return Sentadilla(lado=lado)
    elif nombre == EjercicioId.FLEXION:
        return Flexion(lado=lado)
    elif(nombre == EjercicioId.PRESS_MILITAR):
        return PressMilitar(lado=lado)
    elif(nombre == EjercicioId.QUAD_EXTENSION):
        return QuadExtension(lado=lado)
    elif(nombre == EjercicioId.CRUNCH_ABDOMINAL):
        return CrunchAbdominal(lado=lado)
    elif(nombre == EjercicioId.TRICEP_DIP):
        return TricepDip(lado=lado)
    elif(nombre == EjercicioId.ELEVACION_LATERAL):
        return ElevacionLateral(lado=lado)
        

    raise ValueError(f"Ejercicio desconocido: {nombre}")