import { readJsonResponse } from "@/lib/readJsonResponse";
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
    const url = `https://store.steampowered.com/api/storesearch/?term=${encodeURIComponent(query)}&l=english&cc=us`

    try{
        const response = await fetch(url);
        if (!response.ok) throw new Error('Steam search request failed');
        const data = await readJsonResponse(response);
        const game = data.items?.[0];
        if (!game?.id) return null;
        const id = game.id

        const urlDetails = `https://store.steampowered.com/api/appdetails/?appids=${id}&l=english&cc=us`

        const responseDetails = await fetch(urlDetails);
        if (!responseDetails.ok) throw new Error('Steam details request failed');
        const dataDetails = await readJsonResponse(responseDetails);
        const info = dataDetails[id]?.data;
        if (!info) return null;
        const reviewSummary = dataReview?.query_summary ?? dataReview?.response?.query_summary;
        const totalReviews = Number(reviewSummary?.total_reviews);
        const totalPositive = Number(reviewSummary?.total_positive);
        info.steam_rating = totalReviews > 0 && Number.isFinite(totalPositive)
            ? Number(((totalPositive / totalReviews) * 10).toFixed(1))
            : null;

        const urlReview = `https://api.steampowered.com/IUserReviewsService/GetAppReviews/v1/?appid=${id}&filter=1&num_per_page=10`;

        const responseReview = await fetch(urlReview);
        const dataReview = responseReview.ok ? await readJsonResponse(responseReview) : null;
        const infoReview = dataReview?.response?.reviews?.[0] ?? null;

        if (infoReview && steamKey && infoReview.author?.steamid) {
            const urlUser = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${encodeURIComponent(steamKey)}&steamids=${encodeURIComponent(infoReview.author.steamid)}`;
            const responseUser = await fetch(urlUser);
            const dataUser = responseUser.ok ? await readJsonResponse(responseUser) : null;
            const infoUser = dataUser?.response?.players?.[0];
            infoReview.user = infoUser?.personaname ?? null;
            infoReview.avatar = infoUser?.avatarfull ?? null;
        }

        info.infoSource = 'Steam'

        info.about_the_game = description(info.detailed_description ?? "")
        info.cover = `https://cdn.akamai.steamstatic.com/steam/apps/${id}/library_600x900.jpg`
        info.url = `https://store.steampowered.com/app/${id}/`

        return NextResponse.json({info, infoReview})

    }catch(err){
        console.error('Steam request failed:', err);
        return NextResponse.json({
            message: 'Não foi possível pesquisar jogos na Steam no momento.'
        }, {status: 500})
    }

}
