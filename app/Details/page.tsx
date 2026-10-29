"use client";

import type { Filters, MediaResult, SearchData } from "@/types/media";
import { useState, useEffect } from "react";

import DesktopLogoInputDetails from "@/components/Desktop/Logo+FormDetails";
import DesktopMainDetails from "@/components/Desktop/MainDetails";

import MobileLogoInputDetails from "@/components/Mobile/Logo+FormMobileDetails";
import MobileMainDetails from "@/components/Mobile/MainMobileDetails";

import { ArrowLeft, ArrowRight } from "lucide-react";

export default function Home() {
  const [theme, setTheme] = useState("dark");
  const [openField, setOpenField] = useState(false);

  const [query, setQuery] = useState("");
  const [favorites, setFavorites] = useState<MediaResult[]>([]);
  const [NSFW, setNSFW] = useState(false);

  const [media, setMedia] = useState<SearchData | null>(null);
  const [current, setCurrent] = useState(1);
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

  const results = (media?.[current] as MediaResult | undefined) ?? null;

  useEffect(() => {
    const result = media?.[current] as MediaResult | undefined;

    if (result?.type === "anime" || result?.type === "manga") {
      setSpoiler(result.review?.spoiler ?? false);
    } else {
      setSpoiler(false);
    }
  }, [media, current]);

  useEffect(() => {
    try {
      const savedFavorites = localStorage.getItem("favorites");

      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    } catch (error) {
      console.error("Erro ao carregar favoritos:", error);
    }
  }, []);

  function handleClick(arrow: string) {
    if (!media || media.length <= 1) {
      return;
    }

    if (arrow === "left") {
      if (current !== 1) {
        setCurrent(current - 1);
      } else {
        setCurrent(media.length - 1);
      }
    } else {
      if (current < media.length - 1) {
        setCurrent(current + 1);
      } else {
        setCurrent(1);
      }
    }
  }

  async function random() {
    if (!results) return;

    const response = await fetch("/api/random", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: results.type,
        NSFW: NSFW,
        style: "detailed",
      }),
    });

    const { fullSearch } = await response.json();

    setMedia(fullSearch);
    setCurrent(1);

    setOpenField(true);
  }

  function toggleFavorite(media: MediaResult) {
    setFavorites((prevFavorites) => {
      const isFavorite = prevFavorites.some(
        (favorite) =>
          favorite.type === media.type &&
          favorite.name === media.name &&
          favorite.link === media.link,
      );

      const updatedFavorites = isFavorite
        ? prevFavorites.filter(
            (favorite) =>
              !(
                favorite.type === media.type &&
                favorite.name === media.name &&
                favorite.link === media.link
              ),
          )
        : [...prevFavorites, media];

      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

      return updatedFavorites;
    });
  }

  return (
    <div
      className={`h-screen w-screen ${results && results.cover ? "bg-cover bg-center bg-no-repeat" : "bg-linear-to-t from-sky-200 to-white"}`}
      style={
        results
          ? results.cover
            ? { backgroundImage: `url("${results.cover}")` }
            : undefined
          : undefined
      }
    >
      <div
        key="blur"
        className={`${results && results.cover && "backdrop-blur-sm"} h-full w-full`}
      >
        <div key="mobile"
             className="min-[769]:hidden w-full h-full flex flex-col">

          <MobileLogoInputDetails
            theme={theme}
            filters={filters}
            setFilters={setFilters}
            setTheme={setTheme}
            favorites={favorites}
            setOpenField={setOpenField}
            setMedia={setMedia}
            setCurrent={setCurrent}
          />

          <div className="flex flex-row flex-1 min-h-10 gap-5 items-center justify-center w-full mb-2">
            <button
                className="w-10 aspect-square bg-white/33 backdrop-blur-xl border-1 border-white/33 ml-15 rounded-full flex justify-center items-center hover:cursor-pointer"
                onClick={() => handleClick("left")}
              >
                <ArrowLeft
                  className={`size-8 ${theme === "dark" ? "text-black" : "text-white"}`}
                />
              </button>

            <button
                className="w-10 aspect-square bg-white/33 backdrop-blur-xl border-1 border-white/33 mr-15 rounded-full flex justify-center items-center hover:cursor-pointer"
                onClick={() => handleClick("right")}
              >
                <ArrowRight
                  className={`size-8 ${theme === "dark" ? "text-black" : "text-white"}`}
                />
              </button>

          </div>

          <MobileMainDetails 
            theme={theme}
            results={results}
            openField={openField}
            NSFW={NSFW}
            setNSFW={setNSFW}
            random={random}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            setMedia={setMedia}
            setCurrent={setCurrent}
            setOpenField={setOpenField}
          />

        </div>





        {/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
        <div
          key="desktop"
          className="max-[769px]:hidden w-full h-full flex flex-col"
        >
          <DesktopLogoInputDetails
            theme={theme}
            filters={filters}
            setFilters={setFilters}
            setTheme={setTheme}
            favorites={favorites}
            setOpenField={setOpenField}
            setMedia={setMedia}
            setCurrent={setCurrent}
          />

          {media && media.length > 2 ? (
            <div className="w-full h-full flex items-center justify-center gap-5">
              <button
                className="size-15 bg-white/33 backdrop-blur-xl border-1 border-white/33 ml-15 rounded-full flex justify-center items-center hover:cursor-pointer
            max-[1367px]:size-12 max-[1367px]:ml-10
            max-[1281px]:ml-5"
                onClick={() => handleClick("left")}
              >
                <ArrowLeft
                  className={`size-10 max-[1367px]:size-8 ${theme === "dark" ? "text-black" : "text-white"}`}
                />
              </button>

              <DesktopMainDetails
                theme={theme}
                results={results}
                openField={openField}
                NSFW={NSFW}
                setNSFW={setNSFW}
                random={random}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
                setMedia={setMedia}
                setCurrent={setCurrent}
                setOpenField={setOpenField}
              />

              <button
                className="size-15 bg-white/33 backdrop-blur-xl border-1 border-white/33 mr-15 rounded-full flex justify-center items-center hover:cursor-pointer
            max-[1367px]:size-12 max-[1367px]:mr-10
            max-[1281px]:mr-5"
                onClick={() => handleClick("right")}
              >
                <ArrowRight
                  className={`size-10 max-[1367px]:size-8 ${theme === "dark" ? "text-black" : "text-white"}`}
                />
              </button>
            </div>
          ) : (
            <DesktopMainDetails
              theme={theme}
              results={results}
              openField={openField}
              NSFW={NSFW}
              setNSFW={setNSFW}
              random={random}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
              setMedia={setMedia}
              setCurrent={setCurrent}
              setOpenField={setOpenField}
            />
          )}
        </div>
      </div>
    </div>
  );
}
