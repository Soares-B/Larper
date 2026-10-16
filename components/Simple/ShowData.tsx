import type { Dispatch, SetStateAction } from "react";
import type { MediaResult as Result } from "@/types/media";

export default function ShowData({results, spoiler, setSpoiler, openField, theme}: {results: Result | null, spoiler: boolean, setSpoiler: Dispatch<SetStateAction<boolean>>, openField: boolean, theme: string}){

    return(
        <>
         {results && (
            <div
              className={`${
                openField ? "grid" : "hidden"
              } absolute justify-center w-[60%] h-[76%] top-[15%] left-[38%] grid-rows-[1.5fr_1fr_1fr_1fr] grid-cols-[minmax(0,1fr)_minmax(0,1fr)] max-[1024px]:w-[64%] max-[640px]:left-[3%] max-[640px]:top-[43%] max-[640px]:w-[94%] max-[640px]:h-[52%] max-[640px]:grid-rows-[auto_repeat(3,minmax(75px,1fr))] max-[640px]:gap-2`}
            >
              <p
                className={`${
                  theme === "dark"
                    ? "text-[var(--middleTone)]"
                    : theme === "light"
                      ? "text-[var(--middleToneLight)]"
                      : "text-[var(--textLight)]"
                } col-[1/3] text-xl text-justify`}
              >
                {results.description}
              </p>

              <div
                className={`relative ${
                  theme === "dark"
                    ? "bg-[#ffffff11]"
                    : "bg-[#00000022]"
                } w-[90%] h-[80%] min-w-0 rounded-[20px] max-[640px]:w-full max-[640px]:h-auto max-[640px]:min-h-[75px] max-[640px]:rounded-[14px]`}
              >
                <p
                  className={`${
                    theme === "dark"
                      ? "text-[var(--middleTone)]"
                      : theme === "light"
                        ? "text-[var(--middleToneLight)]"
                        : "text-[var(--textLight)]"
                  } m-[6px_9px] font-xl`}
                >
                  {results.type === 'game' ? 'Game type' : 'Runtime'}
                </p>

                <p
                  className={`absolute ${
                    results.type === "manga" ||
                    results.type === "serie"
                      ? "text-lg max-[640px]:text-sm"
                      : "text-3xl"
                  } left-[4%] ${
                    results.type === "manga" ||
                    results.type === "serie"
                      ? "bottom-[5%]"
                      : "bottom-[10%]"
                  }`}
                >
                  {results.type === "anime"
                    ? `Episodes: ${results.totalEpisode}`
                    : results.type === 'game' ? results.game_type : results.type === "movie"
                      ? results.runtime
                      : results.type === "manga"
                        ? (
                            <>
                              Volumes: {results.volumes}
                              <br />
                              Chapters: {results.chapters}
                            </>
                          )
                        : results.type === "serie"
                          ? (
                              <>
                                Seasons: {results.totalSeason}
                                <br />
                                Episodes: {results.totalEpisode}
                              </>
                            )
                          : results.type === "book"
                            ? `Pages: ${results.pages}`
                            : results.type === "music"
                              ? results.time
                              : ""}
                </p>
              </div>

              <div
                className={`relative ${
                  theme === "dark"
                    ? "bg-[#ffffff11]"
                    : "bg-[#00000022]"
                } w-[90%] h-[80%] min-w-0 rounded-[20px] max-[640px]:w-full max-[640px]:h-auto max-[640px]:min-h-[75px] max-[640px]:rounded-[14px]`}
              >
                <p
                  className={`${
                    theme === "dark"
                      ? "text-[var(--middleTone)]"
                      : theme === "light"
                        ? "text-[var(--middleToneLight)]"
                        : "text-[var(--textLight)]"
                  } m-[6px_9px] font-xl`}
                >
                  Rating
                </p>

                <p
                  className={`absolute text-3xl left-[4%] bottom-[10%] ${
                    results.rating && results.rating >= 7.5
                      ? theme === 'light' ? "text-[var(--greatLight)]" : "text-[var(--great)]"
                      : results.rating && results.rating >= 5
                        ? theme === 'light' ? "text-[var(--mediumLight)]" : "text-[var(--medium)]"
                        : theme === 'light' ? "text-[var(--badLight)]" : "text-[var(--bad)]"
                  }`}
                >
                  {results.rating
                    ? results.rating
                    : "No score :/"}
                </p>
              </div>

              <div
                className={`relative ${
                  theme === "dark"
                    ? "bg-[#ffffff11]"
                    : "bg-[#00000022]"
                } w-[90%] h-[80%] min-w-0 rounded-[20px] max-[640px]:w-full max-[640px]:h-auto max-[640px]:min-h-[75px] max-[640px]:rounded-[14px]`}
              >
                <p
                  className={`${
                    theme === "dark"
                      ? "text-[var(--middleTone)]"
                      : theme === "light"
                        ? "text-[var(--middleToneLight)]"
                        : "text-[var(--textLight)]"
                  } m-[6px_9px] font-xl`}
                >
                  {results.type === "music"
                    ? "Artist"
                    : "Genres"}
                </p>

                <p className={`absolute ${results.type !== 'music' ? results.genres && results.genres.join('').length > 38 ? 'text-md' : 'text-lg max-[640px]:text-sm' : 'text-lg max-[640px]:text-sm'} left-[4%] top-[30%]`}>
                  {results.type === "music"
                    ? results.artist?.name
                    : results.genres?.join(", ")}
                </p>
              </div>

              <div
                className={`relative ${
                  theme === "dark"
                    ? "bg-[#ffffff11]"
                    : "bg-[#00000022]"
                } w-[90%] h-[80%] min-w-0 rounded-[20px] max-[640px]:w-full max-[640px]:h-auto max-[640px]:min-h-[75px] max-[640px]:rounded-[14px]`}
              >
                <p
                  className={`${
                    theme === "dark"
                      ? "text-[var(--middleTone)]"
                      : theme === "light"
                        ? "text-[var(--middleToneLight)]"
                        : "text-[var(--textLight)]"
                  } m-[6px_9px] font-xl`}
                >
                  {results.type === "music"
                    ? "Album"
                    : "Release date"}
                </p>

                <p className="absolute text-lg max-[640px]:text-sm left-[4%] top-[30%]">
                  {results.type === "music"
                    ? results.album?.name
                    : results.date?.replaceAll("-", "/")}
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

              <div
                className={`relative ${
                  theme === "dark"
                    ? "bg-[#ffffff11]"
                    : "bg-[#00000022]"
                } w-[90%] h-full col-[1/3] rounded-[20px]`}
              >
                <p
                  className={`${
                    theme === "dark"
                      ? "text-[var(--middleTone)]"
                      : theme === "light"
                        ? "text-[var(--middleToneLight)]"
                        : "text-[var(--textLight)]"
                  } m-[6px_9px] font-xl`}
                >
                  Review
                </p>

                <p className="absolute text-md left-[2%] top-[30%] w-[95%] text-justify">
                  {results.review
                    ? results.review.content
                    : "No review :‹"}
                </p>

                <p className="absolute text-md bottom-[2%] right-[5%]">
                  <span
                    className={`${
                      results.review &&
                      typeof results.review.rating === "number" && results.review.rating >= 7.5
                        ? theme === 'light' ? "text-[var(--greatLight)]" : "text-[var(--great)]"
                        : results.review &&
                            typeof results.review.rating === "number" && results.review.rating >= 5
                          ? theme === 'light' ? "text-[var(--mediumLight)]" : "text-[var(--medium)]"
                          : theme === 'light' ? "text-[var(--badLight)]" : "text-[var(--bad)]"
                    }`}
                  >
                    {results.review &&
                      results.review.rating?.toFixed(1)}
                  </span>{" "}
                  - {results.review && results.review.author}
                </p>
              </div>
            </div>
          )}
        </>
    );
}