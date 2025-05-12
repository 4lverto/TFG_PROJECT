# core/ejercicios/ejercicio_enum.py

from enum import Enum

class EjercicioId(str, Enum):
    CURL_BICEP = "curl_bicep"
    SENTADILLA = "sentadilla"
    # FLEXION = "flexion"
    # etc...
