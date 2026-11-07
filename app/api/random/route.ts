import { NextResponse } from "next/server";
import {
    TenraiRandomAnime,
    TenraiRandomManga,
} from "@/lib/Tenrai";
import RestructureDetails from "@/utils/RestructureDetails";
import Restructure from "@/utils/Restructure";
import { isRateLimited } from "@/lib/rateLimit";

type FullSearch = [string[], ...object[]];

export async function POST(req: Request) {
    try {
        const body: unknown = await req.json();
        if (typeof body !== "object" || body === null || Array.isArray(body)) {
            return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
        }
        const { type, NSFW, style } = body as Record<string, unknown>;
        if ((type !== "anime" && type !== "manga") || typeof NSFW !== "boolean"
            || (style !== "simple" && style !== "detailed")) {
            return NextResponse.json({ message: "Invalid random item parameters." }, { status: 400 });
        }
        if (isRateLimited(req, "random", 10)) {
            return NextResponse.json({ message: "Too many requests. Try again in one minute." }, {
                status: 429,
                headers: { "Retry-After": "60" },
            });
        }

        const fullSearch: FullSearch = [[]];

        switch (type) {
            case "anime": {
                const response = await TenraiRandomAnime(NSFW);
                if (!response?.ok) {
                    return NextResponse.json({ message: "Unable to load a random anime." }, { status: 502 });
                }

                const data = await response.json();

                if (style === 'simple'){
                    const restructure = Restructure(
                        data,
                        "anime",
                        'simple'
                    );

                    if (restructure) {
                        fullSearch.push(restructure);
                        fullSearch[0].push("anime");
                    }
                }else{
                    const restructure = RestructureDetails(
                        data,
                        "anime"
                    );

                    if (restructure) {
                        fullSearch.push(restructure);
                        fullSearch[0].push("anime");
                    }
    
                }
        
                return NextResponse.json(
                    {
                        fullSearch,
                    },
                    {
                        headers: {
                            "Cache-Control":
                                "no-store, no-cache, must-revalidate, proxy-revalidate",
                            Pragma: "no-cache",
                            Expires: "0",
                        },
                    }
                );
            }

            case "manga": {
                const response = await TenraiRandomManga(NSFW);
                if (!response?.ok) {
                    return NextResponse.json({ message: "Unable to load a random manga." }, { status: 502 });
                }

                const data = await response.json();

                if (style === 'simple'){
                    const restructure = Restructure(
                        data,
                        "manga",
                        'simple'
                    );

                    if (restructure) {
                        fullSearch.push(restructure);
                        fullSearch[0].push("manga");
                    }
                }else{
                    const restructure = RestructureDetails(
                        data,
                        "manga"
                    );

                    if (restructure) {
                        fullSearch.push(restructure);
                        fullSearch[0].push("manga");
                    }
                }

                return NextResponse.json(
                    {
                        fullSearch,
                    },
                    {
                        headers: {
                            "Cache-Control":
                                "no-store, no-cache, must-revalidate, proxy-revalidate",
                            Pragma: "no-cache",
                            Expires: "0",
                        },
                    }
                );
            }
        }
    } catch (err) {
        console.error("Random media request failed:", err);

        if (err instanceof SyntaxError) {
            return NextResponse.json({ message: "Request body is not valid JSON." }, { status: 400 });
        }

        return NextResponse.json(
            {
                message: "Unable to load a random item right now.",
            },
            {
                status: 500,
            }
        );
    }
}
