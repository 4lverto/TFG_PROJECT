# core/ejercicios/ejercicio_enum.py

from enum import Enum

class EjercicioId(str, Enum):
    CURL_BICEP = "curl_bicep"
    SENTADILLA = "sentadilla"
    FLEXION = "flexion"
    PRESS_MILITAR = "press_militar"
    QUAD_EXTENSION = "quad_extension"
    CRUNCH_ABDOMINAL = "crunch_abdominal"
    TRICEP_DIP = "tricep_dip"
    ELEVACION_LATERAL = "elevacion_lateral"
