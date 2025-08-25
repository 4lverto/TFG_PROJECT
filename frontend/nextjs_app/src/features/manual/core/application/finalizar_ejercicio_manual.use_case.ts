import { ResumenSesion } from "@/shared/core/domain/resumen_sesion.entity";
import { BaseEjercicioManualRepository } from "../domain/ports/ejercicio_manual.repository";


class FinalizarEjercicioManualUseCase {
    constructor(private repo: BaseEjercicioManualRepository) { }

    execute(): Promise<{
        mensaje: string;
        resumen: ResumenSesion;
    }> {
        return this.repo.finalizarEjercicioManual();
    }
}

export { FinalizarEjercicioManualUseCase };