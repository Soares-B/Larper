const Key = process.env.TMDB_Token;

async function searchMovies(query){
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
    const infoReviews = dataReviews.results[0];
    

    return {
        info,
        dataDetails,
        infoReviews
    };
}

async function searchSeries(query){
    const urlPrincipal = 'https://api.themoviedb.org/3/search/tv?query=';
    const urlDetails = 'https://api.themoviedb.org/3/tv/';
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
    const infoReviews = dataReviews.results[0];


    return {
        info,
        dataDetails,
        infoReviews
    };
}

module.exports = {
    searchMovies,
    searchSeries
};