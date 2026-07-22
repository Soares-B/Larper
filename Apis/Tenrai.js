async function searchAnime(query){
    const url = 'https://api.tenrai.org/v1/anime'

    const response = await fetch(url + '?q=' + query);

    const data = await response.json();

    const info = data.data[0]

    if (!info){
        return null;
    }

    const responseReview = await fetch(url + '/' + info.mal_id + '/reviews');

    const dataReview = await responseReview.json();
    const infoReview = dataReview.data?.[0] ?? null;

    return {
        info,
        infoReview
    }
}

async function searchManga(query){
    const url = 'https://api.tenrai.org/v1/manga'

    const response = await fetch(url + '?q=' + query);

    const data = await response.json();

    const info = data.data[0]

    if (!info){
        return null;
    }

    const responseReview = await fetch(url + '/' + info.mal_id + '/reviews');

    const dataReview = await responseReview.json();
    
    const infoReview = dataReview.data?.[0] ?? null;

    return {
        info,
        infoReview
    }
}

export {
    searchAnime,
    searchManga
}