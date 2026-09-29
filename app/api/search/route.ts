import { NextResponse } from "next/server";
import { TenraiAnime, TenraiManga } from "@/lib/Tenrai";
import IGDB from "@/lib/IGDB";
import GoogleBooks from "@/lib/GoogleBooks";
import { TMDBMovie, TMDBSerie } from "@/lib/TMDB";
import Deezer from "@/lib/Deezer";
import Restructure from "@/utils/Restructure";
import RestructureDetails from "@/utils/RestructureDetails";

type FullSearch = [string[], ...any[]];

export async function POST(req: Request) {
    try {
        const { query, filters, type } = await req.json();

        let anime = null;
        let manga = null;
        let game = null;
        let book = null;
        let music = null;
        let serie = null;
        let movie = null;

        let searchVar;
        let restructure;

        const fullSearch: FullSearch = [[]];

        const encodeQuery = encodeURIComponent(query);

        /*
         * ANIME
         */
        if (filters.anime) {
            const response = await TenraiAnime(query);

            if (response) {
                const data = await response.json();

                if (type === "simple") {
                    restructure = Restructure(data, "anime");
                } else {
                    restructure = RestructureDetails(data, "anime");
                }

                anime = restructure ?? null;
            }

            if (anime) {
                fullSearch.push(anime);
                fullSearch[0].push("anime");
            }
        }

        /*
         * MANGA
         */
        if (filters.manga) {
            const response = await TenraiManga(query);

            if (response) {
                const data = await response.json();

                if (type === "simple") {
                    restructure = Restructure(data, "manga");
                } else {
                    restructure = RestructureDetails(data, "manga");
                }

                manga = restructure ?? null;
            }

            if (manga) {
                fullSearch.push(manga);
                fullSearch[0].push("manga");
            }
        }

        /*
         * GAME
         */
        if (filters.game) {
            searchVar = await IGDB(encodeQuery);

            if (searchVar) {
                game = await searchVar.json();

                if (type === "simple") {
                    restructure = Restructure(game, "game");
                } else {
                    restructure = RestructureDetails(game, "game");
                }

                game = restructure ?? null;
            }

            if (game) {
                fullSearch.push(game);
                fullSearch[0].push("game");
            }
        }

        /*
         * BOOK
         */
        if (filters.book) {
            searchVar = await GoogleBooks(encodeQuery);

            if (searchVar) {
                book = await searchVar.json();

                if (type === "simple") {
                    restructure = Restructure(book, "book");
                } else {
                    restructure = RestructureDetails(book, "book");
                }

                book = restructure ?? null;
            }

            if (book) {
                fullSearch.push(book);
                fullSearch[0].push("book");
            }
        }

        /*
         * SERIE
         */
        if (filters.serie) {
            searchVar = await TMDBSerie(encodeQuery);

            if (searchVar) {
                serie = await searchVar.json();

                if (type === "simple") {
                    restructure = Restructure(serie, "serie");
                } else {
                    restructure = RestructureDetails(serie, "serie");
                }

                serie = restructure ?? null;
            }

            if (serie) {
                fullSearch.push(serie);
                fullSearch[0].push("serie");
            }
        }

        /*
         * MOVIE
         */
        if (filters.movie) {
            searchVar = await TMDBMovie(encodeQuery);

            if (searchVar) {
                movie = await searchVar.json();

                if (type === "simple") {
                    restructure = Restructure(movie, "movie");
                } else {
                    restructure = RestructureDetails(movie, "movie");
                }

                movie = restructure ?? null;
            }

            if (movie) {
                fullSearch.push(movie);
                fullSearch[0].push("movie");
            }
        }

        /*
         * MUSIC
         */
        if (filters.music) {
            searchVar = await Deezer(encodeQuery);

            if (searchVar) {
                music = await searchVar.json();

                if (type === "simple") {
                    restructure = Restructure(music, "music");
                } else {
                    restructure = RestructureDetails(music, "music");
                }

                music = restructure ?? null;
            }

            if (music) {
                fullSearch.push(music);
                fullSearch[0].push("music");
            }
        }

        return NextResponse.json(fullSearch);
    } catch (err) {
        console.log(err);

        return NextResponse.json(
            {
                message: `Error! ${err}`,
            },
            {
                status: 500,
            }
        );
    }
}
