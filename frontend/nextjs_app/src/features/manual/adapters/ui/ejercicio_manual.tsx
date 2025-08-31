'use client';
/////////////////////
// Requirements
/////////////////////

import React from "react";

import { ResumenDeSesion } from "./components/ResumenDeSesion";
import { useEjercicioManual } from "./hooks/ejercicio_manual.hook";
import { TipoEntradaEnum } from "@/shared/core/enums/tipo_entrada.enum";
import { EjerciciosRegistrados } from "@/shared/core/domain/ejercicio.entity";

/////////////////////
// Helpers
/////////////////////

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
    normalizar,
    forzarRotacion,
    indiceCamara,
    camaras,
    // handlers
    setEjercicioSeleccionado,
    setVideoSeleccionado,
    setResumen,
    setLado,
    setNormalizar,
    setForzarRotacion,
    setIndiceCamara,
    handleTipoEntradaChange,
    handleIniciarEjercicio,
    handleFinalizar,
  } = useEjercicioManual();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">

      {resumen ? (
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          🎯 Resumen de la sesión de ejercicio
        </h1>
      ) : ejercicioActivo ? (
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          🎯 Monitorización de la sesión de ejercicio
        </h1>
      ) : (
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          🎯 Configuración de la sesión de ejercicio
        </h1>
      )}

      {resumen ? (
        <ResumenDeSesion resumen={resumen} onVolver={() => setResumen(null)} />
      ) : ejercicioActivo ? (
        <>
          <p className="text-xl font-semibold mb-4">
            🔢 Repeticiones: {repeticiones}
          </p>

          <p className="text-md font-semibold m-4 text-center">
            ⚠️Mantente estable dentro del objetivo del dispositivo para evitar contabilizar repeticiones errónesas⚠️</p>

          <button
            disabled={!ejercicioActivo}
            aria-disabled={!ejercicioActivo}
            onClick={handleFinalizar}
            className="bg-red-600 cursor-pointer hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300"
          >
            🛑 Finalizar Ejercicio
          </button>
        </>
      ) : (
        <>
          <div className="flex flex-col gap-4 mb-6 w-full max-w-sm">
            <label className="text-lg font-semibold text-gray-700">
              Tipo de entrada de vídeo:
            </label>
            <select
              value={tipoEntrada}
              onChange={handleTipoEntradaChange}
              className="p-2 rounded border border-gray-300"
            >
              <option value={TipoEntradaEnum.CAMERA}>📷 Cámara en directo</option>
              <option value={TipoEntradaEnum.VIDEO}>🎥 Vídeo pregrabado</option>
            </select>

            <label className="text-lg font-semibold text-gray-700">
              ¿Qué ejercicio vas a realizar?:
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
                <div className="flex flex-col items-center md:flex-row md:items-start gap-3">
                  <p className="text-md md:w-2/3"> ¡Si te es indiferente, selecciona aquel que vayas a orientar hacia la cámara!</p>
                  <select
                    value={lado}
                    onChange={(e) => setLado(e.target.value as "derecho" | "izquierdo")}
                    className="p-2 rounded border border-gray-300 w-full md:w-1/3 h-fit"
                  >
                    <option value="derecho">Derecho</option>
                    <option value="izquierdo">Izquierdo</option>
                  </select>
                </div>

              </>
            )}

            {tipoEntrada === TipoEntradaEnum.VIDEO && (
              <>
                <label className="text-lg font-semibold text-gray-700">
                  Selecciona el vídeo que quieres procesar:
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
            <div className="border rounded-lg p-3 space-y-3 bg-white">
              <p className="font-semibold">⚙️ Opciones avanzadas (rotación de la cámara)</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm font-medium">Orientación</label>
                  <select
                    value={normalizar}
                    onChange={(e) => setNormalizar(e.target.value as "auto" | "horizontal" | "vertical")}
                    className="p-2 mt-2 rounded border border-gray-300 w-full"
                  >
                    <option value="auto">Default</option>
                    <option value="horizontal">Horizontal</option>
                    <option value="vertical">Vertical</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium">Rotación forzada</label>
                  <select
                    value={forzarRotacion}
                    onChange={(e) => setForzarRotacion(Number(e.target.value) as 0 | 90 | 180 | 270)}
                    className="p-2 mt-2 rounded border border-gray-300 w-full"
                  >
                    <option value={0}>Default</option>
                    <option value={90}>90°</option>
                    <option value={180}>180°</option>
                    <option value={270}>270°</option>
                  </select>
                </div>

                {tipoEntrada === TipoEntradaEnum.CAMERA && camaras.length > 1 && (
                  <div>
                    <label className="block text-sm font-medium">Cámara</label>
                    <select
                      value={indiceCamara}
                      onChange={(e) => setIndiceCamara(Number(e.target.value))}
                      className="p-2 mt-2 rounded border border-gray-300 w-full"
                    >
                      {camaras.map((c) => (
                        <option key={c.index} value={c.index}>{c.label ?? `Cámara ${c.index}`}</option>
                      ))}
                    </select>
                    <p className="text-xs text-gray-500 mt-1">
                      Si no ves más opciones, sólo hay una cámara disponible (la integrada).
                    </p>
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500">
                Consejo: deja <b>Default</b> salvo que el vídeo/cámara se vea girado. Para cámara, se recomienda
                usar <b>Horizontal</b>.
              </p>
            </div>
            <button
              disabled={ejercicioActivo}
              onClick={handleIniciarEjercicio}
              className="bg-green-600 cursor-pointer hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 mt-4"
            >
              💪 Iniciar ejercicio
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