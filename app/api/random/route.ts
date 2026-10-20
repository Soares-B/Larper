import { NextResponse } from "next/server";
import {
    TenraiRandomAnime,
    TenraiRandomManga,
} from "@/lib/Tenrai";
import RestructureDetails from "@/utils/RestructureDetails";
import Restructure from "@/utils/Restructure";

type FullSearch = [string[], ...any[]];

export async function POST(req: Request) {
    try {
        const { type, NSFW, style } = await req.json();

        const fullSearch: FullSearch = [[]];

        switch (type) {
            case "anime": {
                const response = await TenraiRandomAnime(NSFW);

                const data = await response?.json();

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

                const data = await response?.json();

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
