"use client";

import type { Filters, MediaResult, SearchData } from "@/types/media";
import { useState, useEffect } from "react";

import DesktopLogoInput from "@/components/Desktop/Logo+Form";
import DesktopMain from "@/components/Desktop/Main";

import MobileLogoInput from "@/components/Mobile/Logo+FormMobile";
import MobileMain from "@/components/Mobile/MainMobile";

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

        <div key="mobile" className="min-[769px]:hidden flex flex-col h-full min-h-0 overflow-hidden">
          
          <MobileLogoInput theme={theme} filters={filters} setFilters={setFilters} setTheme={setTheme} favorites={favorites} setOpenField={setOpenField} setMedia={setMedia} setCurrent={setCurrent}/>

          {media && media.length > 2 ?

          <div className="flex flex-row flex-1 min-h-0 items-center mt-3 gap-5
          max-[641px]:gap-3">
            <button className="w-16 aspect-square bg-white/33 backdrop-blur-xl border-1 border-white/33 focus:outline-none ml-3 rounded-full flex justify-center items-center
            max-[641px]:w-12 max-[641px]:ml-1" onClick={() => handleClick('left')}>

                <ArrowLeft className={`size-8 max-[641px]:size-6 ${theme === 'dark' ? 'text-black' : 'text-white'}`}/>
            </button>


            <MobileMain theme={theme} results={results} openField={openField} NSFW={NSFW} setNSFW={setNSFW} random={random} favorites={favorites} toggleFavorite={toggleFavorite} mediaAmount={false}/>


            <button className="w-16 aspect-square bg-white/33 backdrop-blur-xl border-1 border-white/33 focus:outline-none mr-3 rounded-full flex justify-center items-center
            max-[641px]:w-12 max-[641px]:mr-1" onClick={() => handleClick('right')}>

                <ArrowRight className={`size-8 max-[641px]:size-6 ${theme === 'dark' ? 'text-black' : 'text-white'}`}/>
            </button>
          </div>

          : <MobileMain theme={theme} results={results} openField={openField} NSFW={NSFW} setNSFW={setNSFW} random={random} favorites={favorites} toggleFavorite={toggleFavorite} mediaAmount={false}/>}
        </div>

        {/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
        <div className="hidden min-[770px]:flex w-full h-full min-h-0
        flex-col">

          <DesktopLogoInput theme={theme} filters={filters} setFilters={setFilters} setTheme={setTheme} favorites={favorites} setOpenField={setOpenField} setMedia={setMedia} setCurrent={setCurrent}/>

          <div className="flex-1 min-h-0 w-full">

            {media && media.length > 2 ? <div className="w-full h-full flex items-center justify-center gap-20
            max-[1441px]:gap-10
            max-[1367px]:gap-0 max-[1367px]:-mt-2
            max-[1281px]:scale-100 max-[1281px]:mb-0
            max-[1025px]:scale-90 max-[1025px]:gap-5 max-[1025px]:-mt-5">

              <button className="w-24 aspect-square bg-white/33 backdrop-blur-xl border-1 border-white/33 focus:outline-none ml-50
              max-[1601px]:ml-30
              max-[1441px]:w-22
              max-[1367px]:w-18
              max-[1281px]:-mt-5 max-[1281px]:ml-25 max-[1281px]:w-16
              max-[1025px]:ml-0 max-[1025px]:w-16
              rounded-full flex justify-center items-center" onClick={() => handleClick('left')}>
                <ArrowLeft className={`size-10 max-[1367px]:size-8 ${theme === 'dark' ? 'text-black' : 'text-white'}`}/>
              </button>

              <DesktopMain theme={theme} results={results} openField={openField} NSFW={NSFW} setNSFW={setNSFW} random={random} favorites={favorites} toggleFavorite={toggleFavorite} mediaAmount={media.length > 2}/>

              <button className="w-24 aspect-square bg-white/33 backdrop-blur-xl border-1 border-white/33 focus:outline-none mr-50
              max-[1601px]:mr-30
              max-[1441px]:w-22
              max-[1367px]:w-18
              max-[1281px]:-mt-5 max-[1281px]:mr-25 max-[1281px]:w-16
              max-[1025px]:mr-0 max-[1025px]:w-16
              rounded-full flex justify-center items-center" onClick={() => handleClick('right')}>
                <ArrowRight className={`size-10 max-[1367px]:size-8 ${theme === 'dark' ? 'text-black' : 'text-white'}`}/>
              </button>

            </div> : <div className="h-full
            max-[1281px]:scale-90 max-[1281px]:-mt-8
            max-[1025px]:scale-90 max-[1025px]:gap-5 max-[1025px]:-mt-5">
              <DesktopMain theme={theme} results={results} openField={openField} NSFW={NSFW} setNSFW={setNSFW} random={random} favorites={favorites} toggleFavorite={toggleFavorite} mediaAmount={false}/>
            </div>}
          </div>

        </div>

      </div>

    </div>
  );
}