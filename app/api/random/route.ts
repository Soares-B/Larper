import { NextResponse } from "next/server";
import {
    TenraiRandomAnime,
    TenraiRandomManga,
} from "@/lib/Tenrai";
import RestructureDetails from "@/utils/RestructureDetails";

type FullSearch = [string[], ...any[]];

export async function POST(req: Request) {
    try {
        const { type } = await req.json();

        const fullSearch: FullSearch = [[]];

        switch (type) {
            case "anime": {
                const response = await TenraiRandomAnime();

                const data = await response?.json();

                const restructure = RestructureDetails(
                    data,
                    "anime"
                );

                if (restructure) {
                    fullSearch.push(restructure);
                    fullSearch[0].push("anime");
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
                const response = await TenraiRandomManga();

                const data = await response?.json();

                const restructure = RestructureDetails(
                    data,
                    "manga"
                );

                if (restructure) {
                    fullSearch.push(restructure);
                    fullSearch[0].push("manga");
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
