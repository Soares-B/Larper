"use client";

import Image from "next/image";
import Details from "../Details Button";
import Menu from "../Types Simple";
import Theme from "../Themes";
import Favorites from "../Favorites";
import type { Filters } from "@/types/media";

import { useState } from "react";

export default function MobileLogoInput({
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
    setCurrent(1)

    console.log(data)

    setOpenField(true);
  }

  return (
    <div className="flex flex-col h-fit p-5 pt-0
    max-[641px]:scale-90
    max-[541px]:p-2 max-[541px]:scale-100
    max-[391px]:scale-90 max-[391px]:p-0
    max-[321px]:scale-80">
      <Image
        src="/Imagens/Logo.png"
        height={170}
        width={737}
        alt="Logo"
        className="scale-60 m-[0_auto]
        "
      ></Image>

      <form
        action=""
        className="m-[0_auto] flex w-full gap-5 mb-0 items-center
        max-[541px]:scale-90 max-[541px]:text-sm
        max-[431px]:flex-col max-[431px]:gap-2"
        onSubmit={handleSubmit}
      >

        {/*---------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
        <div className="flex min-w-0 gap-5 items-center w-[50%]
        max-[431px]:hidden">
          <input
            type="text"
            className={`w-[75%] p-2 rounded-[5px] text-lg ${theme === "dark" ? "bg-[var(--background)]" : theme === "light" ? "bg-[var(--backgroundLight)]" : theme === "glass" ? "bg-[var(--backgroundGlass)] backdrop-blur-md" : "bg-[var(--backgroundTransparent)] backdrop-blur-md"} ${theme === "dark" ? "text-[var(--text)]" : theme === "light" ? "text-[var(--textLight)]" : "text-[var(--textLight)]"} focus:outline-none ${theme === "dark" ? "hover:bg-[var(--backgroundHover)]" : theme === "light" ? "hover:bg-[var(--backgroundLightHover)]" : "hover:bg-[var(--backgroundGlassHover)]"} hover:outline-1
            max-[431px]:w-full`}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            className={`w-fit h-full p-2 rounded-[5px]
              ${theme === "dark" ? "bg-[var(--background)]" : theme === "light" ? "bg-[var(--backgroundLight)]" : theme === "glass" ? "bg-[var(--backgroundGlass)] backdrop-blur-md" : "bg-[var(--backgroundTransparent)] backdrop-blur-md"}
              ${theme === "dark" ? "text-[var(--text)]" : theme === "light" ? "text-[var(--textLight)]" : "text-[var(--textLight)]"}
              ${theme === "dark" ? "hover:bg-[var(--backgroundHover)]" : theme === "light" ? "hover:bg-[var(--backgroundLightHover)]" : "hover:bg-[var(--backgroundGlassHover)]"} pl-3 pr-3 focus:outline-none
              hover:outline-1
            max-[431px]:hidden`}
          >
            Submit
          </button>
        </div>

        {/*---------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
          <input
            type="text"
            className={`p-2 rounded-[5px] text-lg ${theme === "dark" ? "bg-[var(--background)]" : theme === "light" ? "bg-[var(--backgroundLight)]" : theme === "glass" ? "bg-[var(--backgroundGlass)] backdrop-blur-md" : "bg-[var(--backgroundTransparent)] backdrop-blur-md"} ${theme === "dark" ? "text-[var(--text)]" : theme === "light" ? "text-[var(--textLight)]" : "text-[var(--textLight)]"} focus:outline-none ${theme === "dark" ? "hover:bg-[var(--backgroundHover)]" : theme === "light" ? "hover:bg-[var(--backgroundLightHover)]" : "hover:bg-[var(--backgroundGlassHover)]"} hover:outline-1
            max-[431px]:w-2/3 min-[431px]:hidden`}
            onChange={(e) => setInput(e.target.value)}
          />
        <div className="min-[431px]:hidden flex flex-row gap-2">
          <button
          type="submit"
          className={`w-1/2 h-fit p-2 rounded-[5px]
            ${theme === "dark" ? "bg-[var(--background)]" : theme === "light" ? "bg-[var(--backgroundLight)]" : theme === "glass" ? "bg-[var(--backgroundGlass)] backdrop-blur-md" : "bg-[var(--backgroundTransparent)] backdrop-blur-md"}
            ${theme === "dark" ? "text-[var(--text)]" : theme === "light" ? "text-[var(--textLight)]" : "text-[var(--textLight)]"}
            ${theme === "dark" ? "hover:bg-[var(--backgroundHover)]" : theme === "light" ? "hover:bg-[var(--backgroundLightHover)]" : "hover:bg-[var(--backgroundGlassHover)]"} pl-3 pr-3 focus:outline-none
            hover:outline-1 h-full
          `}
        >
          Submit
        </button>

        <Details theme={theme} />

        </div>
        <div className="min-[431px]:hidden flex flex-row gap-2 w-full justify-center">
          <Menu theme={theme} filters={filters} setFilters={setFilters} />
          <Theme theme={theme} setTheme={setTheme} />
          <Favorites
            theme={theme}
            favorites={favorites}
            setOpenField={setOpenField}
            setMedia={setMedia}
            setCurrent={setCurrent}
          />
        </div>

        {/*---------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
        <div className="flex flex-1 min-w-0 items-center justify-between gap-2
        max-[431px]:hidden">
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
        </div>
      </form>
    </div>
  );
}
