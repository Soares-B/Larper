"use client";

import type { Favorite, Filters, SearchData, Suggestion } from "@/types/media";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import Theme from "@/components/Themes";
import { searchMedia, selectMedia } from "@/lib/mediaSearch";
import Menu from "@/components/Types Detailed";
import Simple from "../Simple Button";
import Favorites from "../Favorites";

export default function FormMedia({
  theme,
  setTheme,
  setOpenField,
  setMedia,
  setCurrent,
  query,
  setQuery,
  suggestions,
  setSuggestions,
  filters,
  setFilters,
  favorites,
  favorite,
}: {
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
  setOpenField: Dispatch<SetStateAction<boolean>>;
  setMedia: (data: SearchData) => void;
  setCurrent: Dispatch<SetStateAction<number>>;
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  suggestions: Suggestion[];
  setSuggestions: Dispatch<SetStateAction<Suggestion[]>>;
  filters: Filters;
  setFilters: Dispatch<SetStateAction<Filters>>;
  favorites: Favorite[];
  favorite: () => void;
}){

  async function search(queryToSearch: string) {
    if (!queryToSearch.trim()) {
      return;
    }

    setOpenField(true);
    setSuggestions([]);

    try {
      const data = await searchMedia(queryToSearch, filters, "detailed");
      setMedia(data);
      setCurrent(1);
    } catch (error) {
      console.error("Erro ao pesquisar:", error);
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    search(query);
  }

    return(
        <form
            className="block ml-[2%] m-[auto_0] w-[50%] max-[1441px]:w-[60%] h-[40px] flex justify-between row-1"
            onSubmit={handleSubmit}
        >
            <div className="w-[80%] relative">
            <Combobox
                onChange={async (selectedItem: Suggestion | null) => {
                if (!selectedItem) {
                    return;
                }
                setQuery(selectedItem.name);
                setSuggestions([]);
                try {
                  const data = await selectMedia(selectedItem.name, selectedItem.type);
                  setMedia(data);
                  setCurrent(1);
                  setOpenField(true);
                } catch (error) {
                    console.error("Erro ao buscar item selecionado:", error);
                }
                }}
            >
                <ComboboxInput
                aria-label="Input"
                className={`w-full h-full p-px ${
                    theme === "dark"
                    ? "bg-[var(--background)]"
                    : theme === "light"
                        ? "bg-[var(--backgroundLight)]"
                        : theme === "glass"
                        ? "bg-[var(--backgroundGlass)] backdrop-blur-md"
                        : "bg-[var(--backgroundTransparent)] backdrop-blur-md"
                } ${
                    theme === "dark"
                    ? "text-[var(--text)]"
                    : "text-[var(--textLight)]"
                } text-[rgba(255,255,255,0.455)] border-[rgba(255,255,255,0.171)] rounded-[5px] focus:outline-none text-xl pl-1`}
                onChange={(e) => {
                    setQuery(e.target.value);
                }}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                    e.preventDefault();
                    search(e.currentTarget.value);
                    }
                }}
                autoComplete="off"
                />
                <ComboboxOptions
                className={`absolute top-[45px] left-0 w-full ${
                    theme === "dark"
                    ? "bg-[var(--background)]"
                    : theme === "light"
                        ? "bg-[var(--backgroundLight)]"
                        : theme === "glass"
                        ? "bg-[var(--backgroundGlass)] backdrop-blur-md"
                        : "bg-[var(--backgroundTransparent)] backdrop-blur-md"
                } border border-[rgba(255,255,255,0.171)] rounded-[5px] overflow-hidden z-50 shadow-lg`}
                >
                {suggestions.map((item: any, index: any) => (
                    <ComboboxOption
                    key={`${item.type}-${item.name}-${index}`}
                    value={item}
                    className={`px-3 py-2 ${
                        theme === "dark"
                        ? "text-[var(--text)]"
                        : theme === "light"
                            ? "text-[var(--textLight)]"
                            : "text-[var(--textLight)]"
                    } ${
                        theme === "dark"
                        ? "data-[focus]:bg-zinc-800"
                        : theme === "light"
                            ? "data-[focus]:bg-zinc-300"
                            : "data-[focus]:bg-[var(--backgroundTransparent)] data-[focus]:backdrop-blur-sx"
                    } cursor-pointer flex justify-between items-center`}
                    >
                    <span>{item.name}</span>
                    <span
                        className={`text-xs ${
                        theme === "transparent" ? "text-black" : "text-zinc-500"
                        } uppercase`}
                    >
                        {item.type}
                    </span>
                    </ComboboxOption>
                ))}
                </ComboboxOptions>
            </Combobox>
            </div>
            <button
            type="submit"
            aria-label="search"
            className={`w-[20%] p-px ${
                theme === "dark"
                ? "bg-[var(--background)]"
                : theme === "light"
                    ? "bg-[var(--backgroundLight)]"
                    : theme === "glass"
                    ? "bg-[var(--backgroundGlass)] backdrop-blur-md"
                    : "bg-[var(--backgroundTransparent)] backdrop-blur-md"
            } ${
                theme === "dark"
                ? "text-[var(--text)]"
                : "text-[var(--textLight)]"
            } text-[rgba(255,255,255,0.455)] border-[rgba(255,255,255,0.171)] rounded-[5px] m-[0_10px] focus:outline-none text-xl hover:cursor-pointer`}
            >
            Search
            </button>
            <Simple theme={theme}/>
            <Menu filters={filters} setFilters={setFilters} theme={theme} />
            <Theme theme={theme} setTheme={setTheme} />
            <Favorites theme={theme} favorites={favorites} setOpenField={setOpenField} setSuggestions={setSuggestions} setMedia={setMedia} setCurrent={setCurrent}/>
        </form>
    );
}