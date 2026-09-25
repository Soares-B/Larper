"use client";

import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import Theme from "@/components/Theme";
import Menu from "@/components/Types";
import Details from "../Details";

type result = {
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
};

type SearchData = [string[], ...result[]];

type Suggestion = {
  name: string;
  type: string;
};

type Filters = {
    [key: string]: boolean
}

export default function MediaForm({ theme, setTheme, setOpenField, setMedia, setCurrent, query, setQuery, suggestions, setSuggestions, filters, setFilters}: {theme: string, setTheme: any, setOpenField: any, setMedia: any, setCurrent: any, query: string, setQuery: any, suggestions: Suggestion | any, setSuggestions: any, filters: Filters, setFilters: any}){

    async function search(queryToSearch: string) {
    if (!queryToSearch.trim()) {
      return;
    }

    setOpenField(true);
    setSuggestions([]);

    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: queryToSearch,
          filters,
          type: "detailed",
        }),
      });

      const data: SearchData = await response.json();

      console.log(data)

      console.log(data)

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
        className="block m-[0_auto] mt-[5px] mb-[30px] w-[40%] h-[40px] flex justify-between"
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
                const response = await fetch("/api/selected", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    name: selectedItem.name,
                    type: selectedItem.type,
                  }),
                });

                const data: SearchData = await response.json();

                setMedia(data);
                setCurrent(1);
                setOpenField(true);
              } catch (error) {
                console.error(
                  "Erro ao buscar item selecionado:",
                  error
                );
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
                      theme === "transparent"
                        ? "text-black"
                        : "text-zinc-500"
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

        <Details theme={theme}/>        

        <Menu
          filters={filters}
          setFilters={setFilters}
          theme={theme}
        />

        <Theme
          theme={theme}
          setTheme={setTheme}
        />
      </form>
    );
}