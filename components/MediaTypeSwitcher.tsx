"use client";

import type { MediaResult, SearchData } from "@/types/media";

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
}: {
  media: SearchData | null;
  current: number;
  setCurrent: (index: number) => void;
}) {
  if (!media || media.length <= 2) return null;

  return (
    <nav aria-label="Choose media type" className="flex flex-wrap justify-center gap-2 px-3 py-2">
      {(media.slice(1) as MediaResult[]).map((result, index) => {
        const resultIndex = index + 1;
        const active = current === resultIndex;

        return (
          <button
            key={`${result.type}-${result.id ?? resultIndex}`}
            type="button"
            aria-pressed={active}
            onClick={() => setCurrent(resultIndex)}
            className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${active ? "border-white bg-white text-black" : "border-white/40 bg-black/30 text-white hover:bg-white/20"}`}
          >
            {typeLabels[result.type] ?? result.type}
          </button>
        );
      })}
    </nav>
  );
}
