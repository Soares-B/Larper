"use client";

import Image from "next/image";
import Details from "../Details Button";
import Menu from "../Types Simple";
import Theme from "../Themes";
import Favorites from "../Favorites";
import type { Filters, MediaResult, SearchData } from "@/types/media";

import { useState, type FormEvent, type Dispatch, type SetStateAction } from "react";

export default function DesktopLogoInput({
  theme,
  filters,
  setFilters,
  setTheme,
  favorites,
  setOpenField,
  setMedia,
  setCurrent,
}: {
  theme: string;
  filters: Filters;
  setFilters: Dispatch<SetStateAction<Filters>>;
  setTheme: Dispatch<SetStateAction<string>>;
  favorites: MediaResult[];
  setOpenField: Dispatch<SetStateAction<boolean>>;
  setMedia: Dispatch<SetStateAction<SearchData | null>>;
  setCurrent: Dispatch<SetStateAction<number>>;
}) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!input.trim() || loading) return;

    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: input, filters, type: "simple" }),
      });
      const data: unknown = await response.json().catch(() => null);
      if (!response.ok) {
        const message = typeof data === "object" && data !== null && "message" in data
          ? String(data.message)
          : "Unable to complete the search.";
        throw new Error(message);
      }
      if (!Array.isArray(data) || !Array.isArray(data[0])) {
        throw new Error("The search response is invalid.");
      }

      setMedia(data as SearchData);
      setCurrent(1);
      setOpenField(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to complete the search.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="flex flex-col h-fit
    max-[1367px]:scale-80
    max-[901px]:scale-85"
    >
      <Image
        src="/Imagens/Logo.png"
        height={170}
        width={737}
        alt="Logo"
        className="scale-75 m-[0_auto] select-none
        max-[1601px]:scale-70
        max-[1441px]:scale-65
        max-[1281px]:scale-60
        max-[1025px]:scale-70
        max-[901px]:scale-65
        "
      ></Image>

      <form
        action=""
        className="m-[0_auto] flex gap-5 mb-8 items-center
        max-[1367px]:mb-0"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          aria-label="Search media"
          className={`w-[50%] p-2 rounded-[5px] text-lg ${theme === "dark" ? "bg-[var(--background)]" : theme === "light" ? "bg-[var(--backgroundLight)]" : theme === "glass" ? "bg-[var(--backgroundGlass)] backdrop-blur-md" : "bg-[var(--backgroundTransparent)] backdrop-blur-md"} ${theme === "dark" ? "text-[var(--text)]" : theme === "light" ? "text-[var(--textLight)]" : "text-[var(--textLight)]"} focus:outline-none ${theme === "dark" ? "hover:bg-[var(--backgroundHover)]" : theme === "light" ? "hover:bg-[var(--backgroundLightHover)]" : "hover:bg-[var(--backgroundGlassHover)]"} hover:outline-1`}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className={` w-fit h-fit p-2 rounded-[5px] ${theme === "dark" ? "bg-[var(--background)]" : theme === "light" ? "bg-[var(--backgroundLight)]" : theme === "glass" ? "bg-[var(--backgroundGlass)] backdrop-blur-md" : "bg-[var(--backgroundTransparent)] backdrop-blur-md"} ${theme === "dark" ? "text-[var(--text)]" : theme === "light" ? "text-[var(--textLight)]" : "text-[var(--textLight)]"} pl-3 pr-3 focus:outline-none ${theme === "dark" ? "hover:bg-[var(--backgroundHover)]" : theme === "light" ? "hover:bg-[var(--backgroundLightHover)]" : "hover:bg-[var(--backgroundGlassHover)]"} hover:outline-1 select-none`}
        >
          {loading ? "Searching..." : "Submit"}
        </button>

        {error && <span role="alert" className="text-red-400">{error}</span>}
        <Details theme={theme} />
        <Menu theme={theme} filters={filters} setFilters={setFilters} />
        <Theme theme={theme} setTheme={setTheme} />
        <Favorites
          theme={theme}
          favorites={favorites}
          setOpenField={setOpenField}
          setMedia={setMedia}
          setCurrent={setCurrent}
        />
      </form>
    </div>
  );
}
