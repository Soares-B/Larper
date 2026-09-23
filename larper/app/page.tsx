"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import Menu from "@/components/Types";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import Theme from "@/components/Theme";

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
};

type SearchData = [string[], ...result[]];

type Suggestion = {
  name: string;
  type: string;
};

export default function Home() {
  const [theme, setTheme] = useState("dark");

  const [openField, setOpenField] = useState(false);

  const [query, setQuery] = useState("");
  const [entry, setEntry] = useState<Suggestion | undefined>(undefined);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  const [media, setMedia] = useState<any>(null);
  const [current, setCurrent] = useState(1);
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

  const results = media?.[current] ?? null;

  useEffect(() => {
    const result = media?.[current];

    if (result?.type === "anime" || result?.type === "manga") {
      setSpoiler(result.review?.spoiler);
    } else {
      setSpoiler(false);
    }
  }, [media, current]);

  useEffect(() => {
    const suggestionSearch = async () => {
      if (!query.trim()) {
        setSuggestions([]);
        return;
      }

      try {
        const response = await fetch("/api/suggestions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: query,
          }),
        });

        const data = await response.json();

        setSuggestions(data.suggestions ?? []);
      } catch (error) {
        console.error("Erro ao buscar sugestões:", error);
        setSuggestions([]);
      }
    };

    const delay = setTimeout(() => {
      suggestionSearch();
    }, 500);

    return () => clearTimeout(delay);
  }, [query]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!query.trim()) {
      return;
    }

    setOpenField(true);
    setSuggestions([]);

    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: query,
          filters: filters,
        }),
      });

      const data: SearchData = await response.json();

      console.log(data);

      setMedia(data);
      setCurrent(1);
    } catch (error) {
      console.error("Erro ao pesquisar:", error);
    }
  }

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
    <div className="grid w-screen h-screen grid-rows-[20%_7%_1px_1fr] bg-[linear-gradient(to_bottom,black,rgb(77,0,0))]">
      <Image
        src="/Imagens/Logo.png"
        alt="logo"
        width={713}
        height={170}
        className="block scale-[.75] m-[0_auto] pt-[30px]"
      />

      <form
        className="block m-[0_auto] mt-[5px] mb-[30px] w-[35%] h-[40px] flex justify-between"
        onSubmit={handleSubmit}
      >
        <div className="w-[80%] relative">
          <Combobox
            value={entry}
            onChange={async (selectedItem) => {
              if (!selectedItem) return;

              setEntry(selectedItem);
              setQuery(selectedItem.name);
              setSuggestions([]);

              try {
                const response = await fetch("/api/selected", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    name: selectedItem.name,
                    type: selectedItem.type,
                  }),
                });

                const data: SearchData = await response.json();
                setMedia(data);
                setCurrent(1);
              } catch (error) {
                console.error("Erro ao buscar item selecionado:", error);
              }
            }}
          >
            <ComboboxInput
              className={`w-full h-full p-px ${theme === 'dark' ? 'bg-[var(--background)]' : theme === 'light' ? 'bg-[var(--backgroundLight)]' : 'bg-[var(--backgroundTransparent)]'} ${theme === 'dark' ? 'text-[var(--text)]' : theme === 'light' ? 'text-[var(--textLight)]' : 'text-[var(--textLight)]'} text-[rgba(255,255,255,0.455)] border-[rgba(255,255,255,0.171)] rounded-[5px] focus:outline-none text-xl pl-1 focus:outline-none`}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setEntry(undefined);
              }}
              autoComplete="off"
            />

            <ComboboxOptions
              static
              className={`absolute top-[45px] left-0 w-full ${theme === "dark" ? "bg-[var(--background)]" : theme === "light" ? "bg-[var(--backgroundLight)]" : "bg-[var(--backgroundTransparent)]"} border border-[rgba(255,255,255,0.171)] rounded-[5px] overflow-hidden z-50 shadow-lg ${
                suggestions.length === 0 ? "hidden" : "block"
              }`}
            >
              {suggestions.map((item, index) => (
                <ComboboxOption
                  key={`${item.type}-${item.name}-${index}`}
                  value={item}
                  className={`px-3 py-2 ${theme === 'dark' ? 'text-[var(--text)]' : theme === 'light' ? 'text-[var(--textLight)]' : 'text-[var(--textLight)]'} data-[focus]:bg-zinc-800 cursor-pointer flex justify-between items-center`}
                >
                  <span>{item.name}</span>

                  <span className="text-xs text-zinc-500 uppercase">
                    {item.type}
                  </span>
                </ComboboxOption>
              ))}
            </ComboboxOptions>
          </Combobox>
        </div>

        <button
          type="submit"
          className={`w-[20%] p-px ${theme === 'dark' ? 'bg-[var(--background)]' : theme === 'light' ? 'bg-[var(--backgroundLight)]' : 'bg-[var(--backgroundTransparent)]'} ${theme === 'dark' ? 'text-[var(--text)]' : theme === 'light' ? 'text-[var(--textLight)]' : 'text-[var(--textLight)]'} text-[rgba(255,255,255,0.455)] border-[rgba(255,255,255,0.171)] rounded-[5px] m-[0_10px] focus:outline-none text-xl hover:cursor-pointer`}
        >
          Search
        </button>

        <Menu filters={filters} setFilters={setFilters} theme={theme} />
        <Theme theme={theme} setTheme={setTheme} />
      </form>

      <div className="relative row-4 flex items-center justify-center w-full h-full">
        <button
          className={`bg-[var(--middleTone)]/50 backdrop-blur-md border border-white/20 shadow-lg ${theme === "dark" ? "text-[var(--text)]" : theme === "light" ? "text-[var(--textLight)]" : "text-[var(--textLight)]"} w-[50px] h-[50px] rounded-full absolute left-[15%] hover:cursor-pointer ${
            openField && media?.[0]?.length > 1 ? "block" : "hidden"
          }`}
          onClick={() => handleClick("left")}
        >
          <ArrowLeft className="w-[50px] h-[30px]" />
        </button>

        <div
          className={`relative row-4 ${
            openField ? "w-[60vw]" : "w-[0vw]"
          } h-[98%] ${theme === "dark" ? "bg-[var(--background)]" : theme === "light" ? "bg-[var(--backgroundLight)]" : "bg-[var(--backgroundTransparent)]"} ${theme === "dark" ? "text-[var(--text)]" : theme === "light" ? "text-[var(--textLight)]" : "text-[var(--textLight)]"} rounded-[10px] m-[0_auto] transition-[1s]`}
        >
          {results && (
            <Link href={results.link} className="select-none">
              <Image
                src={results.cover!}
                width={600}
                height={700}
                alt={results.name}
                className="absolute block scale-[.75] rounded-[25px] top-[-10%] left-[-3%] w-[45%]"
              />
            </Link>
          )}

          {results && (
            <div
              className={`${
                openField ? "flex" : "hidden"
              } flex-row items-baseline gap-[10px] w-[60%] h-[7%] absolute right-[2%] top-[5%] font-5xl`}
            >
              <p className="flex-1 min-w-[0] overflow-hidden text-ellipsis whitespace-nowrap text-xl">
                {results.name}
              </p>

              <p
                className={`flex-1 text-xl ${theme === "dark" ? "text-[var(--middleTone)]" : theme === "light" ? "text-[var(--middleToneLight)]" : "text-[var(--middleToneLight)]"} text-ellipsis whitespace-nowrap overflow-hidden`}
              >
                {results.subname && results.subname}
              </p>
            </div>
          )}

          {results && (
            <div
              className={`${
                openField ? "grid" : "hidden"
              } absolute justify-center w-[60%] h-[76%] top-[15%] left-[38%] grid-rows-[1.5fr_1fr_1fr_1fr] grid-cols-[1fr_1fr]`}
            >
              <p className={`${theme === 'dark' ? 'text-[var(--middleTone)]' : theme === 'light' ? 'text-[var(--middleToneLight)]' : 'text-[var(--middleToneLight)]'} col-[1/3] text-xl text-justify`}>
                {results.description && results.description}
              </p>

              <div className="relative bg-[#3737376e] w-[70%] h-[80%] rounded-[20px]">
                <p className={`${theme === 'dark' ? 'text-[var(--middleTone)]' : theme === 'light' ? 'text-[var(--middleToneLight)]' : 'text-[var(--middleToneLight)]'} m-[6px_9px] font-xl`}>
                  Runtime
                </p>

                <p
                  className={`absolute ${
                    results.type === "manga" || results.type === "serie"
                      ? "text-lg"
                      : "text-3xl"
                  } left-[4%] ${
                    results.type === "manga" || results.type === "serie"
                      ? "bottom-[5%]"
                      : "bottom-[10%]"
                  }`}
                >
                  {results.type === "anime" ? (
                    `Episodes: ${results.totalEpisode}`
                  ) : results.type === "movie" ? (
                    results.runtime
                  ) : results.type === "manga" ? (
                    <>
                      Volumes: {results.volumes}
                      <br />
                      Chapters: {results.chapters}
                    </>
                  ) : results.type === "serie" ? (
                    <>
                      Seasons: {results.totalSeason}
                      <br />
                      Episodes: {results.totalEpisode}
                    </>
                  ) : results.type === "book" ? (
                    `Pages: ${results.pages}`
                  ) : (
                    ""
                  )}
                </p>
              </div>

              <div className="relative bg-[#3737376e] w-[70%] h-[80%] rounded-[20px]">
                <p className={`${theme === 'dark' ? 'text-[var(--middleTone)]' : theme === 'light' ? 'text-[var(--middleToneLight)]' : 'text-[var(--middleToneLight)]'} m-[6px_9px] font-xl`}>
                  Rating
                </p>

                <p
                  className={`absolute text-3xl left-[4%] bottom-[10%] ${
                    results.rating && results.rating >= 7.5
                      ? "text-[var(--great)]"
                      : results.rating && results.rating >= 5
                        ? "text-[var(--medium)]"
                        : "text-[var(--bad)]"
                  }`}
                >
                  {results.rating ? results.rating : "No score :/"}
                </p>
              </div>

              <div className="relative bg-[#3737376e] w-[70%] h-[80%] rounded-[20px]">
                <p className={`${theme === 'dark' ? 'text-[var(--middleTone)]' : theme === 'light' ? 'text-[var(--middleToneLight)]' : 'text-[var(--middleToneLight)]'} m-[6px_9px] font-xl`}>
                  Genres
                </p>

                <p className="absolute text-lg left-[4%] top-[30%]">
                  {results.genres && results.genres.join(", ")}
                </p>
              </div>

              <div className="relative bg-[#3737376e] w-[70%] h-[80%] rounded-[20px]">
                <p className={`${theme === 'dark' ? 'text-[var(--middleTone)]' : theme === 'light' ? 'text-[var(--middleToneLight)]' : 'text-[var(--middleToneLight)]'} m-[6px_9px] font-xl`}>
                  Release date
                </p>

                <p className="absolute text-lg left-[4%] top-[30%]">
                  {results.date && results.date.replaceAll("-", "/")}
                </p>
              </div>

              <div
                className={`bg-[#141414]/75 w-[90%] h-full col-[1/3] rounded-[20px] z-1 absolute row-4 transition-[1s] backdrop-blur-sm ${
                  spoiler ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="w-full h-full relative">
                  <button
                    type="button"
                    className="absolute top-[50%] left-[50%] translate-[-50%] w-full h-full text-xl hover:cursor-pointer"
                    onClick={() => setSpoiler(false)}
                  >
                    Contain spoilers! Click to open
                  </button>
                </div>
              </div>

              <div className="relative bg-[#3737376e] w-[90%] h-full col-[1/3] rounded-[20px]">
                <p className={`${theme === 'dark' ? 'text-[var(--middleTone)]' : theme === 'light' ? 'text-[var(--middleToneLight)]' : 'text-[var(--middleToneLight)]'} m-[6px_9px] font-xl`}>
                  Review
                </p>

                <p className="absolute text-md left-[2%] top-[30%] w-[95%] text-justify">
                  {results.review ? results.review.content : "No review :‹"}
                </p>

                <p className="absolute text-md bottom-[2%] right-[5%]">
                  <span
                    className={`${
                      results.review && results.review.rating >= 7.5
                        ? "text-[var(--great)]"
                        : results.review && results.review.rating >= 5
                          ? "text-[var(--medium)]"
                          : "text-[var(--bad)]"
                    }`}
                  >
                    {results.review && results.review.rating?.toFixed(1)}
                  </span>{" "}
                  - {results.review && results.review.author}
                </p>
              </div>
            </div>
          )}

          <p
            className={`${
              openField ? "inline" : "hidden"
            } absolute bottom-[3%] left-[3%] ${theme === "dark" ? "drop-shadow-[var(--dropShadow)]" : theme === "light" ? "drop-shadow-[var(--dropShadowLigth)]" : "drop-shadow-[var(--dropShadowLight)]"} drop-shadow-[0px_0px_5px] select-none`}
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
          className={`bg-[var(--middleTone)]/50 backdrop-blur-md border border-white/20 shadow-lg ${theme === "dark" ? "text-[var(--text)]" : theme === "light" ? "text-[var(--textLight)]" : "text-[var(--textLight)]"} w-[50px] h-[50px] rounded-full absolute right-[15%] hover:cursor-pointer ${
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
