/////////////////////
// Helpers
/////////////////////

type EjercicioId =
  | "curl_bicep"
  | "sentadilla"
  | "flexion"
  | "press_militar"
  | "quad_extension"
  | "crunch_abdominal"
  | "tricep_dip"
  | "elevacion_lateral"
  ;

interface Ejercicio {
  id: EjercicioId;
  nombre: string;
  descripcion?: string;
  usaLado?: true;
}

const EJERCICIOS: Ejercicio[] = [
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
  },
  {
    id: "flexion",
    nombre: "Flexión de Pecho",
    descripcion: "Trabajo de pecho, tríceps y core.",
  },
  {
    id: "press_militar",
    nombre: "Plancha",
    descripcion: "Ejercicio para trabajo de hombro.",
    usaLado: true,
  },
  {
    id: "quad_extension",
    nombre: "Extensión de Cuadriceps",
    descripcion: "Trabajo de cuadricep",
    usaLado: true,
  },
  {
    id: "crunch_abdominal",
    nombre: "Crunch Abdominal",
    descripcion: "Trabajo de abdominal con las rodillas flexionadas",
  },
  {
    id: "tricep_dip",
    nombre: "Tricep Dip",
    descripcion: "Trabajo de tricep realizable de muy variadas maneras"
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
export { EJERCICIOS };