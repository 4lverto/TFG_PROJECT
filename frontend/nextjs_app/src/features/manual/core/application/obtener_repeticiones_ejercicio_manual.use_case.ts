/////////////////////
// Requirements
/////////////////////

import { BaseEjercicioManualRepository } from "../domain/ports/ejercicio_manual.repository";

/////////////////////
// Helpers
/////////////////////

class ObtenerRepeticionesEjercicioManualUseCase {
    constructor(private repo: BaseEjercicioManualRepository) { }

    async execute(): Promise<number> {
        return await this.repo.obtenerRepeticionesEjercicioManual();
    }
}

/////////////////////
// Public Interface
/////////////////////

export { ObtenerRepeticionesEjercicioManualUseCase };