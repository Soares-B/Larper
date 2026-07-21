async function searchBook(query){
    const url =  'https://openlibrary.org/search.json?q='

    const response = await fetch (url + query);
    const data = await response.json();
    const info = data.docs[0]
    return info
}

export {
    searchBook
}