/////////////////////
// Requirements
/////////////////////

import { BaseEjercicioManualRepository } from "@/features/manual/core/domain/ports/ejercicio_manual.repository";
import { httpGet, httpPost } from "@/shared/adapters/infrastructure/http/httpClient";
import { IniciarSesionEntity } from "@/shared/core/domain/iniciar_sesion.entity";
import { ResumenSesion } from "@/shared/core/domain/resumen_sesion.entity";
import { TipoEntradaEnum } from "@/shared/core/enums/tipo_entrada.enum";

/////////////////////
// Implementation
/////////////////////

class EjercicioManualHttpRepository implements BaseEjercicioManualRepository {
    async iniciarEjercicioManual(
        tipo: TipoEntradaEnum,
        ejercicio: string,
        fuente?: string,
        lado: "derecho" | "izquierdo" = "derecho",
        normalizar: "horizontal" | "vertical" | "auto" = "auto",
        forzar_grados_rotacion: 0 | 90 | 180 | 270 = 0,
        indice_camara: number = 0,
    ): Promise<string> {
        const body: IniciarSesionEntity = {
            tipo: tipo,
            nombre_ejercicio: ejercicio,
            ...(tipo === TipoEntradaEnum.VIDEO && fuente ? { fuente } : {}),
            lado,
            normalizar,
            forzar_grados_rotacion,
            indice_camara,
        };

        const respuesta = await httpPost<{ mensaje?: string; error?: string } | null>("/iniciar-ejercicio", body);

        if (!respuesta) return "Sesion iniciada";

        if (respuesta?.error) {
            throw new Error(respuesta.error);
        }

        return respuesta?.mensaje ?? "Sesion iniciada";
    }

    async obtenerRepeticionesEjercicioManual(): Promise<number> {
        const data = await httpGet<{ repeticiones?: Number; mensaje?: string }>("/estado-ejercicio");

        if (typeof data?.repeticiones === "number") return data.repeticiones;

        return 0;
    }

    async finalizarEjercicioManual(): Promise<{ mensaje: string; resumen: ResumenSesion; }> {

        const respuesta = await httpPost<{ mensaje?: string; resumen?: ResumenSesion; error?: string } | null>("/finalizar-ejercicio");

        if (!respuesta) throw new Error("Respuesta vacía del backend");
        if (respuesta.error) throw new Error(respuesta.error);
        if (!respuesta.resumen) throw new Error("No se recibió el resumen de la sesión");

        return { mensaje: respuesta.mensaje ?? "Ejercicio finalizado", resumen: respuesta.resumen };
    }

    async listarVideosEjercicioManual(ejercicio: string): Promise<string[]> {
        const data = await httpGet<{ videos?: string[] }>(
            `/videos-disponibles?ejercicio=${ejercicio}`
        );
        return data?.videos ?? [];
    }
};

/////////////////////
// Public Interface
/////////////////////

export { EjercicioManualHttpRepository };
