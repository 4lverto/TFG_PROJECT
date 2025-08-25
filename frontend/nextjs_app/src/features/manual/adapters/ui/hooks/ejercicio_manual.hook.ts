'use client';

import { useEffect, useMemo, useRef, useState, ChangeEvent } from "react";
import { ResumenSesion } from "@/shared/core/domain/resumen_sesion.entity";
import { TipoEntradaEnum } from "@/shared/core/enums/tipo_entrada.enum";
import { iniciarSesionEjercicioManualUseCase } from "../../infrastructure/di/use_cases/iniciar_ejercicio_manual.use_case.di";
import { finalizarEjercicioManualUseCase } from "../../infrastructure/di/use_cases/finalizar_ejercicio_manual.use_case.di";
import { obtenerRepeticionesEjercicioManualUseCase } from "../../infrastructure/di/use_cases/obtener_ejercicio_manual.use_case.di";
import { EjerciciosRegistrados } from "@/shared/core/domain/ejercicio.entity";

type TipoEntradaStr = "camera" | "video";

function useManualScreen() {
  // Estado UI
  const [tipoEntrada, setTipoEntrada] = useState<TipoEntradaStr>("camera");
  const [ejercicioSeleccionado, setEjercicioSeleccionado] = useState<string>("curl_bicep");
  const [videosDisponibles, setVideosDisponibles] = useState<string[]>([]);
  const [videoSeleccionado, setVideoSeleccionado] = useState<string>("");
  const [lado, setLado] = useState<"derecho" | "izquierdo">("derecho");

  // Estado de sesión
  const [ejercicioActivo, setEjercicioActivo] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [repeticiones, setRepeticiones] = useState(0);
  const [resumen, setResumen] = useState<ResumenSesion | null>(null);

  // Refs para limpieza de efectos
  const pollRef = useRef<NodeJS.Timeout | null>(null);
  const abortVideosRef = useRef<AbortController | null>(null);

  const selectedExercise = useMemo(
    () => EjerciciosRegistrados.find((e) => e.id === ejercicioSeleccionado),
    [ejercicioSeleccionado]
  );

  const handleTipoEntradaChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setTipoEntrada(e.target.value as TipoEntradaStr);
  };

  const handleIniciarEjercicio = async () => {
    try {
      setResumen(null);
      setMensaje("⏳ Iniciando sesión...");

      const tipo =
        tipoEntrada === "camera" ? TipoEntradaEnum.CAMERA : TipoEntradaEnum.VIDEO;

      await iniciarSesionEjercicioManualUseCase.execute(
        tipo,
        ejercicioSeleccionado.trim(),
        tipo === TipoEntradaEnum.VIDEO ? videoSeleccionado : undefined,
        lado
      );

      setEjercicioActivo(true);
      setMensaje("✅ Ejercicio iniciado correctamente");
    } catch (error) {
      console.error(error);
      setMensaje("❌ Error al iniciar el ejercicio");
      setEjercicioActivo(false);
    }
  };

  const handleFinalizar = async () => {
    try {
      const response = await finalizarEjercicioManualUseCase.execute();
      setResumen(response.resumen);
      setMensaje(response.mensaje);
      setEjercicioActivo(false);
    } catch (error) {
      console.error(error);
      setMensaje("❌ Error al finalizar el ejercicio");
    }
  };

  // Carga de vídeos cuando cambia ejercicio o tipoEntrada=VIDEO
  useEffect(() => {
    if (tipoEntrada !== "video") {
      setVideosDisponibles([]);
      setVideoSeleccionado("");
      abortVideosRef.current?.abort();
      return;
    }

    abortVideosRef.current?.abort();
    const controller = new AbortController();
    abortVideosRef.current = controller;

    (async () => {
      try {
        const url = `http://localhost:8000/videos-disponibles?ejercicio=${encodeURIComponent(
          ejercicioSeleccionado
        )}`;
        const res = await fetch(url, { signal: controller.signal });
        const data = await res.json();
        const lista: string[] = Array.isArray(data?.videos) ? data.videos : [];
        setVideosDisponibles(lista);
        setVideoSeleccionado(lista[0] || "");
      } catch (err) {
        if ((err as any)?.name !== "AbortError") {
          console.error("❌ Error al obtener vídeos:", err);
          setVideosDisponibles([]);
          setVideoSeleccionado("");
        }
      }
    })();

    return () => controller.abort();
  }, [ejercicioSeleccionado, tipoEntrada]);

  // Polling de repeticiones mientras la sesión está activa
  useEffect(() => {
    if (!ejercicioActivo) {
      if (pollRef.current) clearInterval(pollRef.current);
      return;
    }
    pollRef.current = setInterval(async () => {
      try {
        const repeticiones = await obtenerRepeticionesEjercicioManualUseCase.execute();
        setRepeticiones(repeticiones);
      } catch (error) {
        console.error(error);
      }
    }, 2000);

    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [ejercicioActivo]);

  return {
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
    selectedExercise,

    // setters/handlers
    setEjercicioSeleccionado,
    setVideoSeleccionado,
    setResumen,
    setLado,
    handleTipoEntradaChange,
    handleIniciarEjercicio,
    handleFinalizar,
  };
}


export { useManualScreen };