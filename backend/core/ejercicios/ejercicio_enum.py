# core/ejercicios/ejercicio_enum.py

from enum import Enum

class EjercicioId(str, Enum):
    CURL_BICEP = "curl_bicep"
    # Aquí irás agregando más:
    # SENTADILLA = "sentadilla"
    # FLEXION = "flexion"
