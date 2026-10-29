"use client";

import type { MediaResult } from "@/types/media";
import Image from "next/image";
import NSFWButton from "../NSFW Button";
import Link from "next/link";
import AvatarReview from "../ui/Avatar";
import { Heart } from "lucide-react";

export default function DesktopMainDetails({
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
      className={`${theme === "dark" ? "bg-[var(--background)]" : theme === "light" ? "bg-[var(--backgroundLight)]" : theme === "glass" ? "bg-[var(--backgroundGlass)] backdrop-blur-md" : "bg-[var(--backgroundTransparent)] backdrop-blur-md"} ${theme === "dark" ? "text-[var(--text)]" : theme === "light" ? "text-[var(--textLight)]" : "text-[var(--textLight)]"} m-[0_auto] h-[98%] mb-0 rounded-[5px] transition-[2s] ${openField ? "w-[85%]" : "w-[0%]"}
      max-[1601px]:h-full max-[1601px]:mb-5`}
    >
      {results && (
        <div className="flex flex-col w-full h-full items-start min-h-0">
          {/*----------------------------------------------------------------------------------------------------------------------------------*/}
          <div className="flex flex-row w-full flex-1
          max-[1601]:min-h-[420px]
          max-[1367px]:min-h-0 max-[1367px]:mb-0
          ">
            <Link
              href={results.link}
              target="_blank"
              className="ml-5 mt-5 w-fit block max-h-[420px] min-w-[300px] max-w-[300px] focus:outline-none select-none
              max-[1367px]:max-h-[315px] max-[1367px]:min-w-[225px] max-[1367px]:max-w-[225px]
              max-[1281px]:max-h-[265px] max-[1281px]:min-w-[187px] max-[1281px]:max-w-[187px]"
            >
              <Image
                src={results.cover!}
                width={300}
                height={550}
                alt={results.name}
                className="rounded-[5px] h-auto w-auto min-w-[300px] max-h-[420px] max-w-[300px] select-none
                max-[1537px]:max-h-[400px]
                max-[1367px]:max-h-[315px] max-[1367px]:min-w-[225px] max-[1367px]:max-w-[225px]
                max-[1281px]:max-h-[265px] max-[1281px]:min-w-[187px] max-[1281px]:max-w-[187px]"
              ></Image>
            </Link>

            {/*----------------------------------------------------------------------------------------------------------------------------------*/}

            <div className="w-full pr-5 ml-3 flex flex-col flex-1 min-h-0">
              <p
                className="mt-5 text-xl
              max-[1367px]:text-lg
              max-[1367px]:text-base"
              >
                {results.name}
              </p>
              <p
                className={`${theme === "dark" ? "text-[var(--middleTone)]" : "text-[var(--middleToneLight)]"} text-lg
                max-[1367px]:text-base
                max-[1367px]:text-sm`}
              >
                {results.subname}
              </p>

              <div className="mt-1 flex flex-col flex-1 min-h-0">
                <p
                  className={`text-lg text-justify h-[35%] ${theme === "dark" ? "text-[var(--middleTone)]" : "text-[var(--middleToneLight)]"}  overflow-y-auto
                  max-[1367px]:text-base
                  max-[1367px]:text-sm`}
                >
                  {results.description}
                </p>

                <div
                  className={`flex-1 grid grid-cols-4 grid-rows-2 items-center justify-items-center gap-1 mt-2
                  max-[1537px]:mt-3
                  max-[1367px]:mt-1`}
                >
                  {/*----------------------------------------------------------------------------------------------------------------------------------*/}
                  <div
                    className={`${theme === "dark" ? "bg-[var(--middleDownTone)]" : "bg-[var(--middleUpperTone)]"} rounded-[10px] row-1 col-1 h-[80%] w-[95%] relative min-h-[100px] 
                    max-[1537px]:min-h-[95px]
                    max-[1367px]:min-h-[75px]
                    max-[901px]:min-h-[65px]`}
                  >
                    <p
                      className={`${theme === "dark" ? "text-[var(--middleTone)]" : "text-[var(--middleToneLight)]"} text-lg ml-2 mt-1
                      max-[1367px]:text-base
                      max-[1025px]:text-sm`}
                    >
                      {results.type === "game" ? "Game type" : "Runtime"}
                    </p>
                    <p
                      className={`${results.type === "anime" || results.type === "movie" ? "text-3xl max-[1601px]:text-2xl max-[1441px]:text-xl max-[1367px]:text-lg max-[1025px]:text-base max-[901px]:text-xs" : "text-xl max-[1441px]:text-lg max-[1367px]:text-base max-[1025px]:text-sm"} absolute bottom-0 mb-2 ml-2
                      max-[1367px]:mb-0
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
                    className={`${theme === "dark" ? "bg-[var(--middleDownTone)]" : "bg-[var(--middleUpperTone)]"} rounded-[10px] row-1 col-2 h-[80%] w-[95%] relative min-h-[100px] 
                    max-[1537px]:min-h-[95px]
                    max-[1367px]:min-h-[75px]
                    max-[901px]:min-h-[65px]`}
                  >
                    <p
                      className={`${theme === "dark" ? "text-[var(--middleTone)]" : "text-[var(--middleToneLight)]"} text-lg ml-2 mt-1
                      max-[1367px]:text-base
                      max-[1025px]:text-sm`}
                    >
                      Rating
                    </p>
                    <p
                      className={`text-3xl absolute bottom-0 mb-2 ml-2 ${results.rating && (results.rating > 7.5 ? (theme === "light" ? "text-[var(--greatLight)]" : "text-[var(--great)]") : results.rating >= 5 ? (theme === "light" ? "text-[var(--mediumLight)]" : "text-[var(--medium)]") : theme === "light" ? "text-[var(--badLight)]" : "text-[var(--bad)]")}
                    ${results.type === "game" && "max-[1537px]:text-2xl max-[1025px]:text-lg max-[901px]:text-sm"}
                    max-[1441px]:text-2xl
                    max-[1367px]:text-xl
                    max-[1025px]:text-lg
                    max-[1367px]:mb-0
                    max-[901px]:text-base`}
                    >
                      {(results.rating && results.rating.toFixed(2)) ||
                        "No data (  •̀⤙•́  )"}
                      {results.rating && results.votes && (
                        <span
                          className={`text-base ${theme === "dark" ? "text-[var(--middleTone)]" : "text-[var(--middleToneLight)]"}
                          max-[1025px]:text-xs max-[901px]:text-[9px]`}
                        >
                          {" "}
                          {String(results.votes).replaceAll(",", ".")} votes
                        </span>
                      )}
                    </p>
                  </div>

                  {/*----------------------------------------------------------------------------------------------------------------------------------*/}
                  <div
                    className={`${theme === "dark" ? "bg-[var(--middleDownTone)]" : "bg-[var(--middleUpperTone)]"} rounded-[10px] row-1 col-3 h-[80%] w-[95%] relative min-h-[100px] 
                    max-[1537px]:min-h-[95px]
                    max-[1367px]:min-h-[75px]
                    max-[901px]:min-h-[65px] overflow-y-auto overflow-x-hidden scrollbar-thin ${theme === "dark" ? "scrollbar-track-[var(--middleDownTone)]" : "scrollbar-track-[var(--middleUpperTone)]"} ${theme === "dark" ? "scrollbar-thumb-[var(--middleTone)]" : "scrollbar-thumb-[var(--middleToneLight)]"}`}
                  >
                    <p
                      className={`${theme === "dark" ? "text-[var(--middleTone)]" : "text-[var(--middleToneLight)]"} text-lg ml-2 mt-1
                      max-[1367px]:text-base
                      max-[1025px]:text-sm
                      `}
                    >
                      {results.type === "anime" || results.type === "manga"
                        ? results.genres && results.genres.length < 1
                          ? results.demographics &&
                            results.demographics.length > 0
                            ? "Demographics"
                            : "Genres"
                          : "Genres"
                        : "Genres"}
                    </p>
                    <p
                      className="text-lg absolute mb-2 ml-2
                    max-[1441px]:text-base
                    max-[1367px]:text-sm
                    max-[1025px]:text-xs
                    max-[901px]:text-[11px]"
                    >
                      {results.type === "anime" || results.type === "manga"
                        ? results.genres && results.genres.length >= 1
                          ? `${results.genres?.join(", ")}`
                          : results.demographics &&
                              results.demographics.length > 0
                            ? `${results.demographics?.join(", ")}`
                            : "No data 𐔌՞.‸.՞𐦯"
                        : `${results.genres?.join(", ")}`}
                    </p>
                  </div>

                  {/*----------------------------------------------------------------------------------------------------------------------------------*/}
                  <div
                    className={`${theme === "dark" ? "bg-[var(--middleDownTone)]" : "bg-[var(--middleUpperTone)]"} rounded-[10px] row-1 col-4 h-[80%] w-[95%] relative min-h-[100px] 
                    max-[1537px]:min-h-[95px]
                    max-[1367px]:min-h-[75px]
                    max-[901px]:min-h-[65px]`}
                  >
                    <p
                      className={`${theme === "dark" ? "text-[var(--middleTone)]" : "text-[var(--middleToneLight)]"} text-lg ml-2 mt-1
                      max-[1367px]:text-base
                      max-[1025px]:text-sm`}
                    >
                      Release Date
                    </p>
                    <p className="text-lg absolute mb-2 ml-2
                    max-[1367px]:text-base
                    max-[901px]:text-sm">
                      {results.date
                        ? results.date.replaceAll("-", "/")
                        : "No data ( . ‸ .)"}
                    </p>
                  </div>

                  {/*----------------------------------------------------------------------------------------------------------------------------------*/}
                  <div
                    className={`${theme === "dark" ? "bg-[var(--middleDownTone)]" : "bg-[var(--middleUpperTone)]"} rounded-[10px] row-2 col-1 h-[80%] w-[95%] relative min-h-[100px] 
                    max-[1537px]:min-h-[95px]
                    max-[1367px]:min-h-[75px]
                    max-[901px]:min-h-[65px] overflow-y-auto overflow-x-hidden scrollbar-thin ${theme === "dark" ? "scrollbar-track-[var(--middleDownTone)]" : "scrollbar-track-[var(--middleUpperTone)]"} ${theme === "dark" ? "scrollbar-thumb-[var(--middleTone)]" : "scrollbar-thumb-[var(--middleToneLight)]"}`}
                  >
                    <p
                      className={`${theme === "dark" ? "text-[var(--middleTone)]" : "text-[var(--middleToneLight)]"} text-lg ml-2 mt-1
                      max-[1367px]:text-base
                      max-[1025px]:text-sm
                      ${(results.type === 'serie' || results.type === 'movie') && 'max-[901px]:text-xs'}`}
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
                    ${results.type === "movie" && "max-[1537px]:text-base max-[1441px]:text-sm max-[1281px]:text-sm max-[1025px]:text-[11px] max-[901px]:text-[9px]"}
                    max-[1367px]:text-base
                    max-[1025px]:text-sm`}
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
                    className={`${theme === "dark" ? "bg-[var(--middleDownTone)]" : "bg-[var(--middleUpperTone)]"} rounded-[10px] row-2 col-2 h-[80%] w-[95%] relative min-h-[100px] 
                    max-[1537px]:min-h-[95px]
                    max-[1367px]:min-h-[75px]
                    max-[901px]:min-h-[65px]
                    overflow-y-auto overflow-x-hidden scrollbar-thin ${theme === "dark" ? "scrollbar-track-[var(--middleDownTone)]" : "scrollbar-track-[var(--middleUpperTone)]"} ${theme === "dark" ? "scrollbar-thumb-[var(--middleTone)]" : "scrollbar-thumb-[var(--middleToneLight)]"}`}
                  >
                    <p
                      className={`${theme === "dark" ? "text-[var(--middleTone)]" : "text-[var(--middleToneLight)]"} text-lg ml-2 mt-1
                      max-[1367px]:text-base
                      max-[1025px]:text-sm`}
                    >
                      {results.type === "anime"
                        ? "Duration"
                        : results.type === "manga"
                          ? "Status"
                          : results.type === "game"
                            ? "Platforms"
                            : results.type === "serie" ||
                                results.type === "movie"
                              ? "Keywords"
                              : ""}
                    </p>
                    <p
                      className={`text-lg absolute mb-2 ml-2
                      ${(results.type === "movie" || results.type === "serie") && "max-[1441px]:text-base max-[1367px]:text-sm max-[1025px]:text-xs max-[901px]:text-[11px]"}
                      max-[1367px]:text-base
                      max-[1025px]:text-sm`}
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
                            : results.type === "serie" ||
                                results.type === "movie"
                              ? (results.keywords &&
                                  results.keywords.length >= 1 &&
                                  results.keywords.join(", ")) ||
                                'No data "( – ⌓ – )'
                              : ""}
                    </p>
                  </div>

                  {/*----------------------------------------------------------------------------------------------------------------------------------*/}
                  <div
                    className={`${theme === "dark" ? "bg-[var(--middleDownTone)]" : "bg-[var(--middleUpperTone)]"} rounded-[10px] row-2 col-3 h-[80%] w-[95%] relative min-h-[100px] 
                    max-[1537px]:min-h-[95px]
                    max-[1367px]:min-h-[75px]
                    max-[901px]:min-h-[65px] overflow-y-auto overflow-x-hidden scrollbar-thin ${theme === "dark" ? "scrollbar-track-[var(--middleDownTone)]" : "scrollbar-track-[var(--middleUpperTone)]"} ${theme === "dark" ? "scrollbar-thumb-[var(--middleTone)]" : "scrollbar-thumb-[var(--middleToneLight)]"}`}
                  >
                    <p
                      className={`${theme === "dark" ? "text-[var(--middleTone)]" : "text-[var(--middleToneLight)]"} text-lg ml-2 mt-1
                      max-[1367px]:text-base
                      max-[1025px]:text-sm`}
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
                    ${(results.type === "movie" || results.type === "serie") && "max-[1441px]:text-base max-[1367px]:text-sm max-[1025px]:text-xs max-[901px]:text-[11px]"}
                    max-[1367px]:text-base
                    max-[1025px]:text-sm
                    max-[901px]:text-xs`}
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
                            : results.type === "serie" ||
                                results.type === "movie"
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
                    className={`${theme === "dark" ? "bg-[var(--middleDownTone)]" : "bg-[var(--middleUpperTone)]"} rounded-[10px] row-2 col-4 h-[80%] w-[95%] relative min-h-[100px] 
                    max-[1537px]:min-h-[95px]
                    max-[1367px]:min-h-[75px]
                    max-[901px]:min-h-[65px] overflow-y-auto overflow-x-hidden scrollbar-thin ${theme === "dark" ? "scrollbar-track-[var(--middleDownTone)]" : "scrollbar-track-[var(--middleUpperTone)]"} ${theme === "dark" ? "scrollbar-thumb-[var(--middleTone)]" : "scrollbar-thumb-[var(--middleToneLight)]"}`}
                  >
                    <p
                      className={`${theme === "dark" ? "text-[var(--middleTone)]" : "text-[var(--middleToneLight)]"} text-lg ml-2 mt-1
                      max-[1537px]:text-base
                      max-[1441px]:text-sm
                      max-[1025px]:text-[11px]
                      max-[901px]:text-[10px]`}
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
                    <p
                      className="text-lg absolute mb-2 ml-2
                    max-[1441px]:text-base
                    max-[1367px]:text-sm
                    max-[1025px]:text-xs
                    max-[901px]:text-[11px]"
                    >
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
                                    onClick={() =>
                                      handleSubmit(r, results.type)
                                    }
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
                                        onClick={() =>
                                          handleSubmit(r, results.type)
                                        }
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
            </div>
          </div>

          {/*----------------------------------------------------------------------------------------------------------------------------------*/}
          <div
            className="grid grid-cols-[320px_1fr] w-full flex-1 items-center
          max-[1367px]:grid-cols-[245px_1fr]
          max-[1281px]:grid-cols-[207px_1fr]"
          >
            <div className={`col-1 grid h-full w-full
              ${(results.type === 'anime' || results.type === 'manga') ? 'grid-rows-2' : 'grid-rows-1 items-end'}`}>
              {results &&
                (results.type === "anime" || results.type === "manga") && (
                  <div
                    className="flex items-center justify-center gap-5
                  max-[1367px]:scale-90
                  max-[1025px]:flex-col max-[1025px]:justify-start"
                  >
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

              {/*----------------------------------------------------------------------------------------------------------------------------------*/}

              <div className="flex items-end gap-5 mb-3 ml-5">
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
            </div>

            {/*----------------------------------------------------------------------------------------------------------------------------------*/}

            <div
              key="review"
              className="w-full h-full flex items-center justify-center"
            >
              <div
                className={`${theme === "dark" ? "bg-[var(--middleDownTone)]" : "bg-[var(--middleUpperTone)]"} ${theme === "dark" ? "text-[var(--text)]" : theme === "light" ? "text-[var(--textLight)]" : "text-[var(--textLight)]"} w-full h-[90%] m-5 rounded-[5px] relative min-h-[100px] 
                max-[1537px]:min-h-[95px]
                max-[1367px]:min-h-[75px]
                max-[901px]:min-h-[65px]`}
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
                      className="text-[17px] absolute mb-2 ml-2 pr-3 text-justify
                      max-[1601px]:text-base
                      max-[1537px]:text-[14px]
                      max-[1281px]:text-[13px]
                      max-[1025px]:text-[12px]
                      max-[901px]:text-[11px]"
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
