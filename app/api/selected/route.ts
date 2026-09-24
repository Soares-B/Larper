import { NextResponse } from "next/server";
import Restructure from "@/utils/Restructure";

import { TenraiAnime, TenraiManga } from "@/lib/Tenrai";
import IGDB from "@/lib/IGDB";
import GoogleBooks from "@/lib/GoogleBooks";
import { TMDBMovie, TMDBSerie } from "@/lib/TMDB";
import Deezer from "@/lib/Deezer";

type fullSearch = [string[], ...any[]];

export async function POST(req: Request){

    try{
        const { name, type } = await req.json();

        let searchVar, restructure, media
        let fullSearch: fullSearch = [[]]
        const encodeQuery = encodeURIComponent(name)

        if (type === 'anime'){
            searchVar = await TenraiAnime(encodeQuery)
            
                if(searchVar){
                    media = await searchVar.json();
                    restructure = Restructure(media, "anime")
                    media = await restructure?.json() ?? null;
                }
    
                if (media !== null){
                    fullSearch.push(media)
                    fullSearch[0].push('anime')
                }

        }else if (type === 'manga'){
            searchVar = await TenraiManga(encodeQuery)
            
                if(searchVar){
                    media = await searchVar.json();
                    restructure = Restructure(media, "manga")
                    media = await restructure?.json() ?? null;
                }
    
                if (media !== null){
                    fullSearch.push(media)
                    fullSearch[0].push('manga')
                }

        }else if (type === 'game'){
            searchVar = await IGDB(encodeQuery)
            
                if(searchVar){
                    media = await searchVar.json();
                    restructure = Restructure(media, "game")
                    media = await restructure?.json() ?? null;
                }
    
                if (media !== null){
                    fullSearch.push(media)
                    fullSearch[0].push('game')
                }

        }else if (type === 'book'){
            searchVar = await GoogleBooks(encodeQuery)
            
                if(searchVar){
                    media = await searchVar.json();
                    restructure = Restructure(media, "book")
                    media = await restructure?.json() ?? null;
                }
    
                if (media !== null){
                    fullSearch.push(media)
                    fullSearch[0].push('book')
                }

        }else if (type === 'serie'){
            searchVar = await TMDBSerie(encodeQuery)
            
                if(searchVar){
                    media = await searchVar.json();
                    restructure = Restructure(media, "serie")
                    media = await restructure?.json() ?? null;
                }
    
                if (media !== null){
                    fullSearch.push(media)
                    fullSearch[0].push('serie')
                }

        }else if (type === 'movie'){
            searchVar = await TMDBMovie(encodeQuery)
            
                if(searchVar){
                    media = await searchVar.json();
                    restructure = Restructure(media, "movie")
                    media = await restructure?.json() ?? null;
                }
    
                if (media !== null){
                    fullSearch.push(media)
                    fullSearch[0].push('movie')
                }


        }else if (type === 'music'){
            searchVar = await Deezer(encodeQuery)
            
                if(searchVar){
                    media = await searchVar.json();
                    restructure = Restructure(media, "music")
                    media = await restructure?.json() ?? null;
                }
    
                if (media !== null){
                    fullSearch.push(media)
                    fullSearch[0].push('music')
                }

        }

        return NextResponse.json({fullSearch})

    }catch(err){
        console.log(err)
        return NextResponse.json({
            message: `Error! ${err}`
        }, {status: 500})
    } 
}