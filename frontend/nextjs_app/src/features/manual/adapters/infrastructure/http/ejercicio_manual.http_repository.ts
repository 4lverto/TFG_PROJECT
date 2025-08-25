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
    async iniciarEjercicioManual(tipo: TipoEntradaEnum, ejercicio: string, fuente?: string, lado?: "derecho" | "izquierdo"): Promise<string> {
        const body: IniciarSesionEntity = {
            tipo: tipo,
            nombre_ejercicio: ejercicio,
            lado: lado ?? "derecho",
        };

        if (tipo === TipoEntradaEnum.VIDEO && fuente) {
            body.fuente = fuente;
        }

        const mensaje = httpPost<string>("/iniciar-ejercicio", body);
        return mensaje;
    }

    async obtenerRepeticionesEjercicioManual(): Promise<number> {
        const {repeticiones} = await httpGet<{repeticiones: number}>("/estado-ejercicio");
        return repeticiones;
    }

    async finalizarEjercicioManual(): Promise<{ mensaje: string; resumen: ResumenSesion; }> {
        return httpPost<{ mensaje: string; resumen: ResumenSesion }>("/finalizar-ejercicio");

    }

    async listarVideosEjercicioManual(ejercicio: string) {
        const data = await httpGet<{ videos: string[] }>(
            `/videos-disponibles?ejercicio=${ejercicio}`
        );
        return data.videos;
    }
};

/////////////////////
// Public Interface
/////////////////////

export { EjercicioManualHttpRepository };
