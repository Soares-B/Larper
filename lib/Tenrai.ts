import { NextResponse } from "next/server";

const animeUrl = "https://api.tenrai.org/v1/anime";
const mangaUrl = "https://api.tenrai.org/v1/manga";

type authors = {
    name: string | null,
    url: string | null,
}[]

export async function TenraiAnime(query: string) {
    try {
        const response = await fetch(
            `${animeUrl}?q=${encodeURIComponent(query)}`,
            {
                cache: "no-store",
            }
        );

        const data = await response.json();
        const info = data.data?.[0];

        if (!info) {
            return null;
        }

        const responseReview = await fetch(
            `${animeUrl}/${info.mal_id}/reviews`,
            {
                cache: "no-store",
            }
        );

        const dataReview = await responseReview.json();
        const infoReview = dataReview.data?.[0] ?? null;

        const responseFull = await fetch(
            `${animeUrl}/${info.mal_id}/full`,
            {
                cache: "no-store",
            }
        );

        const dataFull = await responseFull.json();
        const infoFull = dataFull.data ?? null;

        const responseRecoms = await fetch(
            `${animeUrl}/${info.mal_id}/recommendations`,
            {
                cache: "no-store",
            }
        );

        const dataRecoms = await responseRecoms.json();
        const infoRecoms = dataRecoms.data?.slice(0, 3) ?? [];

        return NextResponse.json({
            info,
            infoReview,
            infoFull,
            infoRecoms,
        });
    } catch (err) {
        console.log(err);

        return NextResponse.json(
            {
                message: `Erro! ${err}`,
            },
            {
                status: 500,
            }
        );
    }
}

export async function TenraiManga(query: string) {
    try {
        const response = await fetch(
            `${mangaUrl}?q=${encodeURIComponent(query)}`,
            {
                cache: "no-store",
            }
        );

        const data = await response.json();
        const info = data.data?.[0];

        if (!info) {
            return null;
        }

        const responseReview = await fetch(
            `${mangaUrl}/${info.mal_id}/reviews`,
            {
                cache: "no-store",
            }
        );

        const dataReview = await responseReview.json();
        const infoReview = dataReview.data?.[0] ?? null;

        const responseFull = await fetch(
            `${mangaUrl}/${info.mal_id}/full`,
            {
                cache: "no-store",
            }
        );

        const dataFull = await responseFull.json();
        const infoFull = dataFull.data ?? null;

        const authors = Author(infoFull.authors)

        infoFull.authors = authors

        const responseRecoms = await fetch(
            `${mangaUrl}/${info.mal_id}/recommendations`,
            {
                cache: "no-store",
            }
        );

        const dataRecoms = await responseRecoms.json();
        const infoRecoms = dataRecoms.data?.slice(0, 3) ?? [];

        return NextResponse.json({
            info,
            infoReview,
            infoFull,
            infoRecoms,
        });
    } catch (err) {
        console.log(err);

        return NextResponse.json(
            {
                message: `Erro! ${err}`,
            },
            {
                status: 500,
            }
        );
    }
}

export async function TenraiRandomAnime(NSFW: boolean) {
    try {
        const response = await fetch(
            `https://api.tenrai.org/v1/random/anime${NSFW ? '' : '?sfw-strict='}`,
            {
                cache: "no-store",
            }
        );

        const data = await response.json();
        const info = data.data;

        const responseReview = await fetch(
            `${animeUrl}/${info.mal_id}/reviews`,
            {
                cache: "no-store",
            }
        );

        const dataReview = await responseReview.json();
        const infoReview = dataReview.data?.[0] ?? null;

        const responseFull = await fetch(
            `${animeUrl}/${info.mal_id}/full`,
            {
                cache: "no-store",
            }
        );

        const dataFull = await responseFull.json();
        const infoFull = dataFull.data ?? null;

        const responseRecoms = await fetch(
            `${animeUrl}/${info.mal_id}/recommendations`,
            {
                cache: "no-store",
            }
        );

        const dataRecoms = await responseRecoms.json();
        const infoRecoms = dataRecoms.data?.slice(0, 3) ?? [];

        return NextResponse.json({
            info,
            infoReview,
            infoFull,
            infoRecoms,
        });
    } catch (err) {
        console.log(err);

        return NextResponse.json(
            {
                message: `Erro! ${err}`,
            },
            {
                status: 500,
            }
        );
    }
}

export async function TenraiRandomManga(NSFW: boolean) {
    try {
        const response = await fetch(
            `https://api.tenrai.org/v1/random/manga${NSFW ? '' : '?sfw-strict='}`,
            {
                cache: "no-store",
            }
        );

        const data = await response.json();
        const info = data.data;

        const responseReview = await fetch(
            `${mangaUrl}/${info.mal_id}/reviews`,
            {
                cache: "no-store",
            }
        );

        const dataReview = await responseReview.json();
        const infoReview = dataReview.data?.[0] ?? null;

        const responseFull = await fetch(
            `${mangaUrl}/${info.mal_id}/full`,
            {
                cache: "no-store",
            }
        );

        const dataFull = await responseFull.json();
        const infoFull = dataFull.data ?? null;

        const authors = Author(infoFull.authors)

        infoFull.authors = authors

        const responseRecoms = await fetch(
            `${mangaUrl}/${info.mal_id}/recommendations`,
            {
                cache: "no-store",
            }
        );

        const dataRecoms = await responseRecoms.json();
        const infoRecoms = dataRecoms.data?.slice(0, 3) ?? [];

        return NextResponse.json({
            info,
            infoReview,
            infoFull,
            infoRecoms,
        });
    } catch (err) {
        console.log(err);

        return NextResponse.json(
            {
                message: `Erro! ${err}`,
            },
            {
                status: 500,
            }
        );
    }
}

function Author(arr: authors){
    const estructuredArr = arr.map(a => ({ name: a.name?.replace(',', ''), link: a.url}))

    return estructuredArr

}