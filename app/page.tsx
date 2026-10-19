"use client";

import type { Filters, MediaResult, SearchData } from "@/types/media";
import { useState, useEffect } from "react";

import DesktopLogoInput from "@/components/Desktop/Logo+Form";
import DesktopMain from "@/components/Desktop/Main";

export default function Home() {
  const [theme, setTheme] = useState("dark");
  const [openField, setOpenField] = useState(false);

  const [query, setQuery] = useState("");
  const [favorites, setFavorites] = useState([])

  const [media, setMedia] = useState<SearchData | null>(null);
  const [current, setCurrent] = useState(1);
  const [spoiler, setSpoiler] = useState(false);

  const [filters, setFilters] = useState<Filters>({
    anime: true,
    manga: false,
    game: false,
    book: false,
    serie: false,
    movie: false,
    music: false,
  });

  const results = (media?.[current] as MediaResult | undefined) ?? null;

  console.log(results)

  useEffect(() => {
    const result = media?.[current] as MediaResult | undefined;

    if (result?.type === "anime" || result?.type === "manga") {
      setSpoiler(result.review?.spoiler ?? false);
    } else {
      setSpoiler(false);
    }
  }, [media, current]);

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
    <div className="h-screen w-screen">

      <div key="mobile" className="min-[769]:hidden">

      </div>

      {/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}

      <div key="desktop" className="max-[768]:hidden w-full h-full flex flex-col">
        <DesktopLogoInput theme={theme} filters={filters} setFilters={setFilters} setTheme={setTheme} favorites={favorites} setOpenField={setOpenField} setMedia={setMedia} setCurrent={setCurrent}/>

        <DesktopMain theme={theme} results={results} openField={openField} />
      </div>

    </div>
  );
}