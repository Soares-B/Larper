"use client";

import type { MediaResult } from "@/types/media";
import Image from "next/image";
import NSFWButton from "../NSFW Button";
import Link from "next/link";
import AvatarReview from "../ui/Avatar";
import { Heart } from "lucide-react";

export default function DesktopMain({
  theme,
  results,
  openField,
  NSFW,
  setNSFW,
  random,
  favorites,
  toggleFavorite,
  mediaAmount,
}: {
  theme: string;
  results: MediaResult | null;
  openField: boolean;
  NSFW: boolean;
  setNSFW: any;
  random: any;
  favorites: MediaResult[];
  toggleFavorite: (media: MediaResult) => void;
  mediaAmount: boolean;
}) {
  return (
    <div
      className={`${theme === "dark" ? "bg-[var(--background)]" : theme === "light" ? "bg-[var(--backgroundLight)]" : theme === "glass" ? "bg-[var(--backgroundGlass)] backdrop-blur-md" : "bg-[var(--backgroundTransparent)] backdrop-blur-md"} ${theme === "dark" ? "text-[var(--text)]" : theme === "light" ? "text-[var(--textLight)]" : "text-[var(--textLight)]"} m-[0_auto] h-[95%]
      mb-8 rounded-[5px] transition-[2s]
      ${openField ? (mediaAmount ? "w-full" : "w-[60%]") : "w-[0%]"}
      max-[1367px]:scale-90
      max-[1281px]:scale-95 max-[1281px]:h-full max-[1281px]:mb-0
      max-[1025px]:scale-100 max-[1025px]:mt-0 
      ${mediaAmount ? '' : 'max-[1537]:w-[70%] max-[1367px]:w-[80%] max-[1025px]:mb-3'}`}
    >
      {results && (
        <>
          <div className="flex flex-col w-full h-full items-start">
            {/*----------------------------------------------------------------------------------------------------------------------------------*/}
            <div className="flex flex-row w-full">
              <Link
                href={results.link}
                target="_blank"
                className="ml-5 mt-5 w-fit block max-h-[420px] min-h-[420px] min-w-[300px] focus:outline-none
                max-[1367px]:max-h-[350px] max-[1367px]:min-h-[350px] max-[1367px]:min-w-[250px]"
              >
                <Image
                  src={results.cover!}
                  width={300}
                  height={550}
                  alt={results.name}
                  className="rounded-[5px] h-auto w-auto min-w-[300px] max-h-[420px]
                  max-[1367px]:max-h-[350px] max-[1367px]:min-w-[250px]"
                ></Image>
              </Link>

              {/*----------------------------------------------------------------------------------------------------------------------------------*/}

              <div className="w-full pr-5 ml-3 flex flex-col h-full">
                <p className="mt-5 text-xl">{results.name}</p>
                <p
                  className={`${theme === "dark" ? "text-[var(--middleTone)]" : "text-[var(--middleToneLight)]"} text-lg`}
                >
                  {results.subname}
                </p>

                <div className="mt-2 flex flex-col flex-1">
                  <p
                    className={`text-lg text-justify h-[35%] ${theme === "dark" ? "text-[var(--middleTone)]" : "text-[var(--middleToneLight)]"}
                    overflow-auto`}
                  >
                    {results.description}
                  </p>

                  <div className={`flex-1 grid ${results.type !== 'music' ? 'grid-cols-2 grid-rows-2' : 'grid-cols-2 grid-rows-1'} items-center justify-items-center gap-1 mt-1`}>
                    {/*----------------------------------------------------------------------------------------------------------------------------------*/}
                    {results.type !== 'music' ? 
                    
                    
                    <>
                    <div
                      className={`${theme === "dark" ? "bg-[var(--middleDownTone)]" : "bg-[var(--middleUpperTone)]"} rounded-[10px] row-1 col-1 h-[80%] w-[80%] relative min-h-[100px]`}
                    >
                      <p
                        className={`${theme === "dark" ? "text-[var(--middleTone)]" : "text-[var(--middleToneLight)]"} text-lg ml-2 mt-1`}
                      >
                        {results.type === "game" ? "Game type" : results.type === 'book' ? 'Pages' : "Runtime"}
                      </p>
                      <p
                        className={`${(results.type === "anime" || results.type === "movie" || results.type === 'book') ? "text-3xl max-[1601px]:text-2xl" : "text-xl"} absolute bottom-0 mb-2 ml-2
                        ${mediaAmount ? '' : 'max-[901px]:text-xl'}`}
                      >
                        {results.type === "anime" ? (
                          results.totalEpisode ? (
                            `Episodes: ${results.totalEpisode}`
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
                        ) : results.type === 'game' ? (
                          results.game_type
                        ) : results.type === 'book' ? (
                          `Pages: ${results.pages}`
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
                      className={`${theme === "dark" ? "bg-[var(--middleDownTone)]" : "bg-[var(--middleUpperTone)]"} rounded-[10px] row-1 col-2 h-[80%] w-[80%] relative min-h-[100px]`}
                    >
                      <p
                        className={`${theme === "dark" ? "text-[var(--middleTone)]" : "text-[var(--middleToneLight)]"} text-lg ml-2 mt-1`}
                      >
                        {results.type === 'book' ? results.rating ? 'Rating' : 'Authors' : 'Rating'}
                      </p>
                      <p
                        className={`${results.type === 'book' ? (results.rating ? 'text-3xl absolute bottom-0' : 'text-xl') : 'text-3xl absolute bottom-0'}  mb-2 ml-2 ${results.rating ? (results.rating > 7.5 ? (theme === "light" ? "text-[var(--greatLight)]" : "text-[var(--great)]") : results.rating >= 5 ? (theme === "light" ? "text-[var(--mediumLight)]" : "text-[var(--medium)]") : theme === "light" ? "text-[var(--badLight)]" : "text-[var(--bad)]") : ''}
                        ${mediaAmount ? 'max-[901px]:text-2xl' : (results.type === 'game' ? 'max-[1025px]:text-2xl max-[901px]:text-xl' : '')}`}
                      >
                        {results.type === 'book' ? results.rating ??  (results.authors && results.authors.length >= 1 ? results.authors.join(', ') : "No data (  •̀⤙•́  )") : results.rating ? results.rating : "No data (  •̀⤙•́  )"}
                      </p>
                    </div>

                    {/*----------------------------------------------------------------------------------------------------------------------------------*/}
                    <div
                      className={`${theme === "dark" ? "bg-[var(--middleDownTone)]" : "bg-[var(--middleUpperTone)]"} rounded-[10px] row-2 col-1 h-[80%] w-[80%] relative min-h-[100px] overflow-y-auto scrollbar-thin ${theme === "dark" ? "scrollbar-track-[var(--middleDownTone)]" : "scrollbar-track-[var(--middleUpperTone)]"} ${theme === "dark" ? "scrollbar-thumb-[var(--middleTone)]" : "scrollbar-thumb-[var(--middleToneLight)]"}`}
                    >
                      <p
                        className={`${theme === "dark" ? "text-[var(--middleTone)]" : "text-[var(--middleToneLight)]"} text-lg ml-2 mt-1 `}
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
                      <p className="text-lg absolute mb-2 ml-2">
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
                      className={`${theme === "dark" ? "bg-[var(--middleDownTone)]" : "bg-[var(--middleUpperTone)]"} rounded-[10px] row-2 col-2 h-[80%] w-[80%] relative min-h-[100px]`}
                    >
                      <p
                        className={`${theme === "dark" ? "text-[var(--middleTone)]" : "text-[var(--middleToneLight)]"} text-lg ml-2 mt-1`}
                      >
                        Release Date
                      </p>
                      <p className="text-lg absolute mb-2 ml-2">
                        {results.date
                          ? results.date.replaceAll("-", "/")
                          : "No data ( . ‸ .)"}
                      </p>
                    </div>
                    
                    
                    
                    </> : <>
                    <div
                      className={`${theme === "dark" ? "bg-[var(--middleDownTone)]" : "bg-[var(--middleUpperTone)]"} rounded-[10px] row-1 col-1 h-[80%] w-[80%] relative min-h-[50px]`}
                    >
                      <p
                        className={`${theme === "dark" ? "text-[var(--middleTone)]" : "text-[var(--middleToneLight)]"} text-lg ml-2 mt-1`}
                      >
                        Runtime
                      </p>
                      <p
                        className={`mb-2 ml-2 text-3xl`}
                      >
                        {results.time}
                      </p>
                    </div>
                    
                    <div
                      className={`${theme === "dark" ? "bg-[var(--middleDownTone)]" : "bg-[var(--middleUpperTone)]"} rounded-[10px] row-1 col-2 h-[80%] w-[80%] relative min-h-[50px]`}
                    >
                      <p
                        className={`${theme === "dark" ? "text-[var(--middleTone)]" : "text-[var(--middleToneLight)]"} text-lg ml-2 mt-1`}
                      >
                        Music Info
                      </p>
                      <p
                        className={`mb-2 ml-2 text-xl`}
                      >
                        <>
                        Album: {results.album ? results.album.name : 'No data (≖_≖ )'}
                        <br />
                        Artist: {results.artist ? results.artist.name : "No data (¬⤙¬ )"}
                        </>
                      </p>
                    </div>
                    </>}
                  </div>
                </div>
              </div>
            </div>

            {/*----------------------------------------------------------------------------------------------------------------------------------*/}
            <div className="grid grid-cols-[320px_1fr]
            max-[1367px]:grid-cols-[250px_1fr] 
            w-full flex-1 items-center">
              <div className="col-1 grid grid-rows-2 h-full w-full">
                {results &&
                  (results.type === "anime" || results.type === "manga") && (
                    <div className="flex items-center justify-center gap-5
                    max-[1367px]:scale-90">
                      <button
                        className={`${theme === "dark" ? "bg-[var(--middleDownTone)]" : "bg-[var(--middleUpperTone)]"} ${theme === "dark" ? "text-[var(--text)]" : theme === "light" ? "text-[var(--textLight)]" : "text-[var(--textLight)]"} focus:outline-none ${theme === "dark" ? "hover:bg-[var(--backgroundHover)]" : theme === "light" ? "hover:bg-[var(--backgroundLightHover)]" : "hover:bg-[var(--backgroundGlassHover)]"} hover:outline-1 p-3 rounded-[5px]`}
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
                  className={`${theme === "dark" ? "bg-[var(--middleDownTone)]" : "bg-[var(--middleUpperTone)]"} ${theme === "dark" ? "text-[var(--text)]" : theme === "light" ? "text-[var(--textLight)]" : "text-[var(--textLight)]"} w-full h-[90%] m-5 rounded-[5px] relative min-h-[100px]`}
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
                      <p className="text-base absolute mb-2 ml-2 pr-3 text-justify
                      max-[1367px]:text-sm">
                        {results.review.content
                          ? results.review.content
                          : "No data :‹"}
                      </p>

                      {/*----------------------------------------------------------------------------------------------------------------------------------*/}
                      <div className="absolute bottom-0 right-0 mr-7 flex gap-2 w-fit mb-1
                      max-[1537px]:scale-90 max-[1537px]:mr-2
                      max-[1441px]:scale-100 max-[1441px]:mr-7
                      max-[1367px]:scale-90 max-[1367px]:mr-2">
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
                          )} - {" "}
                          {results.review.author}
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
        </>
      )}
    </div>
  );
}
