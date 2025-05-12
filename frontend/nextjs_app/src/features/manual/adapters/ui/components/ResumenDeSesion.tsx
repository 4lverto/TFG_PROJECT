/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { EJERCICIOS } from "@/shared/core/domain/ejercicio.entity";
import { ResumenSesion } from "@/shared/core/domain/resumen-sesion.entity";
import jsPDF from "jspdf";

interface Props {
  resumen: ResumenSesion;
  onVolver: () => void;
}



export default function ResumenDeSesion({ resumen, onVolver }: Props) {
  const nombreEjercicio =
    EJERCICIOS.find((e) => e.id === resumen.ejercicio)?.nombre || resumen.ejercicio;

  const tipoEntradaLegible = resumen.tipo_entrada === "camera" ? "Cámara" : "Vídeo";
  const fecha = new Date(resumen.inicio).toLocaleDateString("es-ES");
  const horaInicio = new Date(resumen.inicio).toLocaleTimeString("es-ES");
  const horaFin = new Date(resumen.fin).toLocaleTimeString("es-ES");
  const duracion = `${resumen.duracion_segundos} segundos`;


  const handleExportarPDF = () => {
    const doc = new jsPDF();
  
    doc.setFontSize(18);
    doc.text("Resumen del Ejercicio", 14, 20);
  
    doc.setFontSize(12);
    doc.text(`Fecha: ${fecha}`, 14, 35);
    doc.text(`Ejercicio: ${nombreEjercicio}`, 14, 45);
    doc.text(`Tipo de entrada: ${tipoEntradaLegible}`, 14, 55);
    doc.text(`Repeticiones: ${resumen.repeticiones}`, 14, 65);
    doc.text(`Inicio: ${horaInicio}`, 14, 75);
    doc.text(`Fin: ${horaFin}`, 14, 85);
    doc.text(`Duración: ${duracion}`, 14, 95);
  
    doc.save(`resumen_${resumen.ejercicio}_${fecha.replace(/\//g, "-")}.pdf`);
  };

  const handleExportarCSV = () => {
    const fecha = new Date(resumen.inicio).toLocaleDateString("es-ES");
  
    const encabezados = [
      "Fecha",
      "Ejercicio",
      "Tipo de entrada",
      "Repeticiones",
      "Inicio",
      "Fin",
      "Duracion"
    ];
  
    const fila = [
      fecha,
      nombreEjercicio,
      tipoEntradaLegible,
      resumen.repeticiones.toString(),
      horaInicio,
      horaFin,
      duracion,
    ];
  
    const contenido = [encabezados, fila]
      .map((fila) => fila.map(valor => `"${valor}"`).join(","))
      .join("\n");
  
    const blob = new Blob([contenido], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
  
    link.setAttribute("href", url);
    link.setAttribute("download", `resumen_${resumen.ejercicio}_${fecha.replace(/\//g, "-")}.csv`);
    link.click();
  };
  
  const handleExportarCSVDetallado = () => {
    if (!resumen.detalles_frame_a_frame) return;

    const encabezados = ["timestamp", "angulo", "repeticiones", "estado"];
    const filas = resumen.detalles_frame_a_frame.map((f) => [
      f.timestamp,
      f.angulo ?? "",
      f.repeticiones,
      f.estado,
    ]);

    const contenido = [encabezados, ...filas]
      .map((fila) => fila.map((valor) => `"${valor}"`).join(","))
      .join("\n");

    const blob = new Blob([contenido], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.setAttribute("href", url);
    link.setAttribute("download", `detalle_sesion_${resumen.ejercicio}.csv`);
    link.click();
  };

  return (
    <div className="flex flex-col items-center gap-6 bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
      <h2 className="text-2xl font-bold text-gray-800">
        ✅ Resumen del Ejercicio
      </h2>

      <div className="w-full text-left space-y-2">
        <p><strong>📅 Fecha:</strong> {fecha}</p>
        <p><strong>🏋️ Ejercicio:</strong> {nombreEjercicio}</p>
        <p><strong>📹 Tipo de entrada:</strong> {tipoEntradaLegible}</p>
        <p><strong>🔢 Repeticiones:</strong> {resumen.repeticiones}</p>
        <p><strong>🕒 Inicio:</strong> {horaInicio}</p>
        <p><strong>🛑 Fin:</strong> {horaFin}</p>
        <p><strong>⏱️ Duración:</strong> {duracion}</p>
      </div>

      <button
        onClick={handleExportarPDF}
        className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300"
        >
        📄 Exportar como PDF
      </button>

      <button
          onClick={handleExportarCSV}
          className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300"
          >
          📄 Exportar como CSV
      </button>

      <button
        onClick={handleExportarCSVDetallado}
        className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300"
        >
        📈 Exportar datos detallados (CSV)
      </button>

      <button
        onClick={onVolver}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300"
      >
        🔙 Volver a Selección
      </button>
    </div>
  );
}
