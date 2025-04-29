/////////////////////
// Requierements
/////////////////////

import { iniciarSesion } from "@/shared/adapters/infrastructure/api";

/////////////////////
// Helpers
/////////////////////

async function startManualExercise(nombre: string): Promise<string> {
  const response = await iniciarSesion("camera", nombre);  // ← usar tipo "camera"
  return response.mensaje;
}


/////////////////////
// Public Interface
/////////////////////

export { startManualExercise };