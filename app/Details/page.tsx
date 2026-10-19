"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Heart } from "lucide-react";
import type { Favorite, Filters, MediaResult, SearchData } from "@/types/media";
import FormMedia from "@/components/Details/Form";
import DataShowMobile from "@/components/Mobile/Details/DataShow";
import DesktopResultPanel from "@/components/Desktop/Details/ResultPanel";

export default function Details() {
  const [media, setMedia] = useState<SearchData | null>(null);
  const [current, setCurrent] = useState(1);
  const results = (media?.[current] as MediaResult | undefined) ?? null;
  const [theme, setTheme] = useState("dark");
  const [openField, setOpenField] = useState(false);
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [NSFW, setNSFW] = useState(false);
  const [query, setQuery] = useState("");
  const [spoiler, setSpoiler] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    anime: true,
    manga: false,
    game: false,
    book: false,
    serie: false,
    movie: false,
    music: false,
  });

  useEffect(() => {
    const saved = localStorage.getItem("Favorites");
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (results?.type === "anime" || results?.type === "manga") {
      setSpoiler(results.review?.spoiler ?? false);
    } else {
      setSpoiler(false);
    }
  }, [media, current]);

  const isFavorite = results
    ? favorites.some((item) => item.image === results.cover)
    : false;

  function handleClick(direction: "left" | "right") {
    if (!media || media.length <= 1) return;
    if (direction === "left") {
      setCurrent((value) => value > 1 ? value - 1 : media.length - 1);
    } else {
      setCurrent((value) => value < media.length - 1 ? value + 1 : 1);
    }
  }

  async function search(type: string, nsfw: boolean) {
    setOpenField(true);
    try {
      const response = await fetch("/api/random", {
        method: "POST",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
        body: JSON.stringify({ type, NSFW: nsfw }),
      });
      const info = await response.json();
      setMedia(info.fullSearch);
      setCurrent(1);
    } catch (error) {
      console.error("Erro ao pesquisar:", error);
    }
  }

  function favorite() {
    if (!results?.cover) return;
    setFavorites((previous) => {
      const exists = previous.some((item) => item.image === results.cover);
      const updated = exists
        ? previous.filter((item) => item.image !== results.cover)
        : [...previous, { name: results.name, type: results.type, image: results.cover! }];
      localStorage.setItem("Favorites", JSON.stringify(updated));
      return updated;
    });
  }

  const panelTheme =
    theme === "dark"
      ? "bg-[var(--background)] text-[var(--text)]"
      : theme === "light"
        ? "bg-[var(--backgroundLight)] text-[var(--textLight)]"
        : theme === "glass"
          ? "bg-[var(--backgroundGlass)] text-[var(--textLight)] backdrop-blur-md"
          : "bg-[var(--backgroundTransparent)] text-[var(--textLight)] backdrop-blur-md";

  return (
    <main className="relative grid min-h-dvh w-full grid-rows-[auto_minmax(0,1fr)] overflow-hidden max-[1024px]:min-h-dvh max-[1024px]:grid-rows-[auto_minmax(850px,auto)] max-[1024px]:overflow-y-auto">
      {results ? (
        <div
          className="absolute inset-0 -z-10 scale-110 bg-cover bg-center blur-sm"
          style={{
            backgroundImage: `url(${results.type === "anime" || results.type === "manga" ? results.background_image : results.background})`,
          }}
        />
      ) : (
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,white,rgb(186,204,253))]" />
      )}

      <header className="relative z-20 mx-auto flex w-[min(1200px,94vw)] items-center justify-center gap-6 py-4 max-[1024px]:w-[96vw] max-[1024px]:flex-col max-[1024px]:gap-3 max-[640px]:w-full max-[640px]:px-3 max-[640px]:py-3">
        <Link href="/" className="shrink-0">
          <Image
            src="/Imagens/Logo2.png"
            alt="logo"
            width={713}
            height={170}
            priority
            className="block h-auto w-[min(36vw,420px)] max-[1024px]:w-[min(65vw,360px)] max-[640px]:w-[min(78vw,320px)]"
          />
        </Link>
        <FormMedia
          theme={theme}
          setTheme={setTheme}
          setOpenField={setOpenField}
          setMedia={setMedia}
          setCurrent={setCurrent}
          query={query}
          setQuery={setQuery}
          filters={filters}
          setFilters={setFilters}
          favorites={favorites}
          favorite={favorite}
        />
      </header>

      <section className="relative flex min-h-0 w-full items-center justify-center px-20 py-3 max-[1024px]:min-h-[850px] max-[1024px]:px-2">
        <button
          type="button"
          aria-label="Previous result"
          className={`absolute left-5 z-20 flex size-10 items-center justify-center rounded-full border border-white/20 bg-[var(--middleTone)]/50 shadow-lg backdrop-blur-md max-[1024px]:left-1 ${openField && media && media[0].length > 1 ? "block" : "hidden"}`}
          onClick={() => handleClick("left")}
        >
          <ArrowLeft className="size-7" />
        </button>

        {results && openField ? (
          <>
            <div className="hidden h-full min-h-0 w-full min-[1025px]:flex">
              <DesktopResultPanel
                results={results}
                spoiler={spoiler}
                setSpoiler={setSpoiler}
                openField={openField}
                theme={theme}
                setMedia={setMedia}
                setCurrent={setCurrent}
                isFavorite={isFavorite}
                favorite={favorite}
                search={search}
                nsfw={NSFW}
                setNSFW={setNSFW}
              />
            </div>

            <div className={`relative grid h-[800px] min-h-[800px] w-[96vw] grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] grid-rows-[minmax(0,1fr)_minmax(0,1.4fr)_auto] gap-2 overflow-hidden rounded-[10px] ${panelTheme} min-[1025px]:hidden`}>
              <div className="col-start-1 row-start-1 min-h-0 p-3">
                <Link href={results.link} target="_blank" className="block h-full w-full">
                  <Image
                    src={results.cover || "/Imagens/Logo.png"}
                    width={750}
                    height={1100}
                    alt={results.name}
                    className="h-full w-full rounded-[18px] object-cover"
                  />
                </Link>
              </div>
              <div className="col-start-2 row-start-1 min-w-0 overflow-hidden px-2 pt-4">
                <h1 className="truncate text-lg font-semibold">{results.name}</h1>
                {results.subname && <p className="truncate text-sm text-[var(--middleTone)]">{results.subname}</p>}
                <p className="mt-3 max-h-[65%] overflow-y-auto text-sm text-justify">{results.description}</p>
              </div>
              <div className="col-span-2 row-start-2 min-h-0 overflow-hidden">
                <DataShowMobile
                  results={results}
                  spoiler={spoiler}
                  setSpoiler={setSpoiler}
                  openField={openField}
                  theme={theme}
                  setMedia={setMedia}
                  setCurrent={setCurrent}
                />
              </div>
              <div className="col-span-2 row-start-3 flex items-center justify-center gap-3 p-3">
                {(results.type === "anime" || results.type === "manga") && (
                  <>
                    <button
                      type="button"
                      className="rounded-md bg-white/10 px-3 py-2 text-sm"
                      onClick={() => search(results.type, NSFW)}
                    >
                      Random {results.type}
                    </button>
                    <button
                      type="button"
                      className={`rounded-md p-2 ${NSFW ? "bg-white/30" : "bg-white/10"}`}
                      onClick={() => setNSFW((value) => !value)}
                    >
                      NSFW {NSFW ? "On" : "Off"}
                    </button>
                  </>
                )}
                <button type="button" aria-label="Toggle favorite" onClick={favorite} className="flex size-10 items-center justify-center">
                  <Heart className="size-6" fill={isFavorite ? "#ff2222" : "none"} color={isFavorite ? "#ff2222" : "currentColor"} />
                </button>
                <span className="text-sm">{results.type}</span>
              </div>
            </div>
          </>
        ) : (
          <div className={`hidden min-h-0 w-full items-center justify-center rounded-[10px] ${panelTheme} ${openField ? "min-[1025px]:flex" : ""} max-[1024px]:hidden`}>
            <p className="text-lg">Search for a title to see its details.</p>
          </div>
        )}

        <button
          type="button"
          aria-label="Next result"
          className={`absolute right-5 z-20 flex size-10 items-center justify-center rounded-full border border-white/20 bg-[var(--middleTone)]/50 shadow-lg backdrop-blur-md max-[1024px]:right-1 ${openField && media && media[0].length > 1 ? "block" : "hidden"}`}
          onClick={() => handleClick("right")}
        >
          <ArrowRight className="size-7" />
        </button>
      </section>
    </main>
  );
}
