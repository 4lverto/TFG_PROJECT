/////////////////////
// Requirements
/////////////////////

import { ObtenerRepeticionesEjercicioManualUseCase } from "@/features/manual/core/application/obtener_repeticiones_ejercicio_manual.use_case";
import { ejercicioManualHTTPRepository } from "../repositories/ejercicio_manual_repository.di";

/////////////////////
// Helpers
/////////////////////

const obtenerRepeticionesEjercicioManualUseCase: ObtenerRepeticionesEjercicioManualUseCase = new ObtenerRepeticionesEjercicioManualUseCase(ejercicioManualHTTPRepository);

/////////////////////
// Public Interface
/////////////////////

export { obtenerRepeticionesEjercicioManualUseCase } ;