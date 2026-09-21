import { NextResponse } from "next/server";


export async function TenraiAnime(query: string){
    try{
        const url = 'https://api.tenrai.org/v1/anime';

        const response = await fetch(url + '?q=' + query);

        const data = await response.json();

        const info = data.data[0]

        if (!info){
            return null;
        }
        
        const responseReview = await fetch(url + '/' + info.mal_id + '/reviews');

        const dataReview = await responseReview.json();
        const infoReview = dataReview.data?.[0] ?? null;

        return NextResponse.json({info, infoReview})
    } catch(err){
        console.log(err)
    }
}

export async function TenraiManga(query: string){
    try{
        const url = 'https://api.tenrai.org/v1/manga';

        const response = await fetch(url + '?q=' + query);

        const data = await response.json();

        const info = data.data[0]

        if (!info){
            return null;
        }
        
        const responseReview = await fetch(url + '/' + info.mal_id + '/reviews');

        const dataReview = await responseReview.json();
        const infoReview = dataReview.data?.[0] ?? null;

        return NextResponse.json({info, infoReview})
    } catch(err){
        console.log(err)
    }
}