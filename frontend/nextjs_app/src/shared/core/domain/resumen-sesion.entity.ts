export interface Landmark {
  x: number;
  y: number;
  z: number;
  visibilidad: number;
}

export interface DetalleFrame {
  timestamp: number;
  angulo: number | null;
  repeticiones: number;
  estado: string;
  landmarks?: Record<string, Landmark>;
}

export interface ResumenSesion {
  ejercicio: string;
  tipo_entrada: string;
  repeticiones: number;
  inicio: string;
  fin: string;
  duracion_segundos: number;
  duracion_formateada: string;
  detalles_frame_a_frame?: DetalleFrame[];
}