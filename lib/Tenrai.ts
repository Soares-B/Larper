import { readJsonResponse } from "@/lib/readJsonResponse";
import { NextResponse } from "next/server";

const animeUrl = "https://api.tenrai.org/v1/anime";
const mangaUrl = "https://api.tenrai.org/v1/manga";

const tenraiRequestIntervalMs = 300;

type TenraiRequestState = typeof globalThis & {
    __larperTenraiQueue?: Promise<void>;
    __larperTenraiLastRequestAt?: number;
};

async function fetchTenrai(input: string, init: RequestInit) {
    const state = globalThis as TenraiRequestState;
    const previousRequest = state.__larperTenraiQueue ?? Promise.resolve();
    let releaseRequest: () => void = () => {};
    state.__larperTenraiQueue = new Promise<void>(resolve => {
        releaseRequest = resolve;
    });

    await previousRequest;

    const elapsed = Date.now() - (state.__larperTenraiLastRequestAt ?? 0);
    const wait = Math.max(0, tenraiRequestIntervalMs - elapsed);
    if (wait > 0) {
        await new Promise(resolve => setTimeout(resolve, wait));
    }

    state.__larperTenraiLastRequestAt = Date.now();
    releaseRequest();

    return fetch(input, init);
}

type authors = {
    name: string | null,
    url: string | null,
}[]

export async function TenraiAnime(query: string) {
    try {
        const response = await fetchTenrai(
            `${animeUrl}?q=${encodeURIComponent(query)}`,
            {
                cache: "no-store",
            }
        );

        const data = await readJsonResponse(response);
        const info = data.data?.[0];

        if (!info) {
            return null;
        }

        const responseReview = await fetchTenrai(
            `${animeUrl}/${info.mal_id}/reviews`,
            {
                cache: "no-store",
            }
        );

        const dataReview = await readJsonResponse(responseReview);
        const infoReview = dataReview.data?.[0] ?? null;

        const responseFull = await fetchTenrai(
            `${animeUrl}/${info.mal_id}/full`,
            {
                cache: "no-store",
            }
        );

        const dataFull = await readJsonResponse(responseFull);
        const infoFull = dataFull.data ?? null;

        const responseRecoms = await fetchTenrai(
            `${animeUrl}/${info.mal_id}/recommendations`,
            {
                cache: "no-store",
            }
        );

        const dataRecoms = await readJsonResponse(responseRecoms);
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
        const response = await fetchTenrai(
            `${mangaUrl}?q=${encodeURIComponent(query)}`,
            {
                cache: "no-store",
            }
        );

        const data = await readJsonResponse(response);
        const info = data.data?.[0];

        if (!info) {
            return null;
        }

        const responseReview = await fetchTenrai(
            `${mangaUrl}/${info.mal_id}/reviews`,
            {
                cache: "no-store",
            }
        );

        const dataReview = await readJsonResponse(responseReview);
        const infoReview = dataReview.data?.[0] ?? null;

        const responseFull = await fetchTenrai(
            `${mangaUrl}/${info.mal_id}/full`,
            {
                cache: "no-store",
            }
        );

        const dataFull = await readJsonResponse(responseFull);
        const infoFull = dataFull.data ?? null;

        if (infoFull) {
            infoFull.authors = Author(infoFull.authors ?? []);
        }

        const responseRecoms = await fetchTenrai(
            `${mangaUrl}/${info.mal_id}/recommendations`,
            {
                cache: "no-store",
            }
        );

        const dataRecoms = await readJsonResponse(responseRecoms);
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
        const response = await fetchTenrai(
            `https://api.tenrai.org/v1/random/anime${NSFW ? '' : '?sfw-strict='}`,
            {
                cache: "no-store",
            }
        );

        const data = await readJsonResponse(response);
        const info = data.data;
        if (!info?.mal_id) return null;

        const responseReview = await fetchTenrai(
            `${animeUrl}/${info.mal_id}/reviews`,
            {
                cache: "no-store",
            }
        );

        const dataReview = await readJsonResponse(responseReview);
        const infoReview = dataReview.data?.[0] ?? null;

        const responseFull = await fetchTenrai(
            `${animeUrl}/${info.mal_id}/full`,
            {
                cache: "no-store",
            }
        );

        const dataFull = await readJsonResponse(responseFull);
        const infoFull = dataFull.data ?? null;

        const responseRecoms = await fetchTenrai(
            `${animeUrl}/${info.mal_id}/recommendations`,
            {
                cache: "no-store",
            }
        );

        const dataRecoms = await readJsonResponse(responseRecoms);
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
        const response = await fetchTenrai(
            `https://api.tenrai.org/v1/random/manga${NSFW ? '' : '?sfw-strict='}`,
            {
                cache: "no-store",
            }
        );

        const data = await readJsonResponse(response);
        const info = data.data;
        if (!info?.mal_id) return null;

        const responseReview = await fetchTenrai(
            `${mangaUrl}/${info.mal_id}/reviews`,
            {
                cache: "no-store",
            }
        );

        const dataReview = await readJsonResponse(responseReview);
        const infoReview = dataReview.data?.[0] ?? null;

        const responseFull = await fetchTenrai(
            `${mangaUrl}/${info.mal_id}/full`,
            {
                cache: "no-store",
            }
        );

        const dataFull = await readJsonResponse(responseFull);
        const infoFull = dataFull.data ?? null;

        if (infoFull) {
            infoFull.authors = Author(infoFull.authors ?? []);
        }

        const responseRecoms = await fetchTenrai(
            `${mangaUrl}/${info.mal_id}/recommendations`,
            {
                cache: "no-store",
            }
        );

        const dataRecoms = await readJsonResponse(responseRecoms);
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
