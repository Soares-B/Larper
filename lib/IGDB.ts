import { NextResponse } from "next/server";
import getAccessToken from "./TwitchToken";

export default async function IGDB(query: string){
    try{

        const safeQuery = query.replace(/[\\"]/g, "\\$&").replace(/[\r\n]/g, " ");

        const token = await getAccessToken();
        const url = 'https://api.igdb.com/v4/games'
        const options = {
            method: 'POST',
            headers: {
                'Client-ID': process.env.TwitchClientID!,
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'text/plain'
            },
            body: `
                search "${safeQuery}";
                fields name, cover.url, genres.name, age_ratings.synopsis, rating, game_modes.name, game_type.type, platforms.name, release_dates.human, storyline, themes.name, url, summary, language_supports.language;
                limit 1;
            `
        }
        const response = await fetch(url, options);
        if (!response.ok) throw new Error('IGDB request failed');
        const data = await response.json();
        let info = data[0];

        if (!info){
            return null
        }

        if (info.cover?.url){
            info.cover.url = info.cover.url.replace('t_thumb', 't_original');
        }

        const languages = info.language_supports?.map(
            (l: { language: number }) => l.language
        ) ?? null;

        let languagesData = null;

        if (languages && languages.length > 0){
            const languagesResponse = await fetch(
            'https://api.igdb.com/v4/languages', 
            
            {
            method: 'POST',
            headers: {
                'Client-ID': process.env.TwitchClientID!,
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'text/plain'
            },
            body: `
                fields name, native_name, locale;
                where id = (${languages.join(',')});
            `
        })
            if (languagesResponse.ok) languagesData = await languagesResponse.json();
        }

        info.infoSource = 'IGDB'

        return NextResponse.json({info, languagesData,})

    }catch(err){
        console.error('IGDB request failed:', err);
        return NextResponse.json({
            message: 'Não foi possível pesquisar jogos no momento.'
        }, {status: 500})
    }
}
