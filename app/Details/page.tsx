"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Heart } from "lucide-react";
import type { Favorite, Filters, MediaResult, SearchData } from "@/types/media";
import FormMedia from "@/components/Details/Form";
import DataShowMobile from "@/components/Mobile/Details/DataShow";
import DesktopResultPanel from "@/components/Desktop/Details/ResultPanel";

export default function Details() {
  const [media, setMedia] = useState<SearchData | null>(null);
  const [current, setCurrent] = useState(1);
  const results = (media?.[current] as MediaResult | undefined) ?? null;
  const [theme, setTheme] = useState("dark");
  const [openField, setOpenField] = useState(false);
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [NSFW, setNSFW] = useState(false);
  const [query, setQuery] = useState("");
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

  useEffect(() => {
    const saved = localStorage.getItem("Favorites");
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (results?.type === "anime" || results?.type === "manga") {
      setSpoiler(results.review?.spoiler ?? false);
    } else {
      setSpoiler(false);
    }
  }, [media, current]);

  const isFavorite = results
    ? favorites.some((item) => item.image === results.cover)
    : false;

  function handleClick(direction: "left" | "right") {
    if (!media || media.length <= 1) return;
    if (direction === "left") {
      setCurrent((value) => value > 1 ? value - 1 : media.length - 1);
    } else {
      setCurrent((value) => value < media.length - 1 ? value + 1 : 1);
    }
  }

  async function search(type: string, nsfw: boolean) {
    setOpenField(true);
    try {
      const response = await fetch("/api/random", {
        method: "POST",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
        body: JSON.stringify({ type, NSFW: nsfw }),
      });
      const info = await response.json();
      setMedia(info.fullSearch);
      setCurrent(1);
    } catch (error) {
      console.error("Erro ao pesquisar:", error);
    }
  }

  function favorite() {
    if (!results?.cover) return;
    setFavorites((previous) => {
      const exists = previous.some((item) => item.image === results.cover);
      const updated = exists
        ? previous.filter((item) => item.image !== results.cover)
        : [...previous, { name: results.name, type: results.type, image: results.cover! }];
      localStorage.setItem("Favorites", JSON.stringify(updated));
      return updated;
    });
  }

  const panelTheme =
    theme === "dark"
      ? "bg-[var(--background)] text-[var(--text)]"
      : theme === "light"
        ? "bg-[var(--backgroundLight)] text-[var(--textLight)]"
        : theme === "glass"
          ? "bg-[var(--backgroundGlass)] text-[var(--textLight)] backdrop-blur-md"
          : "bg-[var(--backgroundTransparent)] text-[var(--textLight)] backdrop-blur-md";

  return (
    <></>
  );
}
