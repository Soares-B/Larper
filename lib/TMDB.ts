import { readJsonResponse } from "@/lib/readJsonResponse";
import { NextResponse } from "next/server";
const Key = process.env.TMDB_Token;


export async function TMDBMovie(query: string){
    try{
        const urlPrincipal = new URL('https://api.themoviedb.org/3/search/movie');
        urlPrincipal.searchParams.set('query', query);
        const urlDetails = 'https://api.themoviedb.org/3/movie/'
        const options = {
            method: 'GET',
            headers: {accept: 'application/json', Authorization: `Bearer ${Key}`}
        };

        const response = await fetch(urlPrincipal, options);
        const data = await readJsonResponse(response);
        const info = data.results?.[0];

        if (!info) {
            return null;
        }

        const responseDetails = await fetch(urlDetails + info.id, options);
        const dataDetails = await readJsonResponse(responseDetails);

        const responseReview = await fetch(urlDetails + info.id + '/reviews', options);
        const dataReviews = await readJsonResponse(responseReview);
        const infoReview = dataReviews.results?.[0] ?? null;

        const responseRecommendations = await fetch(urlDetails + info.id + '/recommendations', options)
        const dataRecommendations = await readJsonResponse(responseRecommendations);

        const infoRecommendations = dataRecommendations.results?.slice(0, 3) ?? [];

        const responseKeywords = await fetch(urlDetails + info.id + '/keywords', options)
        const dataKeywords = await readJsonResponse(responseKeywords);
        const infoKeywords = dataKeywords.keywords?.slice(0, 5) ?? [];

        const responseSimilar = await fetch(urlDetails + info.id + '/similar', options)
        const dataSimilar = await readJsonResponse(responseSimilar);
        const infoSimilar = dataSimilar.results?.slice(0, 3) ?? [];

        return NextResponse.json({
            info,
            dataDetails,
            infoReview,
            infoRecommendations,
            infoKeywords,
            infoSimilar
        })

    }catch(err){
        console.log(err)
        return NextResponse.json({
            message: `Erro! ${err}`
        }, {status: 500})
    }
}

export async function TMDBSerie(query: string){
    try{
        const urlPrincipal = new URL('https://api.themoviedb.org/3/search/tv');
        urlPrincipal.searchParams.set('query', query);
        const urlDetails = 'https://api.themoviedb.org/3/tv/';
        const options = {
            method: 'GET',
            headers: {accept: 'application/json', Authorization: `Bearer ${Key}`}
        };
        
        const response = await fetch(urlPrincipal, options);
        const data = await readJsonResponse(response);
        const info = data.results?.[0];

        if (!info) {
            return null;
        }

        const responseDetails = await fetch(urlDetails + info.id, options);
        const dataDetails = await readJsonResponse(responseDetails);

        const responseReview = await fetch(urlDetails + info.id + '/reviews', options);
        const dataReviews = await readJsonResponse(responseReview);
        const infoReview = dataReviews.results?.[0] ?? null;

        const responseRecommendations = await fetch(urlDetails + info.id + '/recommendations', options)
        const dataRecommendations = await readJsonResponse(responseRecommendations);

        const infoRecommendations = dataRecommendations.results?.slice(0, 3) ?? [];

        const responseKeywords = await fetch(urlDetails + info.id + '/keywords', options)
        const dataKeywords = await readJsonResponse(responseKeywords);
        const infoKeywords = dataKeywords.results?.slice(0, 5) ?? [];

        const responseSimilar = await fetch(urlDetails + info.id + '/similar', options)
        const dataSimilar = await readJsonResponse(responseSimilar);
        const infoSimilar = dataSimilar.results?.slice(0, 3) ?? [];

        return NextResponse.json({
            info,
            dataDetails,
            infoReview,
            infoRecommendations,
            infoKeywords,
            infoSimilar
        })

    }catch(err){
        console.log(err)
        return NextResponse.json({message: `Erro! ${err}`}, {status: 500})
    }
    

}
