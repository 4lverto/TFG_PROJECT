/////////////////////
// Requirements
/////////////////////

import { FinalizarEjercicioManualUseCase } from "@/features/manual/core/application/finalizar_ejercicio_manual.use_case";
import { ejercicioManualHTTPRepository } from "../repositories/ejercicio_manual_repository.di";

/////////////////////
// Helpers
/////////////////////

const finalizarEjercicioManualUseCase: FinalizarEjercicioManualUseCase = new FinalizarEjercicioManualUseCase(ejercicioManualHTTPRepository);

/////////////////////
// Public Interface
/////////////////////

export { finalizarEjercicioManualUseCase } ;