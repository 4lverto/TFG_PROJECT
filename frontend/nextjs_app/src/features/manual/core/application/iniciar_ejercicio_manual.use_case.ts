/////////////////////
// Requirements
/////////////////////

import { BaseEjercicioManualRepository } from "../domain/ports/ejercicio_manual.repository";
import { TipoEntradaEnum } from "@/shared/core/enums/tipo_entrada.enum";

/////////////////////
// Helpers
/////////////////////

class IniciarEjercicioManualUseCase {
  constructor(private repo: BaseEjercicioManualRepository) { }

  async execute(
    tipo: TipoEntradaEnum,
    ejercicio: string,
    fuente?: string,
    lado: "derecho" | "izquierdo" = "derecho",
    normalizar: "horizontal" | "vertical" | "auto" = "auto",
    forzar_grados_rotacion: 0 | 90 | 180 | 270 = 0,
    indice_camara: number = 0,
  ): Promise<string> {
    return await this.repo.iniciarEjercicioManual(
      tipo,
      ejercicio,
      fuente,
      lado,
      normalizar,
      forzar_grados_rotacion,
      indice_camara
    );
  }
}

/////////////////////
// Public Interface
/////////////////////

export { IniciarEjercicioManualUseCase };