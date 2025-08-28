/////////////////////
// Requirements
/////////////////////

import { ResumenSesion } from "@/shared/core/domain/resumen_sesion.entity";
import { TipoEntradaEnum } from "@/shared/core/enums/tipo_entrada.enum";

/////////////////////
// Helpers
/////////////////////

interface BaseEjercicioManualRepository {

  iniciarEjercicioManual(
    tipo: TipoEntradaEnum,
    ejercicio: string,
    fuente?: string,
    lado?: "derecho" | "izquierdo",
    normalizar?: "horizontal" | "vertical" | "auto",
    forzar_grados_rotacion?: 0 | 90 | 180 | 270,
    indice_camara?: number
  ): Promise<string>

  obtenerRepeticionesEjercicioManual(): Promise<number>;

  finalizarEjercicioManual(): Promise<{ mensaje: string; resumen: ResumenSesion }>;

  listarVideosEjercicioManual(ejercicio: string): Promise<string[]>;
}

/////////////////////
// Public Interface
/////////////////////

export type { BaseEjercicioManualRepository };