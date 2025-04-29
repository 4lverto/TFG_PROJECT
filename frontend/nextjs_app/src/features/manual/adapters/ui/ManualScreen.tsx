'use client';

import React, { useState, useEffect, ChangeEvent } from "react";
import { iniciarSesion, estadoEjercicio, finalizarEjercicio } from "@/shared/adapters/infrastructure/api";

export default function ManualScreen() {
  const [tipoEntrada, setTipoEntrada] = useState<"camera" | "video">("camera");
  const [archivoVideo, setArchivoVideo] = useState<File | null>(null);
  const [mensaje, setMensaje] = useState<string>('');
  const [repeticiones, setRepeticiones] = useState<number>(0);
  const [ejercicioActivo, setEjercicioActivo] = useState<boolean>(false);

  const handleTipoEntradaChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as "camera" | "video";
    setTipoEntrada(value);
  };

  const handleArchivoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setArchivoVideo(e.target.files[0]);
    }
  };

  const handleIniciarEjercicio = async () => {
    try {
      let fuente: string | undefined = undefined;

      if (tipoEntrada === "video") {
        if (!archivoVideo) {
          alert("Por favor selecciona un archivo de vídeo.");
          return;
        }
        fuente = URL.createObjectURL(archivoVideo);  // ⚠️ Esto solo crea URL temporal en navegador, backend necesitaría path real
      }

      const response = await iniciarSesion(tipoEntrada, "bicep_curl", fuente);
      console.log(response);
      setMensaje(response.mensaje);
      setEjercicioActivo(true);
    } catch (error) {
      console.error(error);
      setMensaje('❌ Error al iniciar el ejercicio');
    }
  };

  const handleFinalizar = async () => {
    try {
      const response = await finalizarEjercicio();
      setMensaje(response.mensaje);
      setEjercicioActivo(false);
    } catch (error) {
      console.error(error);
      setMensaje('❌ Error al finalizar el ejercicio');
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (ejercicioActivo) {
      interval = setInterval(async () => {
        try {
          const estado = await estadoEjercicio();
          setRepeticiones(estado.repeticiones);
        } catch (error) {
          console.error(error);
        }
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [ejercicioActivo]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        🎯 Modo Selección Manual
      </h1>

      {!ejercicioActivo ? (
        <>
          <div className="flex flex-col gap-4 mb-6 w-full max-w-sm">
            <label className="text-lg font-semibold text-gray-700">
              Selecciona tipo de entrada:
            </label>
            <select
              value={tipoEntrada}
              onChange={handleTipoEntradaChange}
              className="p-2 rounded border border-gray-300"
            >
              <option value="camera">📷 Cámara</option>
              <option value="video">🎥 Vídeo</option>
            </select>

            {tipoEntrada === "video" && (
              <>
                <label className="text-lg font-semibold text-gray-700 mt-4">
                  Adjuntar archivo de vídeo:
                </label>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleArchivoChange}
                  className="p-2 border rounded border-gray-300"
                />
              </>
            )}

            <button
              onClick={handleIniciarEjercicio}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 mt-4"
            >
              💪 Iniciar Curl de Bíceps
            </button>
          </div>
        </>
      ) : (
        <>
          <p className="text-xl font-semibold mb-4">
            Repeticiones: {repeticiones}
          </p>

          <button
            onClick={handleFinalizar}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300"
          >
            🛑 Finalizar Ejercicio
          </button>
        </>
      )}

      {mensaje && (
        <div className="mt-6 text-center text-lg font-semibold text-blue-700">
          {mensaje}
        </div>
      )}
    </main>
  );
}
