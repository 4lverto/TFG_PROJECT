'use client';

import { useEffect, useMemo, useRef, useState, ChangeEvent } from "react";
import { ResumenSesion } from "@/shared/core/domain/resumen_sesion.entity";
import { TipoEntradaEnum } from "@/shared/core/enums/tipo_entrada.enum";
import { iniciarEjercicioManualUseCase } from "../../infrastructure/di/use_cases/iniciar_ejercicio_manual.use_case.di";
import { finalizarEjercicioManualUseCase } from "../../infrastructure/di/use_cases/finalizar_ejercicio_manual.use_case.di";
import { obtenerRepeticionesEjercicioManualUseCase } from "../../infrastructure/di/use_cases/obtener_repeticiones_ejercicio_manual.use_case.di";
import { EjerciciosRegistrados } from "@/shared/core/domain/ejercicio.entity";
import { CamaraInfo, getCamarasDisponibles } from "@/shared/adapters/infrastructure/http/camaras.api";
import { BACKEND_URL } from "@/shared/core/domain/constants/constantes";

function useManualScreen() {
  // Estado UI
  const [tipoEntrada, setTipoEntrada] = useState<TipoEntradaEnum>(TipoEntradaEnum.CAMERA);
  const [ejercicioSeleccionado, setEjercicioSeleccionado] = useState<string>("curl_bicep");
  const [videosDisponibles, setVideosDisponibles] = useState<string[]>([]);
  const [videoSeleccionado, setVideoSeleccionado] = useState<string>("");
  const [lado, setLado] = useState<"derecho" | "izquierdo">("derecho");

  // Estado de sesión
  const [ejercicioActivo, setEjercicioActivo] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [repeticiones, setRepeticiones] = useState(0);
  const [resumen, setResumen] = useState<ResumenSesion | null>(null);

  // Orientación de la cámara
  const [camaras, setCamaras] = useState<CamaraInfo[]>([]);
  const [normalizar, setNormalizar] = useState<"auto" | "horizontal" | "vertical">("auto");
  const [forzarRotacion, setForzarRotacion] = useState<0 | 90 | 180 | 270>(0);
  const [indiceCamara, setIndiceCamara] = useState<number>(0);

  // Refs para limpieza de efectos
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const abortVideosRef = useRef<AbortController | null>(null);

  const selectedExercise = useMemo(
    () => EjerciciosRegistrados.find((e) => e.id === ejercicioSeleccionado),
    [ejercicioSeleccionado]
  );

  const handleTipoEntradaChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as TipoEntradaEnum;

    setTipoEntrada(value);

    setNormalizar(value === TipoEntradaEnum.CAMERA ? "horizontal" : "auto");

    if (value === TipoEntradaEnum.CAMERA) setVideoSeleccionado("");

  };

  const handleIniciarEjercicio = async () => {
    try {
      setResumen(null);
      setMensaje("⏳ Iniciando sesión...");

      const tipo =
        tipoEntrada === TipoEntradaEnum.CAMERA ? TipoEntradaEnum.CAMERA : TipoEntradaEnum.VIDEO;

      await iniciarEjercicioManualUseCase.execute(
        tipo,
        ejercicioSeleccionado.trim(),
        tipo === TipoEntradaEnum.VIDEO ? videoSeleccionado : undefined,
        lado,
        normalizar,
        forzarRotacion,
        indiceCamara,
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
      setMensaje("Finalizando...");
      const response = await finalizarEjercicioManualUseCase.execute();
      setEjercicioActivo(false);
      setResumen(response?.resumen ?? null);
      setMensaje(response?.mensaje ?? "Sesión finalizada");
    } catch (error: any) {
      console.error(error);
      setMensaje(`❌ Error al finalizar el ejercicio${error?.message ? `: ${error.message}` : ""}`);
    }
  };

  // Carga de vídeos cuando cambia ejercicio o tipoEntrada=VIDEO
  useEffect(() => {
    if (tipoEntrada !== TipoEntradaEnum.VIDEO) {
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
        const url = `${BACKEND_URL}/videos-disponibles?ejercicio=${encodeURIComponent(
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

  useEffect(() => {
    let mounted = true;
    async function load() {
      if (tipoEntrada === TipoEntradaEnum.CAMERA) {
        const list = await getCamarasDisponibles();
        if (!mounted) return;
        setCamaras(list);
        // Si hay exactamente 1, usarla y ocultar el selector en UI (con list.length <= 1)
        setIndiceCamara(list.length > 0 ? list[0].index : 0);
      } else {
        setCamaras([]);
        setIndiceCamara(0);
      }
    }
    load();
    return () => { mounted = false; };
  }, [tipoEntrada]);
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
    normalizar,
    forzarRotacion,
    indiceCamara,
    camaras,

    // setters/handlers
    handleTipoEntradaChange,
    handleIniciarEjercicio,
    handleFinalizar,
    setEjercicioSeleccionado,
    setVideoSeleccionado,
    setResumen,
    setLado,
    setNormalizar,
    setForzarRotacion,
    setIndiceCamara,
    setCamaras,
  };
}


export { useManualScreen };