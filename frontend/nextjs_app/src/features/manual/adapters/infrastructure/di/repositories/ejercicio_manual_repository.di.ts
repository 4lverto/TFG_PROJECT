/////////////////////
// Requirements
/////////////////////

import { BaseEjercicioManualRepository } from "@/features/manual/core/domain/ports/ejercicio_manual.repository";
import { EjercicioManualHttpRepository } from "../../http/ejercicio_manual.http_repository";

/////////////////////
// Helpers
/////////////////////

const ejercicioManualHTTPRepository : BaseEjercicioManualRepository = new EjercicioManualHttpRepository(); 

/////////////////////
// Public Interface
/////////////////////

export { ejercicioManualHTTPRepository };