"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import type { MediaResult, SearchData } from "@/types/media";
import DataShow from "@/components/Details/DataShow";
import NSFWButton from "@/components/NSFW Button";

type Props = {
  results: MediaResult;
  spoiler: boolean;
  setSpoiler: Dispatch<SetStateAction<boolean>>;
  openField: boolean;
  theme: string;
  setMedia: (data: SearchData) => void;
  setCurrent: Dispatch<SetStateAction<number>>;
  isFavorite: boolean;
  favorite: () => void;
  search: (type: string, nsfw: boolean) => void;
  nsfw: boolean;
  setNSFW: Dispatch<SetStateAction<boolean>>;
};

export default function DesktopResultPanel({
  results,
  spoiler,
  setSpoiler,
  openField,
  theme,
  setMedia,
  setCurrent,
  isFavorite,
  favorite,
  search,
  nsfw,
  setNSFW,
}: Props) {
  const panelTheme =
    theme === "dark"
      ? "bg-[var(--background)] text-[var(--text)]"
      : theme === "light"
        ? "bg-[var(--backgroundLight)] text-[var(--textLight)]"
        : theme === "glass"
          ? "bg-[var(--backgroundGlass)] text-[var(--textLight)] backdrop-blur-md"
          : "bg-[var(--backgroundTransparent)] text-[var(--textLight)] backdrop-blur-md";

  return (
    <section
      className={`relative grid h-[95%] min-h-0 w-[85vw] grid-cols-[minmax(220px,1fr)_minmax(0,3fr)] grid-rows-[minmax(0,1fr)_auto] gap-x-5 overflow-hidden rounded-[10px] ${panelTheme}`}
    >
      <div className="col-start-1 row-start-1 min-h-0 p-6 pb-3">
        <Link href={results.link} target="_blank" className="block h-full min-h-0 w-full select-none">
          <Image
            src={results.cover || "/Imagens/Logo.png"}
            width={750}
            height={1100}
            alt={results.name}
            className="h-full w-full rounded-[20px] object-cover"
          />
        </Link>
      </div>

      <div className="col-start-1 row-start-2 flex flex-wrap items-center justify-center gap-3 px-4 pb-5">
        {(results.type === "anime" || results.type === "manga") && (
          <>
            <button
              type="button"
              className={`inline-flex items-center justify-center rounded-[5px] p-3 text-sm shadow-blackA4 hover:cursor-pointer hover:bg-violet3 ${theme === "dark" ? "bg-[#ffffff11]" : "bg-[#00000022]"} ${theme === "dark" ? "text-[var(--text)]" : "text-[var(--textLight)]"}`}
              onClick={() => search(results.type, nsfw)}
            >
              Random {results.type}
            </button>
            <NSFWButton theme={theme} NSFW={nsfw} setNSFW={setNSFW} />
          </>
        )}
        <button
          type="button"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          className="flex size-10 items-center justify-center rounded-full"
          onClick={favorite}
        >
          <Heart strokeWidth={1.5} className="size-[25px]" fill={isFavorite ? "#ff2222" : "none"} color={isFavorite ? "#ff2222" : "currentColor"} />
        </button>
        <span className="text-sm">{results.type[0].toUpperCase() + results.type.slice(1)}</span>
      </div>

      <div className="col-start-2 row-span-2 row-start-1 min-h-0 min-w-0">
        <div className="flex min-w-0 flex-col gap-1 pt-5 pr-5">
          <h1 className="truncate text-2xl font-semibold">{results.name}</h1>
          {results.subname && <p className="truncate text-lg text-[var(--middleTone)]">{results.subname}</p>}
        </div>
        <DataShow
          results={results}
          spoiler={spoiler}
          setSpoiler={setSpoiler}
          openField={openField}
          theme={theme}
          setMedia={setMedia}
          setCurrent={setCurrent}
        />
      </div>
    </section>
  );
}
