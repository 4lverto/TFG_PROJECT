'use client';

/////////////////////
// Requirements
/////////////////////

import { useRouter } from 'next/navigation';
import React from 'react';

/////////////////////
// Helpers
/////////////////////

export default function HomePage() {
  const router = useRouter();

  const handleSeleccionManual = () => {
    router.push('/manual');
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen h-full bg-gray-100 p-6">
      <h1 className="text-6xl font-bold mb-10 text-center text-gray-800">
        TFG - Visión Artificial y MediaPipe🧠🏋️‍♂️
      </h1>


        <button
          onClick={handleSeleccionManual}
          className="flex flex-col gap-4 w-full max-w-2xl bg-green-600 cursor-pointer text-2xl hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300"
        >
          🎯 Iniciar sesión de ejercicio
        </button>

    </main>
  );
}
