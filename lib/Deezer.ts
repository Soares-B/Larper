import { NextResponse } from "next/server";

export default async function Deezer(query:string){
    try{
        const url = 'https://api.deezer.com/search?q=';

        const response = await fetch(url + query);
        const data = await response.json();
        const info = data.data[0]

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