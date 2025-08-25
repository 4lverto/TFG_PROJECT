// src/shared/adapters/infrastructure/http/camaras.api.ts
import { httpGet } from "@/shared/adapters/infrastructure/http/httpClient";

interface CamaraInfo {
    index: number;
    label: string;
}

async function getCamarasDisponibles(): Promise<CamaraInfo[]> {
    try {
        const resp = await httpGet<{ devices: CamaraInfo[] }>("/camaras-disponibles");
        return resp.devices ?? [];
    } catch {
        return [];
    }
}

export type { CamaraInfo };
export { getCamarasDisponibles };