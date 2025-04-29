'use client';

import React, { useState } from "react";
import { startAutodetectionExercise } from "../../core/application/StartAutoDetectionExercise.use-case";

export default function AutodetectionScreen() {
  const [mensaje, setMensaje] = useState<string>("");

  const handleStartAutodetection = async () => {
    try {
      const mensaje = await startAutodetectionExercise();
      setMensaje(mensaje);
    } catch (error) {
      console.error(error);
      setMensaje('❌ Error al iniciar la autodetección');
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        🧠 Modo Autodetección
      </h1>

      <p className="text-gray-600 text-lg text-center mb-8 max-w-md">
        Pulsa para que el sistema detecte automáticamente tu ejercicio.
      </p>

      <button
        onClick={handleStartAutodetection}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300"
      >
        🧠 Iniciar Autodetección
      </button>

      {mensaje && (
        <div className="mt-6 text-center text-lg font-semibold text-blue-700">
          {mensaje}
        </div>
      )}
    </main>
  );
}
