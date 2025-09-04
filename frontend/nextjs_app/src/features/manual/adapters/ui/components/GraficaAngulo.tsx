"use client";

/////////////////////
// Requirements
/////////////////////

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { DetalleFrame } from "@/shared/core/domain/resumen_sesion.entity";

/////////////////////
// Helpers
/////////////////////

interface GraficaAnguloProps {
  datos: DetalleFrame[];
}

function GraficaAngulo({ datos }: GraficaAnguloProps) {

  if(!datos?.length) return null;

  // Formateamos los datos para mostrar tiempo relativo (en segundos) y ángulo
  const t0 = datos[0].timestamp;

  const data = datos.map((frame) => ({
    tiempo: parseFloat(((frame.timestamp - t0)).toFixed(2)), // segundos
    angulo: frame.angulo ?? null,
  }));

  return (
    <div className="w-full h-64 bg-white rounded shadow-md p-4 mt-6">
      <h3 className="text-4xl font-semibold text-gray-800 mb-2">📈Evolución del ángulo durante la sesión</h3>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={data}>
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="tiempo" label={{ value: "Tiempo (s)", position: "insideBottom", offset: -5 }} />
          <YAxis label={{ value: "Ángulo (°)", angle: -90, position: "insideLeft" }} />
          <Tooltip />
          <Line type="monotone" dataKey="angulo" stroke="#8884d8" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

/////////////////////
// Public Interface
/////////////////////

export { GraficaAngulo };