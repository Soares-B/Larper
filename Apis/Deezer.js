async function searchMusic(query){
    const url = 'https://api.deezer.com/search?q=';

    const response = await fetch(url + query);
    const data = await response.json();
    const info = data.data[0]

    if (!info){
        return null;
    }

    return info
}

export {
    searchMusic
}