import type { Filters, SearchData } from "@/types/media";

export async function searchMedia(
  query: string,
  filters: Filters,
  type: "simple" | "detailed",
): Promise<SearchData> {
  const response = await fetch("/api/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      filters,
      type,
    }),
  });

  return response.json();
}

export async function selectMedia(
  name: string,
  type: string,
): Promise<SearchData> {
  const response = await fetch("/api/selected", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      type,
    }),
  });

  return response.json();
}
