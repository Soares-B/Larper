import { NextResponse } from "next/server";
import { TenraiAnime, TenraiManga } from "@/lib/Tenrai";
import IGDB from "@/lib/IGDB";
import Steam from "@/lib/Steam";
import GoogleBooks from "@/lib/GoogleBooks";
import { TMDBMovie, TMDBSerie } from "@/lib/TMDB";
import Deezer from "@/lib/Deezer";
import Restructure from "@/utils/Restructure";
import RestructureDetails from "@/utils/RestructureDetails";
import { isRateLimited } from "@/lib/rateLimit";

type FullSearch = [string[], ...any[]];

const allowedFilters = ["anime", "manga", "game", "book", "serie", "movie", "music"] as const;
function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}

export async function POST(req: Request) {
    try {
        const body: unknown = await req.json();
        if (!isRecord(body)) {
            return NextResponse.json({ message: "Corpo da pesquisa inválido." }, { status: 400 });
        }

        const { query, filters, type } = body;
        if (typeof query !== "string" || !query.trim() || query.trim().length > 100) {
            return NextResponse.json({ message: "A pesquisa deve ter entre 1 e 100 caracteres." }, { status: 400 });
        }
        if (!isRecord(filters)
            || Object.keys(filters).length === 0
            || Object.keys(filters).some(key => !allowedFilters.includes(key as typeof allowedFilters[number]) || typeof filters[key] !== "boolean")
            || !Object.values(filters).some(value => value === true)) {
            return NextResponse.json({ message: "Filtros da pesquisa inválidos." }, { status: 400 });
        }
        if (type !== "simple" && type !== "detailed") {
            return NextResponse.json({ message: "Tipo de pesquisa inválido." }, { status: 400 });
        }
        if (isRateLimited(req, "search", 30)) {
            return NextResponse.json({ message: "Muitas pesquisas. Tente novamente em um minuto." }, {
                status: 429,
                headers: { "Retry-After": "60" },
            });
        }

        const normalizedQuery = query.trim();

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

        /*
         * ANIME
         */
        if (filters.anime) {
            searchVar = await TenraiAnime(normalizedQuery);

            if (searchVar) {
                const data = await searchVar.json();

                if (searchVar.status === 200){
                    if (type === "simple") {
                        restructure = Restructure(data, "anime", 'simple');
                    } else {
                        restructure = RestructureDetails(data, "anime");
                    }
                }else{
                    restructure = null
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
            searchVar = await TenraiManga(normalizedQuery);

            if (searchVar) {
                const data = await searchVar.json();

                if (searchVar.status === 200){
                    if (type === "simple") {
                        restructure = Restructure(data, "manga", 'simple');
                    } else {
                        restructure = RestructureDetails(data, "manga");
                    }
                }else{
                    restructure = null
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
            searchVar = await IGDB(normalizedQuery);

            if (!searchVar?.ok){
                searchVar = await Steam(normalizedQuery)
            }

            if (searchVar) {
                game = await searchVar.json();

                if (searchVar.status === 200){
                    if (type === "simple") {
                        restructure = Restructure(game, "game", 'simple');
                    } else {
                        restructure = RestructureDetails(game, "game");
                    }
                }else{
                    restructure = null
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
            searchVar = await GoogleBooks(normalizedQuery);

            if (searchVar) {
                book = await searchVar.json();

                if (searchVar.status === 200){
                    if (type === "simple") {
                        restructure = Restructure(book, "book", 'simple');
                    } else {
                        restructure = RestructureDetails(book, "book");
                    }
                }else{
                    restructure = null
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
            searchVar = await TMDBSerie(normalizedQuery);

            if (searchVar) {
                serie = await searchVar.json();

                if (searchVar.status === 200){
                    if (type === "simple") {
                    restructure = Restructure(serie, "serie", 'simple');
                } else {
                    restructure = RestructureDetails(serie, "serie");
                }
                }else{
                    restructure = null
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
            searchVar = await TMDBMovie(normalizedQuery);

            if (searchVar) {
                movie = await searchVar.json();

                if (searchVar.status === 200){
                    if (type === "simple") {
                        restructure = Restructure(movie, "movie", 'simple');
                    } else {
                        restructure = RestructureDetails(movie, "movie");
                    }
                }else{
                    restructure = null
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
            searchVar = await Deezer(normalizedQuery);

            if (searchVar) {
                music = await searchVar.json();

                if (searchVar.status === 200){
                    if (type === "simple") {
                        restructure = Restructure(music, "music", 'simple');
                    } else {
                        restructure = RestructureDetails(music, "music");
                    }
                }else{
                    restructure = null
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
        console.error("Search request failed:", err);

        if (err instanceof SyntaxError) {
            return NextResponse.json({ message: "O corpo da pesquisa não contém JSON válido." }, { status: 400 });
        }

        return NextResponse.json(
            {
                message: "Não foi possível concluir a pesquisa no momento.",
            },
            {
                status: 500,
            }
        );
    }
}
