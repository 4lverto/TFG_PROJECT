/////////////////////
// Requirements
/////////////////////

import React from "react";
import jsPDF from "jspdf";
import { GraficaAngulo } from "@/features/manual/adapters/ui/components/GraficaAngulo";
import { EjerciciosRegistrados } from "@/shared/core/domain/ejercicio.entity";
import { ResumenSesion } from "@/shared/core/domain/resumen_sesion.entity";
import { TipoEntradaEnum } from "@/shared/core/enums/tipo_entrada.enum";


/////////////////////
// Helpers
/////////////////////

interface Props {
  resumen: ResumenSesion;
  onVolver: () => void;
}

function ResumenDeSesion({ resumen, onVolver }: Props) {
  const nombreEjercicio =
    EjerciciosRegistrados.find((e) => e.id === resumen.ejercicio)?.nombre || resumen.ejercicio;

  const tipoEntradaLegible = resumen.tipo_entrada === TipoEntradaEnum.CAMERA ? "Cámara" : "Vídeo";
  const fecha = new Date(resumen.inicio).toLocaleDateString("es-ES");
  const horaInicio = new Date(resumen.inicio).toLocaleTimeString("es-ES");
  const horaFin = new Date(resumen.fin).toLocaleTimeString("es-ES");
  const duracion = `${resumen.duracion_segundos} segundos`;


  const handleExportarPDF = () => {
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 15;
    let y = 20;

    // TÍTULO (centrado, negrita y subrayado)
    const titulo = "Resumen del Ejercicio";
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text(titulo, pageWidth / 2, y, { align: "center" });

    const titleWidth = doc.getTextWidth(titulo);
    doc.setLineWidth(0.6);
    doc.line(
      (pageWidth - titleWidth) / 2,
      y + 2,
      (pageWidth + titleWidth) / 2,
      y + 2
    );

    y += 12;

    // TARJETA DE DATOS
    const cardX = margin;
    const cardW = pageWidth - margin * 2;
    const cardY = y;
    const cardH = 70; // ajusta si añades más filas

    doc.setDrawColor(180);
    doc.setFillColor(245, 245, 245); // fondo suave
    doc.roundedRect(cardX, cardY, cardW, cardH, 3, 3, "FD");

    y += 10;

    // Filas (etiqueta / valor)
    const rows: Array<[string, string | number]> = [
      ["Fecha", fecha],
      ["Ejercicio", nombreEjercicio],
      ["Tipo de entrada", tipoEntradaLegible],
      ["Repeticiones", resumen.repeticiones],
      ["Inicio", horaInicio],
      ["Fin", horaFin],
      ["Duración", duracion],
    ];

    const labelX = cardX + 8;
    const valueX = cardX + 65; // separa columnas (ajusta si lo ves muy pegado)
    const lineHeight = 8;

    doc.setTextColor(0);
    doc.setFontSize(12);

    rows.forEach(([label, value], idx) => {
      // Etiqueta en negrita
      doc.setFont("helvetica", "bold");
      doc.text(`${label}:`, labelX, y);

      // Valor en normal
      doc.setFont("helvetica", "normal");
      doc.text(String(value ?? ""), valueX, y);

      // Línea separadora tenue (entre filas)
      if (idx < rows.length - 1) {
        doc.setDrawColor(220);
        doc.setLineWidth(0.2);
        doc.line(cardX + 6, y + 2, cardX + cardW - 6, y + 2);
      }

      y += lineHeight;
    });

    // PIE DE PÁGINA
    const addFooter = () => {
      const footY = doc.internal.pageSize.getHeight() - 10;
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(120);
      doc.text(
        `Generado: ${new Date().toLocaleString()}`,
        margin,
        footY
      );
      doc.text(
        `Página 1 de 1`,
        pageWidth - margin,
        footY,
        { align: "right" }
      );
    };

    addFooter();

    // GUARDAR
    const safeFecha = String(fecha).replace(/[\\/:*?"<>|]/g, "-");
    const safeEjercicio = String(resumen.ejercicio || nombreEjercicio)
      .toLowerCase()
      .replace(/\s+/g, "_")
      .replace(/[\\/:*?"<>|]/g, "-");

    doc.save(`resumen_${safeEjercicio}_${safeFecha}.pdf`);
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

    const normalizarTexto = (str: string) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    const contenido = [encabezados, fila]
      .map((fila) => fila.map(valor => `"${normalizarTexto(valor)}"`).join(","))
      .join("\n");

    const blob = new Blob(["\uFEFF", contenido], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.setAttribute("href", url);
    link.setAttribute("download", `resumen_${resumen.ejercicio}_${fecha.replace(/\//g, "-")}.csv`);
    link.click();
    URL.revokeObjectURL(url);
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

    const blob = new Blob(["\uFEFF", contenido], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.setAttribute("href", url);
    link.setAttribute("download", `detalle_sesion_${resumen.ejercicio}.csv`);
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col items-center gap-6 bg-white p-6 rounded-lg shadow-lg max-w-5xl w-full">
      <h2 className="text-4xl font-bold text-gray-800">
        ✅ Resumen del Ejercicio
      </h2>

      <div className="w-full text-left space-y-2 text-3xl">
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
        className="bg-green-600 cursor-pointer text-3xl hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300"
      >
        📄 Exportar como PDF
      </button>

      <button
        onClick={handleExportarCSV}
        className="bg-yellow-600 cursor-pointer text-3xl hover:bg-yellow-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300"
      >
        📄 Exportar como CSV
      </button>

      <button
        onClick={handleExportarCSVDetallado}
        className="bg-purple-600 cursor-pointer text-3xl hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300"
      >
        📈 Exportar datos detallados (CSV)
      </button>

      {resumen.detalles_frame_a_frame && resumen.detalles_frame_a_frame.length > 0 && (
        <GraficaAngulo datos={resumen.detalles_frame_a_frame} />
      )}

      <button
        onClick={onVolver}
        className="bg-blue-600 cursor-pointer text-3xl my-5 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300"
      >
        🔙 Volver a Selección
      </button>
    </div>
  );
}


/////////////////////
// Public Interface
/////////////////////

export { ResumenDeSesion }