import Link from "next/link";

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
  budgetNumber: number;
  revenue?: number;
  revenueNumber?: number;

  game_type?: string;
  game_modes?: string[]
  platforms?: string[]
  themes?: string[]
  language?: {
    languages?: string[]
  }

  recommendations?: string[];
  keywords?: string[];
  similar?: string[];

  typeData?: string;
  source?: string;
  duration?: string;
  recoms?: string[];
  votes?: number

  authors?: {
    name?: string;
    link?: string;
  }[];

  episode_runtime?: string;
};

type SearchData = [string[]];

export default function DataShow({
  results,
  spoiler,
  setSpoiler,
  openField,
  theme,
  setMedia,
  setCurrent,
}: {
  results: Result;
  spoiler: boolean;
  setSpoiler: any;
  openField: boolean;
  theme: string;
  setMedia: any;
  setCurrent: any;
}) {
  async function search(queryToSearch: string, filters: any) {
    if (!queryToSearch.trim()) {
      return;
    }

    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: queryToSearch,
          filters: filters,
          type: "detailed",
        }),
      });

      const data: SearchData = await response.json();

      console.log(data);

      console.log(data);

      setMedia(data);
      setCurrent(1);
    } catch (error) {
      console.error("Erro ao pesquisar:", error);
    }
  }

  function handleSubmit(query: string, type: string) {
    const filters: any = {};

    switch (type) {
      case "anime":
        filters.anime = true;
        break;

      case "manga":
        filters.manga = true;
        break;

      case "serie":
        filters.serie = true;
        break;

      case "movie":
        filters.movie = true;
        break;
    }

    search(query, filters);
  }

  return (
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
              {results.type === 'game' ? 'Game type' : 'Runtime'}
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
              ) : results.type === 'game' ? results.game_type : results.type === "movie" ? (
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
              {results.rating ? (
                results.type === "movie" || results.type === 'serie' ? (
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
                ) : results.type === 'anime' || results.type === 'manga' ? results.rating && (
                  results.votes ? (
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
                        votes: {results.votes}
                      </span>
                    </>
                  ) : (
                    results.rating
                  )
                  ) : (
                  results.rating
                )
              ) : (
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
                : results.genres ? results.genres.length > 0 ? results.genres.join(", ") : 'No data ( ._. )""' : 'No data ( ._. )""'}
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

          {/*
               --------------------------------------Details---------------------------------------------- 
               */}

          <div
            className={`relative ${
              theme === "dark" ? "bg-[#ffffff11]" : "bg-[#00000022]"
            } w-[90%] h-[80%] rounded-[20px] overflow-hidden`}
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
              {results.type === "anime" || results.type === "manga"
                ? "Type"
                : results.type === 'game' ? "Game modes" : results.type === "serie"
                  ? "Episode runtime"
                  : "Budget/Revenue"}
            </p>

            <p className="absolute text-lg left-[4%] top-[30%]">
              {results.type === "anime" || results.type === "manga" ? (
                results.typeData
              ) : results.type === 'game' ? results.game_modes?.join(", ") : results.type === "serie" ? (
                results.episode_runtime
              ) : (
                <>
                  Budget: {results.budget}
                  <br />
                  Revenue:{" "}
                  <span
                    className={
                      results.revenueNumber && results.budgetNumber
                        ? results.budgetNumber * 2 < results.revenueNumber
                          ? theme === "light"
                            ? "text-[var(--greatLight)]"
                            : "text-[var(--great)]"
                          : results.budgetNumber * 1.5 < results.revenueNumber
                            ? theme === "light"
                              ? "text-[var(--mediumLight)]"
                              : "text-[var(--medium)]"
                            : theme === "light"
                              ? "text-[var(--badLight)]"
                              : "text-[var(--bad)]"
                        : theme === "light"
                          ? "text-[var(--textLight)]"
                          : "text-[var(--text)]"
                    }
                  >
                    {results.revenue}
                  </span>
                </>
              )}
            </p>
          </div>

          <div
            className={`relative ${
              theme === "dark" ? "bg-[#ffffff11]" : "bg-[#00000022]"
            } w-[90%] h-[80%] rounded-[20px] overflow-hidden`}
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
              {results.type === "anime"
                ? "Source"
                : results.type === "manga"
                  ? "Status"
                  : results.type === 'game' ? 'Platforms' : results.type === "serie"
                    ? "Serie recommendations"
                    : "Movie recommendations"}
            </p>

            <p className="absolute text-lg left-[4%] top-[30%]">
              {results.type === "anime" ? (
                results.source
              ) : results.type === "manga" ? (
                results.status
              ) : results.type === 'game' ? results.platforms?.join(", ") : results.type === "serie" ? (
                <>
                  {results.recommendations?.map((r) => {
                    return (
                      <span>
                        <Link
                          key={r}
                          href=""
                          className="underline"
                          onClick={() => handleSubmit(r, "serie")}
                        >
                          {r}
                        </Link>
                        ,{" "}  
                      </span>
                    );
                  })}
                </>
              ) : (
                <>
                  {results.recommendations?.map((r) => {
                    return (
                      <span>
                        <Link
                          key={r}
                          href=""
                          className="underline"
                          onClick={() => handleSubmit(r, "movie")}
                        >
                          {r}
                        </Link>
                        ,{" "}  
                      </span>
                    );
                  })}
                </>
              )}
            </p>
          </div>

          <div
            className={`relative ${
              theme === "dark" ? "bg-[#ffffff11]" : "bg-[#00000022]"
            } w-[90%] h-[80%] rounded-[20px] overflow-hidden`}
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
              {results.type === "anime"
                ? "Duration"
                : results.type === "manga"
                  ? "Authors"
                  : results.type === 'game' ? 'Themes' : "Keywords"}
            </p>

            <p className="absolute text-lg left-[4%] top-[30%]">
              {results.type === "anime" ? (
                results.duration
              ) : results.type === "manga" ? (
                <>
                  {results.authors?.map((a) => {
                    return (
                      <Link
                        key={a.name}
                        className="underline"
                        href={typeof a.link === 'string' ? a.link : ''}
                        target="_blank"
                      >
                        {a.name},{" "}
                      </Link>
                    );
                  })}
                </>
              ) : results.type === 'game' ? results.themes?.join(", ") : (
                results.keywords?.join(", ")
              )}
            </p>
          </div>

          <div
            className={`relative ${
              theme === "dark" ? "bg-[#ffffff11]" : "bg-[#00000022]"
            } w-[90%] h-[80%] rounded-[20px] overflow-hidden`}
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
              {results.type === "anime"
                ? "Anime recommendations"
                : results.type === "manga"
                  ? "Manga recommendations" : results.type === 'game' ? 'Languages' : results.type === 'serie'? "Similar series"
                  : "Similar movies"}
            </p>

            <p className="absolute text-lg left-[4%] top-[30%]">
              {results.type === "anime" ? (
                <>
                  {results.recoms ? results.recoms.length > 0 ? results.recoms.map((r) => {
                    return (
                      <span key={r}>
                        <Link
                          key={r}
                          href=""
                          className="underline"
                          onClick={() => handleSubmit(r, "anime")}
                        >
                          {r}
                        </Link>
                        ,{" "}  
                      </span>
                    );
                  }) : 'No data ∘ ∘ ∘ ( °ヮ° ) ?' : 'No data ∘ ∘ ∘ ( °ヮ° ) ?'}
                </>
              ) : results.type === "manga" ? (
                <>
                  {results.recoms ? results.recoms.length > 0 ? results.recoms?.map((r) => {
                    return (
                      <span key={r}>
                        <Link
                          key={r}
                          href=""
                          className="underline"
                          onClick={() => handleSubmit(r, "manga")}
                        >
                          {r}
                        </Link>
                        ,{" "}  
                      </span>
                    );
                  }) : 'No data (  •̀⤙•́  )' : 'No data (  •̀⤙•́  )'}
                </>
              ) : results.type === 'game' ? results.language ? results.language.languages?.join(", ") : 'No data ( ˶°ㅁ°) !!' : results.type === "serie" ? (
                <>
                  {results.similar?.map((s) => {
                    return (
                      <span>
                        <Link
                          key={s}
                          href=""
                          className="underline"
                          onClick={() => handleSubmit(s, "serie")}
                        >
                          {s}
                        </Link>
                        ,{" "}  
                      </span>
                    );
                  })}
                </>
              ) : (
                <>
                  {results.similar?.map((s) => {
                    return (
                      <span>
                        <Link
                          key={s}
                          href=""
                          className="underline"
                          onClick={() => handleSubmit(s, "movie")}
                        >
                          {s}
                        </Link>
                        ,{" "}  
                      </span>
                    );
                  })}
                </>
              )}
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
              {results.review ? results.review.content ? results.review.content : 'No review :‹' : 'No review :‹'}
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
