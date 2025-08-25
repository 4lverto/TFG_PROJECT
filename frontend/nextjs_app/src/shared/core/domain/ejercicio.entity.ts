/////////////////////
// Helpers
/////////////////////

type EjercicioId =
  | "curl_bicep"
  | "sentadilla"
  | "flexion"
  | "press_militar"
  | "extension_cuadricep"
  | "crunch_abdominal"
  | "dip_tricep"
  | "elevacion_lateral"
  ;

interface Ejercicio {
  id: EjercicioId;
  nombre: string;
  descripcion?: string;
  usaLado?: true;
}

const EjerciciosRegistrados: Ejercicio[] = [
  {
    id: "curl_bicep",
    nombre: "Curl de Bíceps",
    descripcion: "Flexión de brazo para trabajar el bíceps.",
    usaLado: true,
  },
  {
    id: "sentadilla",
    nombre: "Sentadilla",
    descripcion: "Ejercicio de piernas que trabaja cuádriceps y glúteos.",
    usaLado: true,
  },
  {
    id: "flexion",
    nombre: "Flexión de Pecho",
    descripcion: "Trabajo de pecho, tríceps y core.",
    usaLado: true,
  },
  {
    id: "press_militar",
    nombre: "Press Militar",
    descripcion: "Ejercicio para trabajo de hombro.",
    usaLado: true,
  },
  {
    id: "extension_cuadricep",
    nombre: "Extensión de Cuadriceps",
    descripcion: "Trabajo de cuadricep",
    usaLado: true,
  },
  {
    id: "crunch_abdominal",
    nombre: "Crunch Abdominal",
    descripcion: "Trabajo de abdominal con las rodillas flexionadas",
    usaLado: true,
  },
  {
    id: "dip_tricep",
    nombre: "Dips de Tricep",
    descripcion: "Trabajo de tricep realizable de muy variadas maneras",
    usaLado: true,
  },
  {
    id: "elevacion_lateral",
    nombre: "Elevación Lateral",
    descripcion: "Trabajo de deltoides y hombro",
    usaLado: true,
  }
];

/////////////////////
// Public Interface
/////////////////////

export type { Ejercicio, EjercicioId};
export { EjerciciosRegistrados };