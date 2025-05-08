// src/shared/core/domain/ejercicio.entity.ts

export type EjercicioId =
  | "bicep_curl"
  | "sentadilla"
  | "flexion"
  | "plancha"
  | "jumping_jack";

export interface Ejercicio {
  id: EjercicioId;
  nombre: string;
  descripcion?: string;
}

export const EJERCICIOS: Ejercicio[] = [
  {
    id: "bicep_curl",
    nombre: "Curl de Bíceps",
    descripcion: "Flexión de brazo para trabajar el bíceps.",
  },
  {
    id: "sentadilla",
    nombre: "Sentadilla",
    descripcion: "Ejercicio de piernas que trabaja cuádriceps y glúteos.",
  },
  {
    id: "flexion",
    nombre: "Flexión de Pecho",
    descripcion: "Trabajo de pecho, tríceps y core.",
  },
  {
    id: "plancha",
    nombre: "Plancha",
    descripcion: "Ejercicio isométrico de core.",
  },
  {
    id: "jumping_jack",
    nombre: "Jumping Jack",
    descripcion: "Ejercicio cardiovascular de cuerpo completo.",
  },
];
