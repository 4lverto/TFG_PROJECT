# core/inputs/tipo_entrada_enum.py

from enum import Enum

class TipoEntrada(str, Enum):
    CAMARA = "camera"
    VIDEO = "video"
