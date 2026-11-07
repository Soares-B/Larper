import { NextResponse } from "next/server";

const Key = process.env.GoogleBooks_Token;

type GoogleBooksResponse = {
    items?: Array<{ volumeInfo?: { authors?: string[] } & Record<string, unknown> }>;
};

export default async function GoogleBooks(query: string){
    try{
        const url = new URL('https://www.googleapis.com/books/v1/volumes');
        url.searchParams.set('q', query);
        if (Key) url.searchParams.set('key', Key);

        const response = await fetch(url);
        const data: GoogleBooksResponse = await response.json();

        if (response.status !== 200){
            throw new Error('Google Books request failed');
        }

        const book = data.items?.find(item => item.volumeInfo?.authors?.length);
        const info = book?.volumeInfo;

        if (!info) {
            return null;
        }

        return NextResponse.json({info})

    }catch(err){
        console.error('Google Books request failed:', err);
        return NextResponse.json({
            message: 'Não foi possível pesquisar livros no momento.'
        }, {status: 500})
    }
    
}
