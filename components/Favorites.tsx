import { DropdownMenu } from "radix-ui";
import { Heart } from "lucide-react";
import Image from "next/image";

type Favorite = {
  name: string;
  type: string;
  image: string;
};

type Props = {
  theme: string;
  favorites: Favorite[];
  setOpenField: any;
  setSuggestions: any;
  setMedia: any;
  setCurrent: any;
};

type SearchData = [string[]];

export default function Favorites({ theme, favorites, setOpenField, setSuggestions, setMedia, setCurrent }: Props) {

    async function search(queryToSearch: string, filters: any) {
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

        setMedia(data);
        setCurrent(1);
        } catch (error) {
        console.error("Erro ao pesquisar:", error);
        }
    }

    function handleSubmit(query: string, type: string) {
    const filters: any = {};

    switch (type) {
      case "anime":
        filters.anime = true;
        break;

      case "manga":
        filters.manga = true;
        break;

      case "serie":
        filters.serie = true;
        break;

      case "movie":
        filters.movie = true;
        break;
    }

    search(query, filters);
  }


  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className={`inline-flex size-[35px] w-[55px] items-center justify-center rounded-full ${theme === "dark" ? "bg-[var(--background)]" : theme === "light" ? "bg-[var(--backgroundLight)]" : theme === "glass" ? "bg-[var(--backgroundGlass)] backdrop-blur-md" : "bg-[var(--backgroundTransparent)] backdrop-blur-md"} ${theme === "dark" ? "text-[var(--text)]" : theme === "light" ? "text-[var(--textLight)]" : "text-[var(--textLight)]"} shadow-blackA4 outline-none hover:bg-violet3 hover:cursor-pointer m-[0px_0px_0px_5px]`}
          aria-label="Customise options "
        >
          <Heart fill="" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={`min-w-[275px] max-h-[300px] rounded-md ${theme === "dark" ? "bg-[var(--background)]" : theme === "light" ? "bg-[var(--backgroundLight)]" : theme === "glass" ? "bg-[var(--backgroundGlass)] backdrop-blur-md" : "bg-[var(--backgroundTransparent)] backdrop-blur-md"} shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade overflow-y-scroll scrollbar-thin ${
                          theme === "dark"
                            ? "scrollbar-track-[var(--middleDownTone)]"
                            : theme === "light"
                              ? "scrollbar-track-[var(--middleUpperTone)]"
                              : theme === 'glass' ? "scrollbar-track-[var(--middleTone)]" : "scrollbar-track-[var(--middleTone)]/25"
                        } ${
                          theme === "dark"
                            ? "scrollbar-thumb-[var(--middleTone)]"
                            : theme === "light"
                              ? "scrollbar-thumb-[var(--middleToneLight)]" : theme === 'glass' ? "scrollbar-thumb-[var(--middleToneLight)]" : "scrollbar-thumb-[var(--middleToneLight)]/75"
                        } snap-y snap-start scroll-p-[5px]`}
          sideOffset={5}
        >
          <DropdownMenu.Label
            className={`pl-[25px] w-full h-[40px] text-sm leading-[25px] ${theme === "dark" ? "bg-[var(--background)]" : theme === "light" ? "bg-[var(--backgroundLight)]" : theme === "glass" ? "bg-[var(--backgroundGlass)] backdrop-blur-3xl" : "bg-[var(--backgroundTransparent)] backdrop-blur-3xl"} ${theme === "dark" ? "text-[var(--text)]" : theme === "light" ? "text-[var(--textLight)]" : "text-[var(--textLight)]"} pt-[10px] sticky top-0 z-1`}
          >
            Favorites
          </DropdownMenu.Label>
          {favorites &&
            favorites.map((f) => {
              return (
                <>
                  <DropdownMenu.Item
                    className={`relative flex h-[25px] select-none items-center rounded-[3px] pl-[10px] pr-[5px] text-[13px] leading-none ${theme === "dark" ? "text-[var(--text)]" : theme === "light" ? "text-[var(--textLight)]" : "text-[var(--textLight)]"} outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1 mt-[20px] hover:cursor-pointer`}
                    key={f.name}
                    onSelect={(e) => {
                      e.preventDefault();
                      handleSubmit(f.name, f.type);
                    }}
                  >
                    <Image
                      src={f.image}
                      width={40}
                      height={30}
                      alt={f.name}
                      className="rounded-[2px] mr-[15px]"
                    />

                    <div className="flex w-fit items-center">
                      <p className="w-[100px] mr-[20px]">{f.name}</p>
                      <p
                        className={`w-fit ${
                          theme === "dark"
                            ? "text-[var(--middleTone)]"
                            : theme === "light"
                              ? "text-[var(--middleToneLight)]"
                              : "text-[var(--textLight)]"
                        }`}
                      >
                        {f.type}
                      </p>
                    </div>
                  </DropdownMenu.Item>
                  <br />
                </>
              );
            })}

          <DropdownMenu.Arrow className="fill-white" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
