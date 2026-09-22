import { NextResponse } from "next/server";
const Key = process.env.TMDB_Token;


export async function TMDBMovie(query: string){
    try{
        const urlPrincipal = 'https://api.themoviedb.org/3/search/movie?query=';
        const urlDetails = 'https://api.themoviedb.org/3/movie/'
        const options = {
            method: 'GET',
            headers: {accept: 'application/json', Authorization: `Bearer ${Key}`}
        };

        const response = await fetch(urlPrincipal + query, options);
        const data = await response.json();
        const info = data.results[0];

        if (!info) {
            return null;
        }

        const responseDetails = await fetch(urlDetails + info.id, options);
        const dataDetails = await responseDetails.json();

        const responseReview = await fetch(urlDetails + info.id + '/reviews', options);
        const dataReviews = await responseReview.json();
        const infoReview = dataReviews.results[0];

        return NextResponse.json({info, dataDetails, infoReview})

    }catch(err){
        console.log(err)
        return NextResponse.json({
            message: `Erro! ${err}`
        }, {status: 500})
    }
}