"use client";

import type { Filters, MediaResult, SearchData } from "@/types/media";

const typeLabels: Record<string, string> = {
  anime: "Anime",
  manga: "Manga",
  game: "Game",
  book: "Book",
  serie: "Series",
  movie: "Movie",
  music: "Music",
};

export default function MediaTypeSwitcher({
  media,
  current,
  setCurrent,
  filters,
}: {
  media: SearchData | null;
  current: number;
  setCurrent: (index: number) => void;
  filters: Filters;
}) {
  const requestedTypes = Object.entries(filters)
    .filter(([, selected]) => selected)
    .map(([type]) => type);

  if (!media || requestedTypes.length <= 1) return null;

  return (
    <nav aria-label="Choose media type" className="flex flex-wrap justify-center gap-2 px-3 py-2">
      {requestedTypes.map((type) => {
        const resultIndex = (media.slice(1) as MediaResult[]).findIndex((result) => result.type === type) + 1;
        const active = resultIndex > 0 && current === resultIndex;
        const label = typeLabels[type] ?? type;

        return (
          <button
            key={type}
            type="button"
            disabled={resultIndex === 0}
            aria-pressed={active}
            onClick={() => resultIndex > 0 && setCurrent(resultIndex)}
            className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${active ? "border-white bg-white text-black" : resultIndex === 0 ? "cursor-not-allowed border-white/20 bg-black/20 text-white/50" : "border-white/40 bg-black/30 text-white hover:bg-white/20"}`}
          >
            {resultIndex === 0 ? `${label} unavailable` : label}
          </button>
        );
      })}
    </nav>
  );
}
