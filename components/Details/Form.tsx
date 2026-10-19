"use client";

import type { Dispatch, FormEvent, SetStateAction } from "react";
import type { Favorite, Filters, SearchData } from "@/types/media";
import Theme from "@/components/Themes";
import { searchMedia } from "@/lib/mediaSearch";
import Menu from "@/components/Types Detailed";
import Simple from "../Simple Button";
import Favorites from "../Favorites";

type Props = {
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
  setOpenField: Dispatch<SetStateAction<boolean>>;
  setMedia: (data: SearchData) => void;
  setCurrent: Dispatch<SetStateAction<number>>;
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  filters: Filters;
  setFilters: Dispatch<SetStateAction<Filters>>;
  favorites: Favorite[];
  favorite: () => void;
};

export default function FormMedia({
  theme,
  setTheme,
  setOpenField,
  setMedia,
  setCurrent,
  query,
  setQuery,
  filters,
  setFilters,
  favorites,
}: Props) {
  async function search(queryToSearch: string) {
    if (!queryToSearch.trim()) return;
    setOpenField(true);
    try {
      const data = await searchMedia(queryToSearch, filters, "detailed");
      setMedia(data);
      setCurrent(1);
    } catch (error) {
      console.error("Erro ao pesquisar:", error);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    search(query);
  }

  return (
    <form
      className="my-auto flex min-h-10 w-[min(820px,62vw)] flex-wrap items-center justify-start gap-2 max-[1441px]:w-[70vw] max-[1024px]:w-[90vw] max-[640px]:w-[calc(100%-24px)] max-[640px]:justify-center"
      onSubmit={handleSubmit}
    >
      <input
        aria-label="Search title"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        autoComplete="off"
        placeholder="Search..."
        className={`h-10 min-w-0 flex-1 rounded-[5px] border border-white/20 px-2 text-base focus:outline-none ${theme === "dark" ? "bg-[var(--background)] text-[var(--text)]" : theme === "light" ? "bg-[var(--backgroundLight)] text-[var(--textLight)]" : theme === "glass" ? "bg-[var(--backgroundGlass)] text-[var(--textLight)] backdrop-blur-md" : "bg-[var(--backgroundTransparent)] text-[var(--textLight)] backdrop-blur-md"}`}
      />
      <button
        type="submit"
        className={`h-10 shrink-0 rounded-[5px] border border-white/20 px-4 text-base hover:cursor-pointer ${theme === "dark" ? "bg-[var(--background)] text-[var(--text)]" : theme === "light" ? "bg-[var(--backgroundLight)] text-[var(--textLight)]" : theme === "glass" ? "bg-[var(--backgroundGlass)] text-[var(--textLight)] backdrop-blur-md" : "bg-[var(--backgroundTransparent)] text-[var(--textLight)] backdrop-blur-md"}`}
      >
        Search
      </button>
      <Simple theme={theme} />
      <Menu filters={filters} setFilters={setFilters} theme={theme} />
      <Theme theme={theme} setTheme={setTheme} />
      <Favorites theme={theme} favorites={favorites} setOpenField={setOpenField} setMedia={setMedia} setCurrent={setCurrent} />
    </form>
  );
}
