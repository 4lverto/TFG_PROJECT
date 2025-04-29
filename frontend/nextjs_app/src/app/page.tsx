'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

export default function HomePage() {
  const router = useRouter();

  const handleSeleccionManual = () => {
    router.push('/manual');
  };

  const handleAutodeteccion = () => {
    router.push('/autodeteccion');
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-10 text-center text-gray-800">
        TFG - Visión Artificial y MediaPipe🧠🏋️‍♂️
      </h1>

      <div className="flex flex-col gap-4 w-full max-w-sm">
        <button
          onClick={handleAutodeteccion}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300"
        >
          🧠 Modo Autodetección
        </button>

        <button
          onClick={handleSeleccionManual}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300"
        >
          🎯 Seleccionar Ejercicio Manualmente
        </button>
      </div>
    </main>
  );
}
