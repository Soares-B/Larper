"use client"

import type { MediaResult } from "@/types/media";
import Image from "next/image";
import NSFWButton from "../NSFW Button";

import { useState } from "react";

export default function DesktopMain({ theme, results, openField}: {theme:string, results:MediaResult | null, openField: boolean}){
    const [NSFW, setNSFW] = useState(false)

    return(
        <div className={`${theme === "dark" ? "bg-[var(--background)]" : theme === "light" ? "bg-[var(--backgroundLight)]" : theme === 'glass' ? "bg-[var(--backgroundGlass)] backdrop-blur-md" : "bg-[var(--backgroundTransparent)] backdrop-blur-md"} ${theme === 'dark' ? 'text-[var(--text)]' : theme === 'light' ? 'text-[var(--textLight)]' : 'text-[var(--textLight)]'} m-[0_auto] h-full flex-1 mb-8 rounded-[5px] transition-[2s] ${openField ? 'w-[60%]' : 'w-[0%]'}`}>
            {results && (
                <>
                    <div className="flex flex-col w-full h-full items-start">

                        <div className="flex flex-row">
                            <Image src={results.cover!} width={300} height={550} alt={results.name} className="ml-5 mt-5 rounded-[5px]"></Image>

                            <div className="w-full pr-5 ml-2 flex flex-col h-full">
                                <p className="mt-5 text-xl">{results.name}</p>
                                <p className="text-lg">{results.subname}</p>

                                <div className="mt-1 flex flex-col flex-1">
                                    <p className="text-lg text-justify h-[35%]">{results.description}</p>

                                    <div className="flex-1 grid grid-cols-2 grid-rows-2 items-center justify-items-center gap-1">

                                        {/*----------------------------------------------------------------------------------------------------------------------------------*/}
                                        <div className="bg-black/50 rounded-[10px] row-1 col-1 h-[80%] w-[80%] relative">
                                            <p className="text-lg ml-2 mt-1">Runtime</p>
                                            <p className="text-3xl absolute bottom-0 mb-2 ml-2">
                                                {results.type === 'anime' ? `Episodes: ${results.totalEpisode}` : `${results.runtime}`}
                                            </p>

                                        </div>

                                        {/*----------------------------------------------------------------------------------------------------------------------------------*/}
                                        <div className="bg-black/50 rounded-[10px] row-1 col-2 h-[80%] w-[80%] relative">
                                            <p className="text-lg ml-2 mt-1">Rating</p>
                                            <p className={`text-3xl absolute bottom-0 mb-2 ml-2 ${results.rating && (results.rating > 7.5 ? 'text-[var(--great)]' : results.rating > 5 ? 'text-[var(--medium)]' : 'text-[var(--bad)]') }`}>
                                                {results.rating}
                                            </p>

                                        </div>

                                        {/*----------------------------------------------------------------------------------------------------------------------------------*/}
                                        <div className="bg-black/50 rounded-[10px] row-2 col-1 h-[80%] w-[80%] relative">
                                            <p className="text-lg ml-2 mt-1">Genres</p>
                                            <p className="text-lg absolute mb-2 ml-2">
                                                {results.type === 'anime' ? `${results.genres?.join(', ')}` : `${results.runtime}`}
                                            </p>

                                        </div>

                                        {/*----------------------------------------------------------------------------------------------------------------------------------*/}
                                        <div className="bg-black/50 rounded-[10px] row-2 col-2 h-[80%] w-[80%] relative">
                                            <p className="text-lg ml-2 mt-1">Realease date</p>
                                            <p className="text-lg absolute mb-2 ml-2">
                                                {results.type === 'anime' ? `${results.date}` : `${results.runtime}`}
                                            </p>

                                        </div>

                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="grid grid-cols-[320px_1fr] w-full flex-1 items-center">
                            <div className="flex">
                                <NSFWButton theme={theme} NSFW={NSFW} setNSFW={setNSFW}/>
                            </div>
                        </div>
                    </div>
                </>
            )}

        </div>
    );
}