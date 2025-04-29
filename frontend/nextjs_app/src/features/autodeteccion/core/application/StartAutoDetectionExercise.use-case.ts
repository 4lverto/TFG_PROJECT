/////////////////////
// Requirements
/////////////////////

import { iniciarSesion } from "@/shared/adapters/infrastructure/api";

/////////////////////
// Helpers
/////////////////////

async function startAutodetectionExercise(): Promise<string> {
  const response = await iniciarSesion("camera", "autodeteccion");
  return response.mensaje;
}

/////////////////////
// Public Interface
/////////////////////

export { startAutodetectionExercise };
