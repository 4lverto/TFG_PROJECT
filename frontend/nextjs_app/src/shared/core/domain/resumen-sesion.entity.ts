// src/shared/core/domain/resumen-sesion.entity.ts

export interface ResumenSesion {
    ejercicio: string;
    tipo_entrada: string;
    repeticiones: number;
    inicio: string;
    fin: string;
    duracion_segundos: number;
    duracion_formateada: string;
  }
  