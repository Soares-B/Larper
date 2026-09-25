"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import FormMedia from "@/components/main/Form";
import DataShow from "@/components/main/DataShow";

type result = {
  review: {
    [key: string]: any;
  };
  name: string;
  subname?: string | null;
  description?: string | null;
  background?: string | null;
  cover?: string | null;
  id?: string | null;
  rating?: number | null;
  genres?: string[] | null;
  link: string;
  status?: string | null;
  type: string;
  date: string | null;

  totalEpisode?: string;
  season?: string | null;
  runtime?: string | null;
  volumes?: string | null;
  chapters?: string | null;
  totalSeason?: string | null;
  pages?: string | null;
  tagline?: string | null;

  time?: string;
  artist?: {
    name: string;
  };
  album?: {
    name: string;
  };
  vote_count?: number;
  budget?: number;
  revenue?: number;
};

type Suggestion = {
  name: string;
  type: string;
};

type SearchData = [string[], ...result[]];

export default function Details() {
  const [media, setMedia] = useState<any>(null);
  const [current, setCurrent] = useState(1);
  const results = media?.[current] ?? null;
  const [theme, setTheme] = useState("dark");
  const [openField, setOpenField] = useState(false);

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
      <div className="w-[80%] h-[50%] flex justify-center">
        <Image
          src="/Imagens/Logo2.png"
          alt="logo"
          width={713}
          height={170}
          className="block ml-[-20%] w-fit row-1"
        />
        <FormMedia theme={theme} setTheme={setTheme} setOpenField={setOpenField} setMedia={setMedia} setCurrent={setCurrent} query={query} setQuery={setQuery} suggestions={suggestions} setSuggestions={setSuggestions} filters={filters} setFilters={setFilters}/>

      </div>
      <div className="relative row-2 flex items-center justify-center w-full h-full">
        <button
          type="button"
          className={`bg-[var(--middleTone)]/50 backdrop-blur-md border border-white/20 shadow-lg ${
            theme === "dark" ? "text-[var(--text)]" : "text-[var(--textLight)]"
          } w-[50px] h-[50px] rounded-full absolute left-[15%] hover:cursor-pointer ${
            openField && media?.[0]?.length > 1 ? "block" : "hidden"
          }`}
          onClick={() => handleClick("left")}
        >
          <ArrowLeft className="w-[50px] h-[30px]" />
        </button>

        <div
          className={`relative row-2 ${
            openField ? "w-[85vw]" : "w-[0vw]"
          } h-[100%] ${
            theme === "dark"
              ? "bg-[var(--background)]"
              : theme === "light"
                ? "bg-[var(--backgroundLight)]"
                : theme === "glass"
                  ? "bg-[var(--backgroundGlass)] backdrop-blur-md"
                  : "bg-[var(--backgroundTransparent)] backdrop-blur-md"
          } ${
            theme === "dark" ? "text-[var(--text)]" : "text-[var(--textLight)]"
          } rounded-[10px] m-[0_auto] transition-[1s] top-[-2%]`}
        >
          {results && (
            <Link href={results.link} target="_blank" className="select-none">
              <Image
                src={results.cover!}
                width={600}
                height={700}
                alt={results.name}
                className={`absolute block scale-[.50] rounded-[25px] ${
                  results.type === "music" ? "top-[-5%]" : "top-[-32%]"
                } left-[-10%] w-[45%]`}
              />
            </Link>
          )}

          {results && (
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
          )}

          <DataShow results={results} spoiler={spoiler} setSpoiler={setSpoiler} openField={openField} theme={theme}/>

          <p
            className={`${
              openField ? "inline" : "hidden"
            } absolute bottom-[3%] left-[3%] ${
              theme === "dark"
                ? "drop-shadow-[var(--dropShadow)]"
                : theme === "light"
                  ? "drop-shadow-[var(--dropShadowLigth)]"
                  : "drop-shadow-[var(--dropShadowLight)]"
            } drop-shadow-[0px_0px_5px] select-none`}
          >
            {results && results.type === "anime"
              ? `${results.season} - ${results.type}`
              : (results && results.type === "movie" && results.tagline) ||
                  (results && results.type === "serie" && results.tagline)
                ? `${results.tagline} - ${results.type}`
                : results && results.type
                  ? results.type
                  : ""}
          </p>
        </div>

        <button
          type="button"
          className={`bg-[var(--middleTone)]/50 backdrop-blur-md border border-white/20 shadow-lg ${
            theme === "dark" ? "text-[var(--text)]" : "text-[var(--textLight)]"
          } w-[50px] h-[50px] rounded-full absolute right-[15%] hover:cursor-pointer ${
            openField
              ? media && media?.[0]?.length > 1
                ? "block"
                : "hidden"
              : "hidden"
          }`}
          onClick={() => handleClick("right")}
        >
          <ArrowRight className="w-[50px] h-[30px]" />
        </button>
      </div>
    </div>
  );
}
