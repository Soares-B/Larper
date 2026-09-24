import { NextResponse } from "next/server";
import { TenraiAnime, TenraiManga } from "@/lib/Tenrai";
import IGDB from "@/lib/IGDB";
import GoogleBooks from "@/lib/GoogleBooks";
import { TMDBMovie, TMDBSerie } from "@/lib/TMDB";
import Deezer from "@/lib/Deezer";

export async function POST(req: Request) {
  try {
    const { query } = await req.json();

    const encodeQuery = encodeURIComponent(query);

    const [
      animeResponse,
      mangaResponse,
      gameResponse,
      bookResponse,
      serieResponse,
      movieResponse,
      musicResponse,
    ] = await Promise.all([
      TenraiAnime(encodeQuery),
      TenraiManga(encodeQuery),
      IGDB(encodeQuery),
      GoogleBooks(encodeQuery),
      TMDBSerie(encodeQuery),
      TMDBMovie(encodeQuery),
      Deezer(encodeQuery),
    ]);

    const suggestions = [];

    if (animeResponse) {
      const anime = await animeResponse.json();

      suggestions.push({
        name: anime.info.title,
        type: "anime",
      });
    }

    if (mangaResponse) {
      const manga = await mangaResponse.json();

      suggestions.push({
        name: manga.info.title,
        type: "manga",
      });
    }

    if (gameResponse) {
      const game = await gameResponse.json();

      suggestions.push({
        name: game.info.name,
        type: "game",
      });
    }

    if (bookResponse) {
      const book = await bookResponse.json();

      suggestions.push({
        name: book.info.title,
        type: "book",
      });
    }

    if (serieResponse) {
      const serie = await serieResponse.json();

      suggestions.push({
        name: serie.info.name,
        type: "serie",
      });
    }

    if (movieResponse) {
      const movie = await movieResponse.json();

      suggestions.push({
        name: movie.info.title,
        type: "movie",
      });
    }

    if (musicResponse) {
      const music = await musicResponse.json();

      suggestions.push({
        name: music.info.title,
        type: "music",
      });
    }

    return NextResponse.json({ suggestions });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        message: `Error! ${err}`,
      },
      { status: 500 }
    );
  }
}
