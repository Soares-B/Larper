import { NextResponse } from "next/server";
import { TenraiAnime, TenraiManga } from "@/lib/Tenrai";
import IGDB from "@/lib/IGDB";
import GoogleBooks from "@/lib/GoogleBooks";
import { TMDBMovie, TMDBSerie } from "@/lib/TMDB";
import Deezer from "@/lib/Deezer";
import Restructure from "@/utils/Restructure";
import RestructureDetails from "@/utils/RestructureDetails";

type fullSearch = [string[], ...any[]];

export async function POST(req: Request){

    try{
        const { query, filters, type } = await req.json();

        let anime, manga, game, book, music, serie, movie = null
        let searchVar, restructure
        let fullSearch: fullSearch = [[]]
        const encodeQuery = encodeURIComponent(query)
        
        if (filters.anime){
            searchVar = await TenraiAnime(encodeQuery)

            if(searchVar){
                anime = await searchVar.json();

                if (type === 'simple'){
                    restructure = Restructure(anime, "anime")
                }else{
                    restructure = RestructureDetails(anime, "anime")
                }
                
                anime = restructure ?? null;
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

                if (type === 'simple'){
                    restructure = Restructure(manga, "manga")
                }else{
                    restructure = RestructureDetails(manga, "manga")
                }
                
                manga = restructure ?? null;
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

                if (type === 'simple'){
                    restructure = Restructure(game, "game")
                }else{
                    restructure = RestructureDetails(game, "game")
                }
                
                game = restructure ?? null;
            }

            if (game !== null){
                fullSearch.push(game)
                fullSearch[0].push('game')
            }
        }

        if (filters.book){
            searchVar = await GoogleBooks(encodeQuery)

            if(searchVar){
                book = await searchVar.json();
                
                if (type === 'simple'){
                    restructure = Restructure(book, "book")
                }else{
                    restructure = RestructureDetails(book, "book")
                }

                book = restructure ?? null;
            }

            if (book !== null){
                fullSearch.push(book)
                fullSearch[0].push('book')
            }
        }

        if (filters.serie){
            searchVar = await TMDBSerie(encodeQuery)

            if(searchVar){
                serie = await searchVar.json();
                
                if (type === 'simple'){
                    restructure = Restructure(serie, "serie")
                }else{
                    restructure = RestructureDetails(serie, "serie")
                }

                serie = restructure ?? null;
            }

            if (serie !== null){
                fullSearch.push(serie)
                fullSearch[0].push('serie')
            }
        }

        if (filters.movie){
            searchVar = await TMDBMovie(encodeQuery)

            if(searchVar){
                movie = await searchVar.json();

                if (type === 'simple'){
                    restructure = Restructure(movie, "movie")
                }else{
                    restructure = RestructureDetails(movie, "movie")
                }

                movie = restructure ?? null;
            }

            if (movie !== null){
                fullSearch.push(movie)
                fullSearch[0].push('movie')
            }
        }

        if (filters.music){
           searchVar = await Deezer(encodeQuery)

            if(searchVar){
                music = await searchVar.json();

                if (type === 'simple'){
                    restructure = Restructure(music, "music")
                }else{
                    restructure = RestructureDetails(music, "music")
                }

                music = restructure ?? null;
            }

            if (music !== null){

                fullSearch.push(music)
                fullSearch[0].push('music')
            }
        }

        return NextResponse.json(fullSearch)
    } catch(err){
        console.log(err)
        return NextResponse.json({
            message: `Error! ${err}`
        }, {status: 500})
    } 
}