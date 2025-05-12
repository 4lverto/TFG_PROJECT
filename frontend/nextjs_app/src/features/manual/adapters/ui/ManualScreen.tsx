'use client';

import React, { useState, useEffect, ChangeEvent } from "react";
import {
  iniciarSesion,
  estadoEjercicio,
  finalizarEjercicio,
} from "@/shared/adapters/infrastructure/api";
import { EJERCICIOS } from "@/shared/core/domain/ejercicio.entity";
import { ResumenSesion } from "@/shared/core/domain/resumen-sesion.entity";
import ResumenDeSesion from "./components/ResumenDeSesion";

export default function ManualScreen() {
  const [tipoEntrada, setTipoEntrada] = useState<"camera" | "video">("camera");
  const [ejercicioSeleccionado, setEjercicioSeleccionado] = useState("curl_bicep");
  const [videosDisponibles, setVideosDisponibles] = useState<string[]>([]);
  const [videoSeleccionado, setVideoSeleccionado] = useState<string>("");
  const [ejercicioActivo, setEjercicioActivo] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [repeticiones, setRepeticiones] = useState(0);
  const [resumen, setResumen] = useState<ResumenSesion | null>(null);

  const handleTipoEntradaChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setTipoEntrada(e.target.value as "camera" | "video");
  };

  const handleIniciarEjercicio = async () => {
    try {
      setResumen(null);
      setMensaje("⏳ Iniciando sesión...");
      await iniciarSesion(tipoEntrada, ejercicioSeleccionado.trim(), videoSeleccionado);
      setEjercicioActivo(true);
      setMensaje("✅ Ejercicio iniciado correctamente");
    } catch (error) {
      console.error(error);
      setMensaje("❌ Error al iniciar el ejercicio");
    }
  };

  const handleFinalizar = async () => {
    try {
      const response = await finalizarEjercicio();
      setResumen(response.resumen);
      setMensaje(response.mensaje);
      setEjercicioActivo(false);
    } catch (error) {
      console.error(error);
      setMensaje("❌ Error al finalizar el ejercicio");
    }
  };

  useEffect(() => {
    if (tipoEntrada === "video") {
      const fetchVideos = async () => {
        console.log("EJERCICIO ENVIADO:", JSON.stringify(ejercicioSeleccionado));
        try {
          const res = await fetch(`http://localhost:8000/videos-disponibles?ejercicio=${ejercicioSeleccionado}`);
          console.log(res);
          const data = await res.json();
          setVideosDisponibles(data.videos);
          setVideoSeleccionado(data.videos[0] || "");
        } catch (error) {
          console.error("❌ Error al obtener vídeos:", error);
          setVideosDisponibles([]);
        }
      };
      fetchVideos();
    }
  }, [ejercicioSeleccionado, tipoEntrada]);

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
              {EJERCICIOS.map((ej) => (
                <option key={ej.id} value={ej.id}>
                  {ej.nombre}
                </option>
              ))}
            </select>

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
