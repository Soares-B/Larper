import { NextResponse } from "next/server";
import { TenraiAnime, TenraiManga } from "@/lib/Tenrai";
import IGDB from "@/lib/IGDB";
import { TMDBMovie } from "@/lib/TMDB";
import Restructure from "@/utils/Restructure";

type fullSearch = [string[], ...any[]];

export async function POST(req: Request){

    try{
        const { query, filters } = await req.json();

        let anime, manga, game, book, music, serie, movie = null
        let searchVar, restructure
        let fullSearch: fullSearch = [[]]
        const encodeQuery = encodeURIComponent(query)
        
        if (filters.anime){
            searchVar = await TenraiAnime(encodeQuery)

            if(searchVar){
                anime = await searchVar.json();
                restructure = Restructure(anime, "anime")
                anime = await restructure?.json() ?? null;
            }

            if (anime !== null){
                fullSearch.push(anime)
                fullSearch[0].push('anime')
            }
        }
        
        if (filters.manga){
            searchVar = await TenraiManga(encodeQuery)

            if(searchVar){
                manga = await searchVar.json();
                restructure = Restructure(manga, "manga")
                manga = await restructure?.json() ?? null;
            }

            if (manga !== null){
                fullSearch.push(manga)
                fullSearch[0].push('manga')
            }
        }

        if (filters.game){
            searchVar = await IGDB(encodeQuery)

            if(searchVar){
                game = await searchVar.json();
                restructure = Restructure(game, "game")
                game = await restructure?.json() ?? null;
            }

            if (game !== null){
                fullSearch.push(game)
                fullSearch[0].push('game')
            }
        }

        if (filters.book){
            //nothing
        }

        if (filters.serie){
            //nothing
        }

        if (filters.movie){
            searchVar = await TMDBMovie(encodeQuery)

            if(searchVar){
                movie = await searchVar.json();

                console.log(movie)
                restructure = Restructure(movie, "movie")
                movie = await restructure?.json() ?? null;
            }

            if (movie !== null){
                fullSearch.push(movie)
                fullSearch[0].push('movie')
            }
        }

        if (filters.music){
            //nothing
        }

        return NextResponse.json(fullSearch)
    } catch(err){
        console.log(err)
        return NextResponse.json({
            message: `Error! ${err}`
        }, {status: 500})
    } 
}