/////////////////////
// Requirements
/////////////////////


/////////////////////
// Helpers
/////////////////////

interface IniciarSesionEntity {
    tipo: string;
    nombre_ejercicio: string;
    lado: string;
    fuente?: string;
    normalizar?: "horizontal" | "vertical" | "auto";
    forzar_grados_rotacion?: 0 | 90 | 180 | 270;
    indice_camara?: number;
}

/////////////////////
// Public Interface
/////////////////////

export type { IniciarSesionEntity };