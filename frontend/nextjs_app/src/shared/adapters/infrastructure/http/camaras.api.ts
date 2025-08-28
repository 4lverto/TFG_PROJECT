/////////////////////
// Requirements
/////////////////////

import { httpGet } from "@/shared/adapters/infrastructure/http/httpClient";

/////////////////////
// Helpers
/////////////////////

interface CamaraInfo {
    index: number;
    label: string;
}

async function getCamarasDisponibles(): Promise<CamaraInfo[]> {
    try {
        const resp = await httpGet<{ devices: CamaraInfo[] }>("/camaras-disponibles");
        return resp?.devices ?? [];
    } catch (e) {
        console.debug("error en getCamarasDisponibles: e");
        return [];
    }
}

export type { CamaraInfo };
export { getCamarasDisponibles };