"use client";

import Image from "next/image";
import Simple from "../Simple Button";
import Menu from "../Types Detailed";
import Theme from "../Themes";
import Favorites from "../Favorites";
import type { Filters } from "@/types/media";

import { useState } from "react";

export default function MobileLogoInputDetails({
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
        type: "detailed",
      }),
    });

    const data = await response.json();

    setMedia(data);
    setCurrent(1);

    console.log(data);

    setOpenField(true);
  }

  return (
    <div className="flex flex-col items-center gap-3 w-full pl-5 pr-5">
      <Image
        src="/Imagens/Logo2.png"
        height={20}
        width={240}
        alt="Logo"
        className="w-fit h-fit select-none"
      ></Image>

      <form
        action=""
        className="flex gap-5 mb-5 items-center justify-center
        "
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          className={`w-[50%] p-2 rounded-[5px] text-lg ${theme === "dark" ? "bg-[var(--background)]" : theme === "light" ? "bg-[var(--backgroundLight)]" : theme === "glass" ? "bg-[var(--backgroundGlass)] backdrop-blur-md" : "bg-[var(--backgroundTransparent)] backdrop-blur-md"} ${theme === "dark" ? "text-[var(--text)]" : theme === "light" ? "text-[var(--textLight)]" : "text-[var(--textLight)]"} focus:outline-none ${theme === "dark" ? "hover:bg-[var(--backgroundHover)]" : theme === "light" ? "hover:bg-[var(--backgroundLightHover)]" : "hover:bg-[var(--backgroundGlassHover)]"} hover:outline-1`}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className={` w-fit h-fit p-2 rounded-[5px] ${theme === "dark" ? "bg-[var(--background)]" : theme === "light" ? "bg-[var(--backgroundLight)]" : theme === "glass" ? "bg-[var(--backgroundGlass)] backdrop-blur-md" : "bg-[var(--backgroundTransparent)] backdrop-blur-md"} ${theme === "dark" ? "text-[var(--text)]" : theme === "light" ? "text-[var(--textLight)]" : "text-[var(--textLight)]"} pl-3 pr-3 focus:outline-none ${theme === "dark" ? "hover:bg-[var(--backgroundHover)]" : theme === "light" ? "hover:bg-[var(--backgroundLightHover)]" : "hover:bg-[var(--backgroundGlassHover)]"} hover:outline-1 hover:cursor-pointer select-none`}
        >
          Submit
        </button>

        <Simple theme={theme} />
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
