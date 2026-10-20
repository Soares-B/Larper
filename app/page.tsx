"use client";

import type { Filters, MediaResult, SearchData } from "@/types/media";
import { useState, useEffect } from "react";

import DesktopLogoInput from "@/components/Desktop/Logo+Form";
import DesktopMain from "@/components/Desktop/Main";

import { ArrowLeft, ArrowRight } from "lucide-react";

export default function Home() {
  const [theme, setTheme] = useState("dark");
  const [openField, setOpenField] = useState(false);

  const [query, setQuery] = useState("");
  const [favorites, setFavorites] = useState<MediaResult[]>([]);
  const [NSFW, setNSFW] = useState(false)

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

  console.log(media)

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

  async function random(){
    if (!results) return;

    const response = await fetch("/api/random", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: results.type,
        NSFW: NSFW,
        style: 'simple'
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
          favorite.link === media.link
      );

      const updatedFavorites = isFavorite
        ? prevFavorites.filter(
            (favorite) =>
              !(
                favorite.type === media.type &&
                favorite.name === media.name &&
                favorite.link === media.link
              )
          )
        : [...prevFavorites, media];

      localStorage.setItem(
        "favorites",
        JSON.stringify(updatedFavorites)
      );

      return updatedFavorites;
    });
  }

  return (
    <div className={`h-screen w-screen ${results && results.cover ? 'bg-cover bg-center bg-no-repeat' : 'bg-linear-to-t from-red-900 to-black'}`} style={results ? (results.cover ? { backgroundImage: `url("${results.cover}")` } : undefined) : undefined}>

      <div key='blur' className={`${results && results.cover && 'backdrop-blur-sm'} h-full w-full`}>

        <div key="mobile" className="min-[769]:hidden">

        </div>

        {/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
        <div key="desktop" className="max-[768]:hidden w-full h-full flex flex-col">
          <DesktopLogoInput theme={theme} filters={filters} setFilters={setFilters} setTheme={setTheme} favorites={favorites} setOpenField={setOpenField} setMedia={setMedia} setCurrent={setCurrent}/>

          {media && media.length > 2 ? <div className="w-full h-full flex items-center justify-center gap-5">

            <button className="size-15 bg-white/33 backdrop-blur-xl border-1 border-white/33 ml-70 rounded-full flex justify-center items-center" onClick={() => handleClick('left')}>
              <ArrowLeft className={`size-10 ${theme === 'dark' ? 'text-black' : 'text-white'}`}/>
            </button>

            <DesktopMain theme={theme} results={results} openField={openField} NSFW={NSFW} setNSFW={setNSFW} random={random} favorites={favorites} toggleFavorite={toggleFavorite}/>

            <button className="size-15 bg-white/33 backdrop-blur-xl border-1 border-white/33 mr-70 rounded-full flex justify-center items-center" onClick={() => handleClick('right')}>
              <ArrowRight className={`size-10 ${theme === 'dark' ? 'text-black' : 'text-white'}`}/>
            </button>

          </div> : <DesktopMain theme={theme} results={results} openField={openField} NSFW={NSFW} setNSFW={setNSFW} random={random} favorites={favorites} toggleFavorite={toggleFavorite}/>}

        </div>

      </div>

    </div>
  );
}