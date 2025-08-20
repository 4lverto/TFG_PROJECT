/////////////////////
// Requirements
/////////////////////

import { iniciarSesion } from "@/shared/adapters/infrastructure/api";

/////////////////////
// Helpers
/////////////////////

async function iniciarEjercicioManualUseCase(nombre: string): Promise<string> {
  const response = await iniciarSesion("camera", nombre);  // ← usar tipo "camera"
  return response.mensaje;
}

/////////////////////
// Public Interface
/////////////////////

export { iniciarEjercicioManualUseCase };