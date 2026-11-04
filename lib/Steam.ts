import { NextResponse } from "next/server";

const steamKey = process.env.SteamKey;

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

  return descricao

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

        const urlReview = `https://api.steampowered.com/IUserReviewsService/GetAppReviews/v1/?appid=${id}&filter=1&num_per_page=10`;

        const responseReview = await fetch(urlReview);
        const dataReview = await responseReview.json();
        const infoReview = dataReview.response.reviews[0]

        const urlUser = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${steamKey}&steamids=${infoReview.author.steamid}`

        const responseUser = await fetch(urlUser);
        const dataUser = await responseUser.json();
        const infoUser = dataUser.response.players[0]

        infoReview.user = infoUser.personaname
        infoReview.avatar = infoUser.avatarfull        

        if (!info){
            return null
        }

        info.infoSource = 'Steam'

        info.about_the_game = description(info.detailed_description)
        info.cover = `https://cdn.akamai.steamstatic.com/steam/apps/${id}/library_600x900.jpg`
        info.url = `https://store.steampowered.com/app/${id}/`

        console.log(infoReview)

        return NextResponse.json({info, infoReview})

    }catch(err){
        console.log(err)
        return NextResponse.json({
            message: `Erro! ${err}`
        }, {status: 500})
    }

}