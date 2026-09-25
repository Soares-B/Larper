type Result = {
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

export default function DataShow({results, spoiler, setSpoiler, openField, theme}: {results: Result, spoiler: boolean, setSpoiler: any, openField: boolean, theme: string}){

    return(
        <>
         {results && (
            <div
              className={`${
                openField ? "grid" : "hidden"
              } absolute justify-center w-[70%] h-[80%] top-[13%] left-[25%] grid-rows-[1fr_1fr_1fr_1fr] grid-cols-[1fr_1fr_1fr_1fr]`}
            >
              <p
                className={`${
                  theme === "dark"
                    ? "text-[var(--middleTone)]"
                    : theme === "light"
                      ? "text-[var(--middleToneLight)]"
                      : "text-[var(--textLight)]"
                } col-span-full text-xl text-justify`}
              >
                {results.description}
              </p>

              <div
                className={`relative ${
                  theme === "dark" ? "bg-[#ffffff11]" : "bg-[#00000022]"
                } w-[90%] h-[80%] rounded-[20px]`}
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
                  ) : results.type === "music" ? (
                    results.time
                  ) : (
                    ""
                  )}
                </p>
              </div>

              <div
                className={`relative ${
                  theme === "dark" ? "bg-[#ffffff11]" : "bg-[#00000022]"
                } w-[90%] h-[80%] rounded-[20px]`}
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
                  className={`absolute text-3xl left-[4%] bottom-[10%] w-full ${
                    results.rating && results.rating >= 7.5
                      ? theme === "light"
                        ? "text-[var(--greatLight)]"
                        : "text-[var(--great)]"
                      : results.rating && results.rating >= 5
                        ? theme === "light"
                          ? "text-[var(--mediumLight)]"
                          : "text-[var(--medium)]"
                        : theme === "light"
                          ? "text-[var(--badLight)]"
                          : "text-[var(--bad)]"
                  }`}
                >
                  {results.rating ? results.type === 'movie' ? (
                    results.vote_count ? (
                      <>
                        {results.rating}
                        <span
                          className={`text-sm ml-[5%] ${
                            theme === "dark"
                              ? "text-[var(--middleTone)]"
                              : theme === "light"
                                ? "text-[var(--middleToneLight)]"
                                : "text-[var(--textLight)]"
                          }`}
                        >
                          votes: {results.vote_count}
                        </span>
                      </>
                    ) : (
                      results.rating
                    )
                  ) : results.rating : (
                    "No score :/"
                  )}
                </p>
              </div>

              <div
                className={`relative ${
                  theme === "dark" ? "bg-[#ffffff11]" : "bg-[#00000022]"
                } w-[90%] h-[80%] rounded-[20px]`}
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
                  {results.type === "music" ? "Artist" : "Genres"}
                </p>

                <p
                  className={`absolute ${results.type !== "music" ? (results.genres && results.genres.join("").length > 38 ? "text-md" : "text-lg") : "text-lg"} left-[4%] top-[30%]`}
                >
                  {results.type === "music"
                    ? results.artist?.name
                    : results.genres?.join(", ")}
                </p>
              </div>

              <div
                className={`relative ${
                  theme === "dark" ? "bg-[#ffffff11]" : "bg-[#00000022]"
                } w-[90%] h-[80%] rounded-[20px]`}
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
                  {results.type === "music" ? "Album" : "Release date"}
                </p>

                <p className="absolute text-lg left-[4%] top-[30%]">
                  {results.type === "music"
                    ? results.album?.name
                    : results.date?.replaceAll("-", "/")}
                </p>
              </div>

              <div
                className={`relative ${
                  theme === "dark" ? "bg-[#ffffff11]" : "bg-[#00000022]"
                } w-[90%] h-[80%] rounded-[20px]`}
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
                  {results.type === "music" ? "Album" : "budget/Revenue"}
                </p>

                <p className="absolute text-lg left-[4%] top-[30%]">
                  {results.type === "music"
                    ? results.album?.name
                    : (
                        <>
                        Budget: {results.budget}
                        <br />
                        Revenue: {results.revenue}
                        </>)}
                </p>
              </div>

              <div
                className={`bg-[#141414]/75 w-[100%] h-full col-span-full row-4 rounded-[20px] z-1 absolute row-2 transition-[1s] backdrop-blur-sm ${
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
                  theme === "dark" ? "bg-[#ffffff11]" : "bg-[#00000022]"
                } w-[100%] h-full col-span-full row-4 rounded-[20px]`}
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
                  {results.review ? results.review.content : "No review :‹"}
                </p>

                <p className="absolute text-md bottom-[2%] right-[5%]">
                  <span
                    className={`${
                      results.review && results.review.rating >= 7.5
                        ? theme === "light"
                          ? "text-[var(--greatLight)]"
                          : "text-[var(--great)]"
                        : results.review && results.review.rating >= 5
                          ? theme === "light"
                            ? "text-[var(--mediumLight)]"
                            : "text-[var(--medium)]"
                          : theme === "light"
                            ? "text-[var(--badLight)]"
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
        </>
    );
}