"use client";

import Image from "next/image";
import Details from "../Details Button";
import Menu from "../Types Simple";
import Theme from "../Themes";
import Favorites from "../Favorites";
import type { Filters } from "@/types/media";

import { useState } from "react";

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
  setFilters: any;
  setTheme: any;
  favorites: any;
  setOpenField: any;
  setMedia: any;
  setCurrent: any;
}) {
  const [input, setInput] = useState("");

  async function handleSubmit(e: any) {
    e.preventDefault();

    const response = await fetch("/api/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: input,
        filters: filters,
        type: "simple",
      }),
    });

    const data = await response.json();

    setMedia(data);

    setOpenField(true);
  }

  return (
    <div className="flex flex-col h-fit">
      <Image
        src="/Imagens/Logo.png"
        height={170}
        width={737}
        alt="Logo"
        className="scale-50 m-[0_auto]"
      ></Image>

      <form
        action=""
        className="m-[0_auto] flex gap-5 mb-8 items-center"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          className={`w-[50%] p-2 rounded-[5px] text-lg ${theme === "dark" ? "bg-[var(--background)]" : theme === "light" ? "bg-[var(--backgroundLight)]" : theme === "glass" ? "bg-[var(--backgroundGlass)] backdrop-blur-md" : "bg-[var(--backgroundTransparent)] backdrop-blur-md"} ${theme === "dark" ? "text-[var(--text)]" : theme === "light" ? "text-[var(--textLight)]" : "text-[var(--textLight)]"} focus:outline-none ${theme === "dark" ? "hover:bg-[var(--backgroundHover)]" : theme === "light" ? "hover:bg-[var(--backgroundLightHover)]" : "hover:bg-[var(--backgroundGlassHover)]"} hover:outline-1`}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className={` w-fit h-fit p-2 rounded-[5px] ${theme === "dark" ? "bg-[var(--background)]" : theme === "light" ? "bg-[var(--backgroundLight)]" : theme === "glass" ? "bg-[var(--backgroundGlass)] backdrop-blur-md" : "bg-[var(--backgroundTransparent)] backdrop-blur-md"} ${theme === "dark" ? "text-[var(--text)]" : theme === "light" ? "text-[var(--textLight)]" : "text-[var(--textLight)]"} pl-3 pr-3 focus:outline-none ${theme === "dark" ? "hover:bg-[var(--backgroundHover)]" : theme === "light" ? "hover:bg-[var(--backgroundLightHover)]" : "hover:bg-[var(--backgroundGlassHover)]"} hover:outline-1`}
        >
          Submit
        </button>

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
