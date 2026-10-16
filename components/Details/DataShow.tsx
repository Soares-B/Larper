import type { Dispatch, SetStateAction } from "react";
import type { DetailedMediaResult as Result, Filters, SearchData } from "@/types/media";
import { filtersForType, searchMedia } from "@/lib/mediaSearch";
import Link from "next/link";
import AvatarReview from "../ui/Avatar";

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
  setSpoiler: Dispatch<SetStateAction<boolean>>;
  openField: boolean;
  theme: string;
  setMedia: (data: SearchData) => void;
  setCurrent: Dispatch<SetStateAction<number>>;
}) {
  async function search(queryToSearch: string, filters: Filters) {
    if (!queryToSearch.trim()) {
      return;
    }

    try {
      const data = await searchMedia(queryToSearch, filters, "detailed");
      setMedia(data);
      setCurrent(1);
    } catch (error) {
      console.error("Erro ao pesquisar:", error);
    }
  }

  function handleSubmit(query: string, type: string) {
    search(query, filtersForType(type));
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
            } col-span-full text-xl max-[1281px]:text-base text-justify`}
          >
            {results.description}
          </p>

          <div
            className={`relative ${
              theme === "dark" ? "bg-[#ffffff11]" : "bg-[#00000022]"
            } w-[90%] h-[80%] rounded-[20px] overflow-y-scroll scrollbar-none max-[1441px]:text-lg max-[1281px]:text-sm max-[1025px]:text-xs`}
          >
            <p
              className={`${
                theme === "dark"
                  ? "text-[var(--middleTone)]"
                  : theme === "light"
                    ? "text-[var(--middleToneLight)]"
                    : "text-[var(--textLight)]"
              } m-[6px_9px]`}
            >
              {results.type === 'game' ? 'Game type' : 'Runtime'}
            </p>

            <p
              className={`absolute ${
                results.type === "manga" || results.type === "serie"
                  ? "text-lg max-[1281px]:text-sm"
                  : "text-3xl max-[1441px]:text-2xl max-[1281px]:text-xl max-[1025px]:text-base max-[769px]:text-sm"
              } left-[4%] ${
                results.type === "manga" || results.type === "serie"
                  ? "bottom-[15%]"
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
            } w-[90%] h-[80%] rounded-[20px] overflow-y-scroll scrollbar-none max-[1441px]:text-lg max-[1281px]:text-sm max-[1025px]:text-xs`}
          >
            <p
              className={`${
                theme === "dark"
                  ? "text-[var(--middleTone)]"
                  : theme === "light"
                    ? "text-[var(--middleToneLight)]"
                    : "text-[var(--textLight)]"
              } m-[6px_9px]`}
            >
              Rating
            </p>

            <p
              className={`absolute text-3xl max-[1441px]:text-2xl max-[1281px]:text-xl max-[1025px]:text-lg left-[4%] bottom-[10%] w-full ${
                results.rating ? results.rating >= 7.5
                  ? theme === "light"
                    ? "text-[var(--greatLight)]"
                    : "text-[var(--great)]"
                  : results.rating && results.rating >= 5
                    ? theme === "light"
                      ? "text-[var(--mediumLight)]"
                      : "text-[var(--medium)]"
                    : theme === "light"
                      ? "text-[var(--badLight)]"
                      : "text-[var(--bad)]" : theme === "light"
                      ? "text-[var(--textLight)]" : theme === "glass" ? "text-[var(--textLight)]"
                      : theme === "transparent" ? "text-[var(--textLight)]" : "text-[var(--text)]"
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
                        } max-[1025px]:text-[10px] max-[769px]:text-[8px]`}
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
                        className={`text-sm ml-[5%] max-[1025px]:ml-[3%] ${
                          theme === "dark"
                            ? "text-[var(--middleTone)]"
                            : theme === "light"
                              ? "text-[var(--middleToneLight)]"
                              : "text-[var(--textLight)]"
                        } max-[1025px]:text-[10px] max-[769px]:text-[8px]`}
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
            } w-[90%] h-[80%] rounded-[20px] overflow-y-scroll scrollbar-none max-[1441px]:text-lg max-[1281px]:text-sm max-[1025px]:text-xs`}
          >
            <p
              className={`${
                theme === "dark"
                  ? "text-[var(--middleTone)]"
                  : theme === "light"
                    ? "text-[var(--middleToneLight)]"
                    : "text-[var(--textLight)]"
              } m-[6px_9px]`}
            >
              Genres
            </p>

            <p
              className={`absolute text-lg max-[1281px]:text-sm max-[1025px]:text-xs left-[4%] top-[30%] max-[1281px]:top-[40%]`}
            >
              {results.type === "music"
                ? results.artist?.name
                : results.genres ? results.genres.length > 0 ? results.genres.join(", ") : 'No data ( ._. )""' : 'No data ( ._. )""'}
            </p>
          </div>

          <div
            className={`relative ${
              theme === "dark" ? "bg-[#ffffff11]" : "bg-[#00000022]"
            } w-[90%] h-[80%] rounded-[20px] overflow-y-scroll scrollbar-none max-[1441px]:text-lg max-[1281px]:text-sm max-[1025px]:text-xs`}
          >
            <p
              className={`${
                theme === "dark"
                  ? "text-[var(--middleTone)]"
                  : theme === "light"
                    ? "text-[var(--middleToneLight)]"
                    : "text-[var(--textLight)]"
              } m-[6px_9px]`}
            >
              {results.type === "music" ? "Album" : "Release date"}
            </p>

            <p className="absolute text-lg max-[1281px]:text-base max-[1025px]:text-sm left-[4%] top-[30%] max-[1281px]:top-[40%]">
              {results.date?.replaceAll("-", "/")}
            </p>
          </div>

          {/*
               --------------------------------------Details---------------------------------------------- 
               */}

          <div
            className={`relative ${
              theme === "dark" ? "bg-[#ffffff11]" : "bg-[#00000022]"
            } w-[90%] h-[80%] rounded-[20px] overflow-y-scroll scrollbar-none max-[1441px]:text-lg max-[1281px]:text-sm max-[1025px]:text-xs overflow-y-scroll scrollbar-none`}
          >
            <p
              className={`${
                theme === "dark"
                  ? "text-[var(--middleTone)]"
                  : theme === "light"
                    ? "text-[var(--middleToneLight)]"
                    : "text-[var(--textLight)]"
              } m-[6px_9px]`}
            >
              {results.type === "anime" || results.type === "manga"
                ? "Type"
                : results.type === 'game' ? "Game modes" : results.type === "serie"
                  ? "Episode runtime"
                  : "Budget/Revenue"}
            </p>

            <p className={`absolute ${results.type === 'movie' ? 'max-[1441px]:text-sm max-[1281px]:text-xs max-[1025px]:text-[10px]' : 'text-lg max-[1281px]:text-base max-[1025px]:text-sm'} left-[4%] top-[30%]`}>
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
                      ? "text-[var(--textLight)]" : theme === "glass" ? "text-[var(--textLight)]"
                      : theme === "transparent" ? "text-[var(--textLight)]" : "text-[var(--text)]"
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
            } w-[90%] h-[80%] rounded-[20px] overflow-y-scroll scrollbar-none max-[1441px]:text-lg max-[1281px]:text-sm max-[1025px]:text-xs overflow-y-scroll scrollbar-none`}
          >
            <p
              className={`${
                theme === "dark"
                  ? "text-[var(--middleTone)]"
                  : theme === "light"
                    ? "text-[var(--middleToneLight)]"
                    : "text-[var(--textLight)]"
              } m-[6px_9px] ${results.type === 'movie' || results.type === 'serie' ? 'max-[1441px]:text-sm max-[1281px]:text-xs max-[1025px]:text-[10px]' : ''}`}
            >
              {results.type === "anime"
                ? "Source"
                : results.type === "manga"
                  ? "Status"
                  : results.type === 'game' ? 'Platforms' : results.type === "serie"
                    ? "Serie recommendations"
                    : "Movie recommendations"}
            </p>

            <p className={`absolute ${results.type === 'serie' || results.type === 'movie' ? 'max-[1441px]:text-sm max-[1025px]:text-xs' : 'text-lg max-[1281px]:text-base max-[1025px]:text-sm'} left-[4%] top-[30%]`}>
              {results.type === "anime" ? (
                results.source
              ) : results.type === "manga" ? (
                results.status
              ) : results.type === 'game' ? results.platforms?.join(", ") : results.type === "serie" ? (
                <>
                  {results.recommendations?.map((r) => {
                    return (
                      <span key={r}>
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
                      <span key={r}>
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
            } w-[90%] h-[80%] rounded-[20px] overflow-y-scroll scrollbar-none max-[1441px]:text-lg max-[1281px]:text-sm max-[1025px]:text-xs overflow-y-scroll scrollbar-none`}
          >
            <p
              className={`${
                theme === "dark"
                  ? "text-[var(--middleTone)]"
                  : theme === "light"
                    ? "text-[var(--middleToneLight)]"
                    : "text-[var(--textLight)]"
              } m-[6px_9px]`}
            >
              {results.type === "anime"
                ? "Duration"
                : results.type === "manga"
                  ? "Authors"
                  : results.type === 'game' ? 'Themes' : "Keywords"}
            </p>

            <p className={`absolute ${results.type === 'manga' || results.type === 'serie' || results.type === 'movie' ? 'max-[1281px]:text-sm max-[1025px]:text-xs' : 'max-[1281px]:text-base max-[1025px]:text-sm'} left-[4%] top-[30%]`}>
              {results.type === "anime" ? (
                results.duration
              ) : results.type === "manga" ? (
                <>
                  {results.authors?.map((a) => {
                    return (
                      <span key={a.name}>
                        <Link
                          key={a.name}
                          className="underline"
                          href={typeof a.link === 'string' ? a.link : ''}
                          target="_blank"
                        >
                          {a.name}
                        </Link>,{" "}
                      </span>
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
            } w-[90%] h-[80%] rounded-[20px] overflow-y-scroll scrollbar-none max-[1441px]:text-lg max-[1281px]:text-sm max-[1025px]:text-xs overflow-y-scroll scrollbar-none`}
          >
            <p
              className={`${
                theme === "dark"
                  ? "text-[var(--middleTone)]"
                  : theme === "light"
                    ? "text-[var(--middleToneLight)]"
                    : "text-[var(--textLight)]"
              } m-[6px_9px] max-[1441px]:text-sm max-[1281px]:text-xs max-[1025px]:text-[10px]`}
            >
              {results.type === "anime"
                ? "Anime recommendations"
                : results.type === "manga"
                  ? "Manga recommendations" : results.type === 'game' ? 'Languages' : results.type === 'serie'? "Similar series"
                  : "Similar movies"}
            </p>

            <p className={`absolute text-lg max-[1441px]:text-base max-[1281px]:text-sm max-[1025px]:text-xs left-[4%] top-[30%]`}>
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
                      <span key={s}>
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
                      <span key={s}>
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




          <Link
            href={results.review?.link ?  results.review.link : ''}
            target="_blank"
            className="w-[100%] h-full col-span-full row-4 rounded-[20px] overflow-y-scroll scrollbar-none max-[1441px]:text-lg max-[1281px]:text-sm z-1 absolute row-2"
          />

          <div
            className={`relative ${
              theme === "dark" ? "bg-[#ffffff11]" : "bg-[#00000022]"
            } w-[100%] h-full col-span-full row-4 rounded-[20px] overflow-y-scroll scrollbar-none max-[1441px]:text-lg max-[1281px]:text-sm max-[1025px]:text-xs`}
          >
            <p
              className={`${
                theme === "dark"
                  ? "text-[var(--middleTone)]"
                  : theme === "light"
                    ? "text-[var(--middleToneLight)]"
                    : "text-[var(--textLight)]"
              } m-[6px_9px]`}
            >
              Review
            </p>

            <p className="absolute text-base max-[1441px]:text-sm max-[1281px]:text-xs max-[1025px]:text-[10px] left-[2%] top-[30%] w-[95%] text-justify">
              {results.review ? results.review.content ? results.review.content : 'No review :‹' : 'No review :‹'}
            </p>

            {results.review && results.review.author && (
              <div className="absolute text-base max-[1441px]:text-sm bottom-[2%] right-[5%] w-[300px] flex items-center justify-end">
                <p className="mr-[5px]">
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
                <AvatarReview path={results.review?.avatar} name={results.review?.author}/>
              </div>
            )}
          </div>

        </div>
      )}
    </>
  );
}
