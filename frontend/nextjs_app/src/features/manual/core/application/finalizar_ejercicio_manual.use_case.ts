/////////////////////
// Requirements
/////////////////////

import { BaseEjercicioManualRepository } from "../domain/ports/ejercicio_manual.repository";
import { ResumenSesion } from "@/shared/core/domain/resumen_sesion.entity";

/////////////////////
// Helpers
/////////////////////

class FinalizarEjercicioManualUseCase {
    constructor(private repo: BaseEjercicioManualRepository) { }

    execute(): Promise<{
        mensaje: string;
        resumen: ResumenSesion;
    }> {
        return this.repo.finalizarEjercicioManual();
    }
}

/////////////////////
// Public Interface
/////////////////////

export { FinalizarEjercicioManualUseCase };