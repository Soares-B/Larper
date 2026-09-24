import { NextResponse } from "next/server";

const Key = process.env.GoogleBooks_Token;

type books = {
    items: [
        {volumeInfo:
            {authors: string[]}
        }
    ]
}

export default async function GoogleBooks(query: string){
    try{
        const url =  'https://www.googleapis.com/books/v1/volumes?q='

        const response = await fetch (url + query + '&key=' + Key);
        const data: books = await response.json();

        let info: any = data.items.find(book => 'authors' in book.volumeInfo)
        info = info.volumeInfo
        
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