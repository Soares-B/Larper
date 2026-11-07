import { NextResponse } from "next/server";

export default async function Deezer(query:string){
    try{
        const url = new URL('https://api.deezer.com/search');
        url.searchParams.set('q', query);

        const response = await fetch(url);
        if (!response.ok) throw new Error("Deezer search request failed");
        const data = await response.json();
        const info = data.data?.[0]

        if (!info){
            return null;
        }

        return NextResponse.json({info})
    }catch(err){
            console.log(err)
            return NextResponse.json({
                message: `Erro! ${err}`
            }, {status: 500})
    }
}
