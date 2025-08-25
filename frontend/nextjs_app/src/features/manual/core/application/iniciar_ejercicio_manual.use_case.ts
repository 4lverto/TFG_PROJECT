/////////////////////
// Requirements
/////////////////////

import { TipoEntradaEnum } from "@/shared/core/enums/tipo_entrada.enum";
import { BaseEjercicioManualRepository } from "../domain/ports/ejercicio_manual.repository";

/////////////////////
// Helpers
/////////////////////

class IniciarEjercicioManualUseCase {
  constructor(private repo: BaseEjercicioManualRepository) { }

  execute(tipo: TipoEntradaEnum, ejercicio: string, fuente?: string, lado?: "derecho" | "izquierdo"): Promise<string> {
    return this.repo.iniciarEjercicioManual(tipo, ejercicio, fuente, lado);
  }
}

/////////////////////
// Public Interface
/////////////////////

export { IniciarEjercicioManualUseCase };