/////////////////////
// Requirements
/////////////////////

import { IniciarSesionEntity } from "@/shared/core/domain/iniciar-sesion.entity";
import { BACKEND_URL } from "@/shared/core/constants";

/////////////////////
// Helpers
/////////////////////

async function iniciarSesion(tipo: string, nombre: string, fuente?: string, lado: string = "derecho" ) {
  
  const body: IniciarSesionEntity = {
    tipo,
    nombre_ejercicio: nombre,
    lado,
  };

  if(tipo === "video" && fuente){
    body.fuente = fuente;
  }

  const response = await fetch(`${BACKEND_URL}/iniciar-ejercicio`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error('Error al iniciar sesión de ejercicio');
  }

  return response.json();
}

async function estadoEjercicio() {
  const response = await fetch(`${BACKEND_URL}/estado-ejercicio`);
  if (!response.ok) {
    throw new Error('Error al obtener estado del ejercicio');
  }
  return response.json();
}

async function finalizarEjercicio() {
  const response = await fetch(`${BACKEND_URL}/finalizar-ejercicio`, {
    method: 'POST',
  });
  if (!response.ok) {
    throw new Error('Error al finalizar el ejercicio');
  }
  return response.json();
}

async function verHistorial() {
  const response = await fetch(`${BACKEND_URL}/historial`);
  if (!response.ok) {
    throw new Error('Error al obtener historial de ejercicios');
  }
  return response.json();
}

/////////////////////
// Public Interface
/////////////////////

export { iniciarSesion, estadoEjercicio, finalizarEjercicio, verHistorial }