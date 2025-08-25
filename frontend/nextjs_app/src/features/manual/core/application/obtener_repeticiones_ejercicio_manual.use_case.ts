import { BaseEjercicioManualRepository } from "../domain/ports/ejercicio_manual.repository";


class ObtenerRepeticionesEjercicioManualUseCase {
    constructor(private repo: BaseEjercicioManualRepository) { }

    async execute(): Promise<number> {
        return await this.repo.obtenerRepeticionesEjercicioManual();
    }
}

export { ObtenerRepeticionesEjercicioManualUseCase };