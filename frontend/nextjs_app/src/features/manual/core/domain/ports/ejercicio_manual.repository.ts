import { ResumenSesion } from "@/shared/core/domain/resumen_sesion.entity";
import { TipoEntradaEnum } from "@/shared/core/enums/tipo_entrada.enum";

interface BaseEjercicioManualRepository {
  
  iniciarEjercicioManual(tipo: TipoEntradaEnum, ejercicio: string, fuente?: string, lado?: "derecho" | "izquierdo"): Promise<string>

  obtenerRepeticionesEjercicioManual(): Promise<number>;

  finalizarEjercicioManual(): Promise<{ mensaje: string; resumen: ResumenSesion }>;

  listarVideosEjercicioManual(ejercicio: string): Promise<string[]>;
}

export type { BaseEjercicioManualRepository };