const Key = process.env.GoogleBooks_Token;

async function searchBook(query){
    const url =  'https://www.googleapis.com/books/v1/volumes?q='

    const response = await fetch (url + query + '&key=' + Key);
    const data = await response.json();
    let info = data.items.find(book => 'authors' in book.volumeInfo)
    info = info.volumeInfo
    
    if (!info){
        return null;
    }

    return info

    
}

export {
    searchBook
}