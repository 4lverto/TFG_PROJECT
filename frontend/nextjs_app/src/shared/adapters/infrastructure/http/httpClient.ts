/////////////////////
// Requirements
/////////////////////

import { BACKEND_URL } from "@/shared/core/domain/constants/constantes";

/////////////////////
// Helpers
/////////////////////

function errorSiNoOk(resp: Response, url: string) {
  if (!resp.ok) { throw new Error(`HTTP ${resp.status} en ${url} : ${resp.statusText}`) }
}

async function parsear<T>(resp: Response): Promise<T | null> {
  const text = await resp.text();

  if (!text) return null;

  try {
    return JSON.parse(text) as T;
  } catch {
    return null;
  }
}

async function httpGet<T>(url: string): Promise<T | null> {
  const response = await fetch((`${BACKEND_URL}${url}`), { cache: "no-store" });
  errorSiNoOk(response, `${BACKEND_URL}${url}`);
  const data = await parsear<T>(response);

  if (data == null) throw new Error(`GET ${url}: respuesta vacía`);
  return data;
}

async function httpPost<T>(url: string, body?: unknown): Promise<T | null> {
  const response = await fetch(`${BACKEND_URL}${url}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
    body: body ? JSON.stringify(body) : undefined,
  });

  errorSiNoOk(response, `${BACKEND_URL}${url}`);
  return await parsear<T>(response);
}

/////////////////////
// Public Interface
/////////////////////

export { httpGet, httpPost };
