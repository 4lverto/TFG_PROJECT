'use client';
/////////////////////
// Requirements
/////////////////////

import React from "react";
import { EjerciciosRegistrados } from "@/shared/core/domain/ejercicio.entity";
import ResumenDeSesion from "./components/ResumenDeSesion";
import { useManualScreen } from "./hooks/ejercicio_manual.hook";

function EjercicioManual() {

  const {
    // estado
    tipoEntrada,
    ejercicioSeleccionado,
    videosDisponibles,
    videoSeleccionado,
    ejercicioActivo,
    mensaje,
    repeticiones,
    resumen,
    lado,
    // handlers
    setEjercicioSeleccionado,
    setVideoSeleccionado,
    setResumen,
    setLado,
    handleTipoEntradaChange,
    handleIniciarEjercicio,
    handleFinalizar,
  } = useManualScreen();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        🎯 Modo Selección Manual
      </h1>

      {resumen ? (
        <ResumenDeSesion resumen={resumen} onVolver={() => setResumen(null)} />
      ) : ejercicioActivo ? (
        <>
          <p className="text-xl font-semibold mb-4">
            🔢 Repeticiones: {repeticiones}
          </p>
          <button
            onClick={handleFinalizar}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300"
          >
            🛑 Finalizar Ejercicio
          </button>
        </>
      ) : (
        <>
          <div className="flex flex-col gap-4 mb-6 w-full max-w-sm">
            <label className="text-lg font-semibold text-gray-700">
              Tipo de entrada:
            </label>
            <select
              value={tipoEntrada}
              onChange={handleTipoEntradaChange}
              className="p-2 rounded border border-gray-300"
            >
              <option value="camera">📷 Cámara</option>
              <option value="video">🎥 Vídeo</option>
            </select>

            <label className="text-lg font-semibold text-gray-700">
              Ejercicio:
            </label>
            <select
              value={ejercicioSeleccionado}
              onChange={(e) => setEjercicioSeleccionado(e.target.value)}
              className="p-2 rounded border border-gray-300"
            >
              {EjerciciosRegistrados.map((ej) => (
                <option key={ej.id} value={ej.id}>
                  {ej.nombre}
                </option>
              ))}
            </select>

            {EjerciciosRegistrados.find((ej) => ej.id === ejercicioSeleccionado)?.usaLado && (
              <>
                <label className="text-lg font-semibold text-gray-700"> ¿Con qué lado del cuerpo trabajarás? </label>
                <select
                  value={lado}
                  onChange={(e) => setLado(e.target.value as "derecho" | "izquierdo")}
                  className="p-2 rounded border border-gray-300"
                >
                  <option value="derecho">Derecho</option>
                  <option value="izquierdo">Izquierdo</option>
                </select>

              </>
            )}

            {tipoEntrada === "video" && (
              <>
                <label className="text-lg font-semibold text-gray-700">
                  Selecciona vídeo:
                </label>
                <select
                  value={videoSeleccionado}
                  onChange={(e) => setVideoSeleccionado(e.target.value)}
                  className="p-2 rounded border border-gray-300"
                >
                  {videosDisponibles.map((video) => (
                    <option key={video} value={video}>
                      {video.split("/").pop()}
                    </option>
                  ))}
                </select>
              </>
            )}

            <button
              onClick={handleIniciarEjercicio}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 mt-4"
            >
              💪 Iniciar sesión
            </button>
          </div>
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

/////////////////////
// Public Interface
/////////////////////

export { EjercicioManual };