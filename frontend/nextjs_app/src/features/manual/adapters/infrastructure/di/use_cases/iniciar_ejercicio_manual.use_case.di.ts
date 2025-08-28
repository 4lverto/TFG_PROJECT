/////////////////////
// Requirements
/////////////////////

import { ejercicioManualHTTPRepository } from "../repositories/ejercicio_manual_repository.di";
import { IniciarEjercicioManualUseCase } from "@/features/manual/core/application/iniciar_ejercicio_manual.use_case";

/////////////////////
// Helpers
/////////////////////

const iniciarEjercicioManualUseCase: IniciarEjercicioManualUseCase = new IniciarEjercicioManualUseCase(ejercicioManualHTTPRepository);

/////////////////////
// Public Interface
/////////////////////

export { iniciarEjercicioManualUseCase } ;