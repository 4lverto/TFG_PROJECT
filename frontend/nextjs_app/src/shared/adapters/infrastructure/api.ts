// src/shared/adapters/infrastructure/api.ts

const BACKEND_URL = 'http://localhost:8000';

export async function iniciarSesion(tipo: string, nombre: string, fuente?: string) {
  const response = await fetch(`${BACKEND_URL}/iniciar-ejercicio`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      tipo,
      nombre_ejercicio: nombre,
      fuente,
    }),
  });

  if (!response.ok) {
    throw new Error('Error al iniciar sesión de ejercicio');
  }

  return response.json();
}

export async function estadoEjercicio() {
  const response = await fetch(`${BACKEND_URL}/estado-ejercicio`);
  if (!response.ok) {
    throw new Error('Error al obtener estado del ejercicio');
  }
  return response.json();
}

export async function finalizarEjercicio() {
  const response = await fetch(`${BACKEND_URL}/finalizar-ejercicio`, {
    method: 'POST',
  });
  if (!response.ok) {
    throw new Error('Error al finalizar el ejercicio');
  }
  return response.json();
}

export async function verHistorial() {
  const response = await fetch(`${BACKEND_URL}/historial`);
  if (!response.ok) {
    throw new Error('Error al obtener historial de ejercicios');
  }
  return response.json();
}
