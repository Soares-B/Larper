"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import FormMedia from "@/components/Details/Form";
import ShowData from "@/components/Details/DataShow";
import { Heart } from "lucide-react";
import { useEffect } from "react";
import NSFWButton from "@/components/NSFW Button";

type Suggestion = {
  name: string;
  type: string;
};

type Favorite = {
  name: string
  type: string
  image: string
}

export default function Details() {
  const [media, setMedia] = useState<any>(null);
  const [current, setCurrent] = useState(1);
  const results = media?.[current] ?? null;
  const [theme, setTheme] = useState("dark");
  const [openField, setOpenField] = useState(false);
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [NSFW, setNSFW] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("Favorites");

    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  const isFavorite = results
    ? favorites.some((f) => f.image === results.cover)
    : false;

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  const [spoiler, setSpoiler] = useState(false);

  const [filters, setFilters] = useState({
    anime: true,
    manga: false,
    game: false,
    book: false,
    serie: false,
    movie: false,
    music: false,
  });

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

  async function search(type: string, NSFW: boolean) {
    setOpenField(true);
    setSuggestions([]);

    try {
      const response = await fetch("/api/random", {
        method: "POST",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
        body: JSON.stringify({
          type,
          NSFW
        }),
      });

      const info = await response.json();
      const data = info.fullSearch;

      setMedia(data);
      setCurrent(1);
    } catch (error) {
      console.error("Erro ao pesquisar:", error);
    }
  }

  function favorite() {
    if (!results) return;

    setFavorites((prev) => {
      const exist = prev.some((f) => f.image === results.cover);

      const updated = exist
        ? prev.filter((f) => f.image !== results.cover)
        : [
            ...prev,
            {
              name: results.name,
              type: results.type,
              image: results.cover,
            },
          ];

      localStorage.setItem("Favorites", JSON.stringify(updated));

      return updated;
    });
  }

  return (
    <div className="relative grid w-screen h-screen grid-rows-[18%_1fr] overflow-hidden">
      {results ? (
        <div
          className="absolute inset-0 -z-10 scale-110 bg-cover bg-center blur-sm"
          style={{
            backgroundImage: `url(${
              results.type === "anime" || results.type === "manga"
                ? results.background_image && results.background_image
                : results.background && results.background
            })`,
          }}
        />
      ) : (
        <div
          className="absolute inset-0 -z-1"
          style={{
            background: "linear-gradient(to bottom, white, rgb(186, 204, 253))",
          }}
        />
      )}
      <div className="w-[80%] max-[1441px]:h-[40%] h-[50%] flex justify-center">
        <Image
          src="/Imagens/Logo2.png"
          alt="logo"
          width={713}
          height={170}
          className="block ml-[-20%] w-fit row-1"
        />
        <FormMedia
          theme={theme}
          setTheme={setTheme}
          setOpenField={setOpenField}
          setMedia={setMedia}
          setCurrent={setCurrent}
          query={query}
          setQuery={setQuery}
          suggestions={suggestions}
          setSuggestions={setSuggestions}
          filters={filters}
          setFilters={setFilters}
          favorites={favorites}
          favorite={favorite}
        />
      </div>
      <div className="relative row-2 flex items-center justify-center w-full h-full">
        <button
          type="button"
          className={`bg-[var(--middleTone)]/50 backdrop-blur-md border border-white/20 shadow-lg ${
            theme === "dark" ? "text-[var(--text)]" : "text-[var(--textLight)]"
          } size-[50px] max-[1025px]:size-[40px] rounded-full absolute left-[3%] max-[1025px]:left-[2%] hover:cursor-pointer ${
            openField && media?.[0]?.length > 1 ? "block" : "hidden"
          }`}
          onClick={() => handleClick("left")}
        >
          <ArrowLeft className="w-[50px] max-[1025px]:w-[40px] h-[30px]" />
        </button>

        <div
          className={`relative row-2 ${
            openField ? "w-[85vw]" : "w-[0vw]"
          } h-[95%] ${
            theme === "dark"
              ? "bg-[var(--background)]"
              : theme === "light"
                ? "bg-[var(--backgroundLight)]"
                : theme === "glass"
                  ? "bg-[var(--backgroundGlass)] backdrop-blur-md"
                  : "bg-[var(--backgroundTransparent)] backdrop-blur-md"
          } ${
            theme === "dark" ? "text-[var(--text)]" : "text-[var(--textLight)]"
          } rounded-[10px] m-[0_auto] transition-[1s] top-[-2%] grid grid-cols-[1fr_3fr] grid-rows-[2.5fr_1fr]`}
        >
          {results && (
            <>
              <div className={`block w-fit col-1 row-1 w-full p-[10%]`}>
                <Link href={results.link} target="_blank" className="block w-[320px] h-[490px] select-none">
                  <Image
                    src={results.cover!}
                    width={750}
                    height={1100}
                    alt={results.name}
                    className={`rounded-[25px] w-full h-full object-cover`}
                  />
                </Link>
              </div>

              <div
                className={`${
                  openField ? "flex" : "hidden"
                } flex-col items-baseline gap-[0px] w-[70%] h-[7%] absolute left-[25%] top-[4%] font-5xl`}
              >
                <p className="flex-1 min-w-[0] overflow-hidden text-ellipsis whitespace-nowrap text-xl">
                  {results.name}
                </p>

                <p
                  className={`flex-1 text-xl ${
                    theme === "dark"
                      ? "text-[var(--middleTone)]"
                      : theme === "light"
                        ? "text-[var(--middleToneLight)]"
                        : "text-[var(--textLight)]"
                  } text-ellipsis whitespace-nowrap overflow-hidden`}
                >
                  {results.subname}
                </p>
              </div>

              <ShowData
                results={results}
                spoiler={spoiler}
                setSpoiler={setSpoiler}
                openField={openField}
                theme={theme}
                setMedia={setMedia}
                setCurrent={setCurrent}
              />

              {(results.type === "anime" || results.type === "manga") && (
                <div className="col-1 row-2 w-full h-full flex items-center justify-center gap-5">
                  <button
                    className={`inline-flex rounded-[5px] w-fit max-[1025px]:text-sm p-3 items-center justify-center ${
                      theme === "dark" ? "bg-[#ffffff11]" : "bg-[#00000022]"
                    } ${theme === "dark" ? "text-[var(--text)]" : theme === "light" ? "text-[var(--textLight)]" : "text-[var(--textLight)]"} text-violet11 shadow-blackA4 outline-none hover:bg-violet3 hover:cursor-pointer`}
                    onClick={() => search(results.type, NSFW)}
                  >
                    Random {results.type}
                  </button>

                  <NSFWButton theme={theme} NSFW={NSFW} setNSFW={setNSFW}/>

                </div>
              )}
            </>
          )}

          {results && (
            <div
              className={`${
                openField ? "flex" : "hidden"
              } absolute bottom-[3%] left-[3%] select-none gap-4 items-center`}
            >
              <button className="size-[40px] border-0 rounded-full flex items-center justify-center" onClick={() => favorite()}>
                <Heart strokeWidth={1.5} className="size-[25px]" fill={isFavorite ? '#ff2222' : 'none'} color={isFavorite ? "#ff2222" : "currentColor"}/>
              </button>
              <p className="w-fit">
                {results &&
                  results.type[0].toUpperCase() + results.type.slice(1)}
              </p>
            </div>
          )}
        </div>
        <button
          type="button"
          className={`bg-[var(--middleTone)]/50 backdrop-blur-md border border-white/20 shadow-lg ${
            theme === "dark" ? "text-[var(--text)]" : "text-[var(--textLight)]"
          } size-[50px] max-[1025px]:size-[40px] rounded-full absolute right-[3%] max-[1025px]:right-[2%] hover:cursor-pointer ${
            openField
              ? media && media?.[0]?.length > 1
                ? "block"
                : "hidden"
              : "hidden"
          }`}
          onClick={() => handleClick("right")}
        >
          <ArrowRight className="w-[50px] max-[1025px]:w-[40px] h-[30px]" />
        </button>
      </div>
    </div>
  );
}
