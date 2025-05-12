from core.ejercicios.curl_bicep import CurlBicep
# Aquí luego importaremos también: Sentadilla, Flexion, JumpingJack, etc.

def get_ejercicio(nombre: str, lado='derecho'):
    """
    Devuelve una instancia del contador de repeticiones correspondiente
    según el nombre del ejercicio.

    Parámetros:
        nombre: nombre del ejercicio (str)
        lado: 'derecho' o 'izquierdo' (si aplica)

    Retorna:
        Instancia de EjercicioContador.
    """
    nombre = nombre.lower()

    if nombre == "curl_bicep":
        return CurlBicep(lado=lado)
    
    # Aquí irán luego más ejercicios:
    # elif nombre == "sentadilla":
    #     return Sentadilla()
    # elif nombre == "flexion":
    #     return Flexion()

    raise ValueError(f"Ejercicio desconocido: {nombre}")
