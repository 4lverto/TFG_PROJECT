/////////////////////
// Requirements
/////////////////////

import { BACKEND_URL } from "@/shared/core/domain/constants/constantes";

/////////////////////
// Helpers
/////////////////////

async function httpGet<T>(url: string): Promise<T> {
  const response = await fetch(`${BACKEND_URL}${url}`);
  if (!response.ok) {
    throw new Error(`Error en GET ${url}: ${response.statusText}`);
  }
  return response.json();
}

async function httpPost<T>(url: string, body?: unknown): Promise<T> {
  const response = await fetch(`${BACKEND_URL}${url}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    throw new Error(`Error en POST ${url}: ${response.statusText}`);
  }
  return response.json();
}

/////////////////////
// Public Interface
/////////////////////

export { httpGet, httpPost };
