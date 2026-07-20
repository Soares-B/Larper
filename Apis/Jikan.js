async function searchAnime(query){
    const url = 'https://api.jikan.moe/v4/anime?q=Naruto'

    const response = await fetch(url + query);

    if (response.status !== '200'){
        return {
            errorMessage: 'Oops! It looks like it occurred a error! D:',
            status: response.status
        }
    }

    const data = await response.json();

    return data
}

module.exports = {
    searchAnime
}