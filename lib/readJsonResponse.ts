export async function readJsonResponse(response: Response): Promise<Awaited<ReturnType<Response["json"]>>> {
  if (!response.ok) {
    throw new Error(`External request failed with HTTP ${response.status}`);
  }

  try {
    return await response.json();
  } catch {
    throw new Error("External response contained invalid JSON");
  }
}
