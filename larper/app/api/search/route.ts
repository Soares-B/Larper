import { NextResponse } from "next/server";
import { TenraiAnime, TenraiManga } from "@/lib/Tenrai";
import Restructure from "@/utils/restructure";

type fullSearch = [string[], ...any[]];

export async function POST(req: Request){

    try{
        const { query } = await req.json();

        let anime, manga, game, book, music, serie, movie = null
        let searchVar, restructure
        let fullSearch: fullSearch = [[]]
        
        searchVar = await TenraiAnime(query)

        if(searchVar){
            anime = await searchVar.json();
            restructure = Restructure(anime, "anime")
            anime = await restructure?.json() ?? null;
        }

        searchVar = await TenraiManga(query)

        if(searchVar){
            manga = await searchVar.json();
            restructure = Restructure(manga, "manga")
            manga = await restructure?.json() ?? null;
        }

        if (anime !== null){
            fullSearch.push(anime)
            fullSearch[0].push('anime')
        }
        if (manga !== null){
            fullSearch.push(manga)
            fullSearch[0].push('manga')
        }

        return NextResponse.json(fullSearch)
    } catch(err){
        console.log(err)
        return NextResponse.json({
            message: `Error! ${err}`
        }, {status: 500})
    } 
}