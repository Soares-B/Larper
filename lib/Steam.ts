import { NextResponse } from "next/server";

function description(d: string){
    const descricao = d
  .split(/<h1[^>]*>\s*About the Game\s*<\/h1>/i)[1]
  ?.split(/<h1\b/i)[0]
  ?.replace(/<img\b[^>]*>/gi, "")
  .replace(/<[^>]*>/g, " ")
  .replace(/&amp;/g, "&")
  .replace(/&nbsp;/g, " ")
  .replace(/&quot;/g, '"')
  .replace(/&#39;|&apos;/g, "'")
  .replace(/&lt;/g, "<")
  .replace(/&gt;/g, ">")
  .replace(/\s+/g, " ")
  .trim();

console.log(descricao);

}

export default async function Steam(query: string){
    const url = `https://store.steampowered.com/api/storesearch/?term=${query}&l=english&cc=us`

    try{
        const response = await fetch(url);
        const data = await response.json();
        const game = data.items[0]
        const id = game.id

        const urlDetails = `https://store.steampowered.com/api/appdetails/?appids=${id}&l=english&cc=us`

        const responseDetails = await fetch(urlDetails);
        const dataDetails = await responseDetails.json();
        const info = dataDetails[id].data

        if (!info){
            return null
        }

        info.infoSource = 'Steam'

        info.detailed_description = description(info.detailed_description)
        info.cover = `https://cdn.akamai.steamstatic.com/steam/apps/${id}/library_600x900.jpg`
        info.url = `https://store.steampowered.com/app/${id}/`

        return NextResponse.json({info})

    }catch(err){
        console.log(err)
        return NextResponse.json({
            message: `Erro! ${err}`
        }, {status: 500})
    }

}