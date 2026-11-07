export async function readJsonResponse<T = any>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error(`External request failed with HTTP ${response.status}`);
  }

  try {
    return await response.json() as T;
  } catch {
    throw new Error("External response contained invalid JSON");
  }
}
