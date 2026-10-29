"use client";

import type { MediaResult } from "@/types/media";
import Image from "next/image";
import NSFWButton from "../NSFW Button";
import Link from "next/link";
import AvatarReview from "../ui/Avatar";
import { Heart } from "lucide-react";

export default function MobileMainDetails({
  theme,
  results,
  openField,
  NSFW,
  setNSFW,
  random,
  favorites,
  toggleFavorite,
  setMedia,
  setCurrent,
  setOpenField,
}: {
  theme: string;
  results: MediaResult | null;
  openField: boolean;
  NSFW: boolean;
  setNSFW: any;
  random: any;
  favorites: MediaResult[];
  toggleFavorite: (media: MediaResult) => void;
  setMedia: any;
  setCurrent: any;
  setOpenField: any;
}) {
  async function handleSubmit(input: string, type: string) {
    let filters: any = {};
    filters[type] = true;

    const response = await fetch("/api/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: input,
        filters: filters,
        type: "detailed",
      }),
    });

    const data = await response.json();

    setMedia(data);
    setCurrent(1);

    setOpenField(true);
  }

  return (
    <div
      className={`${theme === "dark" ? "bg-[var(--background)]" : theme === "light" ? "bg-[var(--backgroundLight)]" : theme === "glass" ? "bg-[var(--backgroundGlass)] backdrop-blur-md" : "bg-[var(--backgroundTransparent)] backdrop-blur-md"} ${theme === "dark" ? "text-[var(--text)]" : theme === "light" ? "text-[var(--textLight)]" : "text-[var(--textLight)]"} m-[0_auto] h-[98%] mb-0 rounded-[5px] transition-[2s] ${openField ? "w-[95%]" : "w-[0%]"}
      max-[1601px]:h-full max-[1601px]:mb-5`}
    >
      {results && (
        <div className="flex flex-col w-full h-full items-start min-h-0">
          {/*----------------------------------------------------------------------------------------------------------------------------------*/}
          <div className="flex flex-row w-full flex-1 min-h-0 mb-0">
            <Link
              href={results.link}
              target="_blank"
              className="ml-5 mt-5 w-fit block focus:outline-none select-none min-w-[187px] max-h-[265px] max-w-[187px]"
            >
              <Image
                src={results.cover!}
                width={300}
                height={550}
                alt={results.name}
                className="rounded-[5px] h-auto w-auto min-w-[187px] max-h-[265px] max-w-[187px] select-none"
              ></Image>
            </Link>

            {/*----------------------------------------------------------------------------------------------------------------------------------*/}

            <div className="w-full pr-5 ml-3 flex flex-col flex-1 min-h-0">
              <p className="mt-5 text-xl text-base">{results.name}</p>
              <p
                className={`${theme === "dark" ? "text-[var(--middleTone)]" : "text-[var(--middleToneLight)]"} text-sm`}
              >
                {results.subname}
              </p>

              <div className="mt-1 flex flex-col flex-1 min-h-0">
                <p
                  className={`text-justify h-[70%] ${theme === "dark" ? "text-[var(--middleTone)]" : "text-[var(--middleToneLight)]"} overflow-y-auto text-sm`}
                >
                  {results.description}
                </p>

                <div
                className={`flex flex-1 min-h-0 w-full items-center gap-8 mt-2
              ${results.type === "anime" || results.type === "manga" ? "grid-rows-2" : "grid-rows-1 items-start"}`}
              >
                <div className={`flex items-end gap-2`}>
                  <button
                    className="size-7 rounded-full"
                    onClick={() => results && toggleFavorite(results)}
                    aria-label={
                      results &&
                      favorites.some(
                        (favorite) =>
                          favorite.type === results.type &&
                          favorite.name === results.name &&
                          favorite.link === results.link,
                      )
                        ? "Remover dos favoritos"
                        : "Adicionar aos favoritos"
                    }
                  >
                    <Heart
                      className={
                        results &&
                        favorites.some(
                          (favorite) =>
                            favorite.type === results.type &&
                            favorite.name === results.name &&
                            favorite.link === results.link,
                        )
                          ? "fill-red-500 text-red-500"
                          : "text-current"
                      }
                    />
                  </button>
                  <p className="">
                    {results &&
                      results.type.charAt(0).toUpperCase() +
                        results.type.slice(1)}
                  </p>
                </div>
                {/*----------------------------------------------------------------------------------------------------------------------------------*/}

                {results &&
                  (results.type === "anime" || results.type === "manga") && (
                    <div className="flex items-center justify-center gap-2">
                      <button
                        className={`${theme === "dark" ? "bg-[var(--middleDownTone)]" : "bg-[var(--middleUpperTone)]"} ${theme === "dark" ? "text-[var(--text)]" : theme === "light" ? "text-[var(--textLight)]" : "text-[var(--textLight)]"} focus:outline-none ${theme === "dark" ? "hover:bg-[var(--backgroundHover)]" : theme === "light" ? "hover:bg-[var(--backgroundLightHover)]" : "hover:bg-[var(--backgroundGlassHover)]"} hover:outline-1 hover:cursor-pointer p-3 rounded-[5px]
                      max-[1281px]:p-2`}
                        onClick={() => random()}
                      >
                        Random {results.type}
                      </button>
                      <NSFWButton theme={theme} NSFW={NSFW} setNSFW={setNSFW} />
                    </div>
                  )}
              </div>
              </div>
            </div>
          </div>

          <div className="w-full">
            <div
              className={`flex-1 grid grid-cols-4 grid-rows-2 items-center justify-items-center gap-1 mt-1 pl-5 pr-5`}
            >
              {/*----------------------------------------------------------------------------------------------------------------------------------*/}
              <div
                className={`${theme === "dark" ? "bg-[var(--middleDownTone)]" : "bg-[var(--middleUpperTone)]"} rounded-[10px] row-1 col-1 h-[80%] w-[95%] relative min-h-[75px]`}
              >
                <p
                  className={`${theme === "dark" ? "text-[var(--middleTone)]" : "text-[var(--middleToneLight)]"} text-lg ml-2 mt-1 text-sm`}
                >
                  {results.type === "game" ? "Game type" : "Runtime"}
                </p>
                <p
                  className={`${results.type === "anime" || results.type === "movie" ? "text-lg" : "text-base"} absolute bottom-0 mb-1 ml-2
                        `}
                >
                  {results.type === "anime" ? (
                    results.totalEpisode ? (
                      results.totalEpisode !== "Unknown" ? (
                        `Episodes: ${results.totalEpisode}`
                      ) : (
                        (results.status ?? 'No data (¬_¬")')
                      )
                    ) : (
                      'No data (¬_¬")'
                    )
                  ) : results.type === "manga" ? (
                    results.volumes === "Unknow" &&
                    results.chapters === "Unknow" ? (
                      results.publishing ? (
                        results.status
                      ) : (
                        "No Data ٩(ˋᗣˊ*)و"
                      )
                    ) : (
                      <>
                        Volumes: {results.volumes} <br /> Chapters:{" "}
                        {results.chapters}
                      </>
                    )
                  ) : results.type === "game" ? (
                    results.game_type
                  ) : results.type === "serie" ? (
                    <>
                      Seasons: {results.totalSeason} <br /> Episodes:{" "}
                      {results.totalEpisode}
                    </>
                  ) : (
                    `${results.runtime}`
                  )}
                </p>
              </div>
              {/*----------------------------------------------------------------------------------------------------------------------------------*/}
              <div
                className={`${theme === "dark" ? "bg-[var(--middleDownTone)]" : "bg-[var(--middleUpperTone)]"} rounded-[10px] row-1 col-2 h-[80%] w-[95%] relative min-h-[75px]`}
              >
                <p
                  className={`${theme === "dark" ? "text-[var(--middleTone)]" : "text-[var(--middleToneLight)]"} ml-2 mt-1 text-sm`}
                >
                  Rating
                </p>
                <p
                  className={`absolute bottom-0 mb-1 ml-2 ${results.rating && (results.rating > 7.5 ? (theme === "light" ? "text-[var(--greatLight)]" : "text-[var(--great)]") : results.rating >= 5 ? (theme === "light" ? "text-[var(--mediumLight)]" : "text-[var(--medium)]") : theme === "light" ? "text-[var(--badLight)]" : "text-[var(--bad)]")}
                        ${results.type === "game" && "text-lg"}
                        text-xl`}
                >
                  {(results.rating && results.rating.toFixed(2)) ||
                    "No data (  •̀⤙•́  )"}
                  {(results.rating && results.votes) && innerWidth >= 768 && (
                    <span
                      className={`text-[11px] ${theme === "dark" ? "text-[var(--middleTone)]" : "text-[var(--middleToneLight)]"}
                            `}
                    >
                      {" "}
                      {String(results.votes).replaceAll(",", ".")} votes
                    </span>
                  )}
                </p>
              </div>
              {/*----------------------------------------------------------------------------------------------------------------------------------*/}
              <div
                className={`${theme === "dark" ? "bg-[var(--middleDownTone)]" : "bg-[var(--middleUpperTone)]"} rounded-[10px] row-1 col-3 h-[80%] w-[95%] relative min-h-[75px] overflow-y-auto overflow-x-hidden scrollbar-thin ${theme === "dark" ? "scrollbar-track-[var(--middleDownTone)]" : "scrollbar-track-[var(--middleUpperTone)]"} ${theme === "dark" ? "scrollbar-thumb-[var(--middleTone)]" : "scrollbar-thumb-[var(--middleToneLight)]"}`}
              >
                <p
                  className={`${theme === "dark" ? "text-[var(--middleTone)]" : "text-[var(--middleToneLight)]"} ml-2 mt-1 text-sm
                        `}
                >
                  {results.type === "anime" || results.type === "manga"
                    ? results.genres && results.genres.length < 1
                      ? results.demographics && results.demographics.length > 0
                        ? "Demographics"
                        : "Genres"
                      : "Genres"
                    : "Genres"}
                </p>
                <p className="absolute mb-2 ml-2 text-sm">
                  {results.type === "anime" || results.type === "manga"
                    ? results.genres && results.genres.length >= 1
                      ? `${results.genres?.join(", ")}`
                      : results.demographics && results.demographics.length > 0
                        ? `${results.demographics?.join(", ")}`
                        : "No data 𐔌՞.‸.՞𐦯"
                    : `${results.genres?.join(", ")}`}
                </p>
              </div>
              {/*----------------------------------------------------------------------------------------------------------------------------------*/}
              <div
                className={`${theme === "dark" ? "bg-[var(--middleDownTone)]" : "bg-[var(--middleUpperTone)]"} rounded-[10px] row-1 col-4 h-[80%] w-[95%] relative min-h-[75px]`}
              >
                <p
                  className={`${theme === "dark" ? "text-[var(--middleTone)]" : "text-[var(--middleToneLight)]"} ml-2 mt-1 text-sm`}
                >
                  Release Date
                </p>
                <p className="absolute mb-2 ml-2 text-base">
                  {results.date
                    ? results.date.replaceAll("-", "/")
                    : "No data ( . ‸ .)"}
                </p>
              </div>
              {/*----------------------------------------------------------------------------------------------------------------------------------*/}
              <div
                className={`${theme === "dark" ? "bg-[var(--middleDownTone)]" : "bg-[var(--middleUpperTone)]"} rounded-[10px] row-2 col-1 h-[80%] w-[95%] relative min-h-[75px] overflow-y-auto overflow-x-hidden scrollbar-thin ${theme === "dark" ? "scrollbar-track-[var(--middleDownTone)]" : "scrollbar-track-[var(--middleUpperTone)]"} ${theme === "dark" ? "scrollbar-thumb-[var(--middleTone)]" : "scrollbar-thumb-[var(--middleToneLight)]"}`}
              >
                <p
                  className={`${theme === "dark" ? "text-[var(--middleTone)]" : "text-[var(--middleToneLight)]"} ml-2 mt-1 text-sm
                        ${(results.type === "serie" || results.type === "movie") && "text-xs"}`}
                >
                  {results.type === "anime"
                    ? "Source"
                    : results.type === "manga"
                      ? "Type"
                      : results.type === "game"
                        ? "Game modes"
                        : results.type === "serie"
                          ? "Episode runtime"
                          : results.type === "movie"
                            ? "Budget/Revenue"
                            : ""}
                </p>
                <p
                  className={`text-lg absolute mb-2 ml-2
                      ${results.type === "movie" && "text-[9px]"} text-base`}
                >
                  {results.type === "anime"
                    ? results.source || "No data (˶˃𐃷˂˶)"
                    : results.type === "manga"
                      ? results.typeData || "No data (˶˃𐃷˂˶)"
                      : results.type === "game"
                        ? (results.game_modes &&
                            results.game_modes.length >= 1 &&
                            results.game_modes.join(", ")) ||
                          "No data (˶˃𐃷˂˶)"
                        : results.type === "serie"
                          ? results.episode_runtime || "No data (˶˃𐃷˂˶)"
                          : results.type === "movie"
                            ? results.budget &&
                              results.revenue && (
                                <>
                                  Budget: {results.budget}
                                  <br />
                                  Revenue: {results.revenue}
                                </>
                              )
                            : "No data (˶˃𐃷˂˶)"}
                </p>
              </div>
              {/*----------------------------------------------------------------------------------------------------------------------------------*/}
              <div
                className={`${theme === "dark" ? "bg-[var(--middleDownTone)]" : "bg-[var(--middleUpperTone)]"} rounded-[10px] row-2 col-2 h-[80%] w-[95%] relative min-h-[75px]
                      overflow-y-auto overflow-x-hidden scrollbar-thin ${theme === "dark" ? "scrollbar-track-[var(--middleDownTone)]" : "scrollbar-track-[var(--middleUpperTone)]"} ${theme === "dark" ? "scrollbar-thumb-[var(--middleTone)]" : "scrollbar-thumb-[var(--middleToneLight)]"}`}
              >
                <p
                  className={`${theme === "dark" ? "text-[var(--middleTone)]" : "text-[var(--middleToneLight)]"} ml-2 mt-1 text-sm`}
                >
                  {results.type === "anime"
                    ? "Duration"
                    : results.type === "manga"
                      ? "Status"
                      : results.type === "game"
                        ? "Platforms"
                        : results.type === "serie" || results.type === "movie"
                          ? "Keywords"
                          : ""}
                </p>
                <p
                  className={`text-lg absolute mb-2 ml-2
                        ${(results.type === "movie" || results.type === "serie") && "text-[11px]"} text-base`}
                >
                  {results.type === "anime"
                    ? results.duration || 'No data "( – ⌓ – )'
                    : results.type === "manga"
                      ? results.status || 'No data "( – ⌓ – )'
                      : results.type === "game"
                        ? (results.platforms &&
                            results.platforms.length >= 1 &&
                            results.platforms.join(", ")) ||
                          'No data "( – ⌓ – )'
                        : results.type === "serie" || results.type === "movie"
                          ? (results.keywords &&
                              results.keywords.length >= 1 &&
                              results.keywords.join(", ")) ||
                            'No data "( – ⌓ – )'
                          : ""}
                </p>
              </div>
              {/*----------------------------------------------------------------------------------------------------------------------------------*/}
              <div
                className={`${theme === "dark" ? "bg-[var(--middleDownTone)]" : "bg-[var(--middleUpperTone)]"} rounded-[10px] row-2 col-3 h-[80%] w-[95%] relative min-h-[75px] overflow-y-auto overflow-x-hidden scrollbar-thin ${theme === "dark" ? "scrollbar-track-[var(--middleDownTone)]" : "scrollbar-track-[var(--middleUpperTone)]"} ${theme === "dark" ? "scrollbar-thumb-[var(--middleTone)]" : "scrollbar-thumb-[var(--middleToneLight)]"}`}
              >
                <p
                  className={`${theme === "dark" ? "text-[var(--middleTone)]" : "text-[var(--middleToneLight)]"} ml-2 mt-1 text-sm`}
                >
                  {results.type === "anime"
                    ? "Age rating"
                    : results.type === "manga"
                      ? "Authors"
                      : results.type === "game"
                        ? "Themes"
                        : results.type === "serie"
                          ? "Similar series"
                          : results.type === "movie"
                            ? "Similar movies"
                            : ""}
                </p>
                <p
                  className={`text-lg absolute mb-2 ml-2
                      ${(results.type === "movie" || results.type === "serie") && "text-[11px]"} text-sm`}
                >
                  {results.type === "anime"
                    ? results.age_rating || 'No data ( ._. )""'
                    : results.type === "manga"
                      ? (results.authors &&
                          results.authors.length >= 1 &&
                          results.authors.map((a) => `${a.name}, `)) ||
                        'No data ( ._. )""'
                      : results.type === "game"
                        ? (results.themes &&
                            results.themes.length >= 1 &&
                            results.themes.join(", ")) ||
                          'No data ( ._. )""'
                        : results.type === "serie" || results.type === "movie"
                          ? (results.similar &&
                              results.similar.length >= 1 &&
                              results.similar.map((s) => {
                                return (
                                  <span key={s}>
                                    <Link
                                      key={s}
                                      href=""
                                      className="hover:underline focus:outline-none"
                                      onClick={() =>
                                        handleSubmit(s, results.type)
                                      }
                                    >
                                      {s}
                                    </Link>
                                    ,{" "}
                                  </span>
                                );
                              })) ||
                            'No data ( ._. )""'
                          : ""}
                </p>
              </div>
              {/*----------------------------------------------------------------------------------------------------------------------------------*/}
              <div
                className={`${theme === "dark" ? "bg-[var(--middleDownTone)]" : "bg-[var(--middleUpperTone)]"} rounded-[10px] row-2 col-4 h-[80%] w-[95%] relative min-h-[75px] overflow-y-auto overflow-x-hidden scrollbar-thin ${theme === "dark" ? "scrollbar-track-[var(--middleDownTone)]" : "scrollbar-track-[var(--middleUpperTone)]"} ${theme === "dark" ? "scrollbar-thumb-[var(--middleTone)]" : "scrollbar-thumb-[var(--middleToneLight)]"}`}
              >
                <p
                  className={`${theme === "dark" ? "text-[var(--middleTone)]" : "text-[var(--middleToneLight)]"} ml-2 mt-1 text-[10px]`}
                >
                  {results.type === "anime"
                    ? "Anime recommendations"
                    : results.type === "manga"
                      ? "Manga recommendations"
                      : results.type === "game"
                        ? "Languages"
                        : results.type === "serie"
                          ? "Serie recommendations"
                          : results.type === "movie"
                            ? "Movie recommendations"
                            : ""}
                </p>
                <p className="absolute mb-2 ml-2 text-[11px]">
                  {results.type === "anime" || results.type === "manga"
                    ? (results.recoms &&
                        results.recoms.length >= 1 &&
                        results.recoms.map((r) => {
                          return (
                            <span key={r}>
                              <Link
                                key={r}
                                href=""
                                className="hover:underline focus:outline-none"
                                onClick={() => handleSubmit(r, results.type)}
                              >
                                {r}
                              </Link>
                              ,{" "}
                            </span>
                          );
                        })) ||
                      "No data <( ⸝⸝•̀ - •́⸝⸝)>"
                    : results.type === "game"
                      ? (results.language &&
                          results.language.languages &&
                          results.language.languages.length >= 1 &&
                          results.language.languages.join(", ")) ||
                        "No data <( ⸝⸝•̀ - •́⸝⸝)>"
                      : results.type === "serie" || results.type === "movie"
                        ? (results.recommendations &&
                            results.recommendations.length >= 1 &&
                            results.recommendations.map((r) => {
                              return (
                                <span key={r}>
                                  <Link
                                    key={r}
                                    href=""
                                    className="hover:underline focus:outline-none"
                                    onClick={() => handleSubmit(r, results.type)}
                                  >
                                    {r}
                                  </Link>
                                  ,{" "}
                                </span>
                              );
                            })) ||
                          "No data <( ⸝⸝•̀ - •́⸝⸝)>"
                        : ""}
                </p>
              </div>
            </div>
          </div>

          {/*----------------------------------------------------------------------------------------------------------------------------------*/}
          <div className="flex w-full flex-1 items-center">
            {/*----------------------------------------------------------------------------------------------------------------------------------*/}

            <div
              key="review"
              className="w-full h-full flex items-center justify-center"
            >
              <div
                className={`${theme === "dark" ? "bg-[var(--middleDownTone)]" : "bg-[var(--middleUpperTone)]"} ${theme === "dark" ? "text-[var(--text)]" : theme === "light" ? "text-[var(--textLight)]" : "text-[var(--textLight)]"} w-full h-[90%] m-5 rounded-[5px] relative min-h-[75px]`}
              >
                <p
                  className={`${theme === "dark" ? "text-[var(--middleTone)]" : "text-[var(--middleToneLight)]"} text-lg ml-2 mt-1`}
                >
                  Review
                </p>
                {results.review && Object.keys(results.review).length > 0 ? (
                  <>
                    <div className="absolute w-full h-full inset-0">
                      <Link
                        href={results.review.link ?? ""}
                        className="absolute w-full h-full inset-0 z-10 focus:outline-none"
                        target="_blank"
                      ></Link>
                    </div>

                    {/*----------------------------------------------------------------------------------------------------------------------------------*/}
                    <p
                      className="text-[12px] absolute mb-2 ml-2 pr-3 text-justify"
                    >
                      {results.review.content
                        ? results.review.content
                        : "No data :‹"}
                    </p>

                    {/*----------------------------------------------------------------------------------------------------------------------------------*/}
                    <div
                      className="absolute bottom-0 right-0 mr-7 flex gap-2 w-fit mb-1
                    max-[1281px]:scale-80 max-[1281px]:mr-0 max-[1281px]:mb-0"
                    >
                      <p>
                        {results.review.rating && (
                          <span
                            className={`${results.review.rating && (results.review.rating > 7.5 ? (theme === "light" ? "text-[var(--greatLight)]" : "text-[var(--great)]") : results.review.rating >= 5 ? (theme === "light" ? "text-[var(--mediumLight)]" : "text-[var(--medium)]") : theme === "light" ? "text-[var(--badLight)]" : "text-[var(--bad)]")}`}
                          >
                            {results.review.rating}
                          </span>
                        )}{" "}
                        {results.review.opinion && (
                          <>({results.review.opinion})</>
                        )}{" "}
                        - {results.review.author}
                      </p>
                      <AvatarReview
                        path={results.review.avatar ?? ""}
                        name={results.review.author ?? ""}
                      />
                    </div>
                  </>
                ) : (
                  <p className="ml-2">No data :‹</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
