import { getAccessToken } from './TwitchToken.js';

export async function searchGame(query) {
    const token = await getAccessToken();
    const url = 'https://api.igdb.com/v4/games'
    const options = {
        method: 'POST',
        headers: {
            'Client-ID': process.env.TwitchClientID,
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'text/plain'
        },
        body: `
            search "Silent Hill f";
            fields name, cover.url, genres.name, age_ratings.synopsis, rating, game_modes.name, game_type.type, platforms.name, release_dates.human, storyline, themes.name, url, summary, language_supports.language;
            limit 1;
        `
    }

    const response = await fetch(url, options);
    const data = await response.json();
    let info = data[0];
    info.cover.url = info.cover.url.replace('t_thumb', 't_original');

    const languages = info.language_supports.map(l => l.language);
    const languagesResponse = await fetch(
        'https://api.igdb.com/v4/languages', 
        
        {
        method: 'POST',
        headers: {
            'Client-ID': process.env.TwitchClientID,
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'text/plain'
        },
        body: `
            fields name, native_name, locale;
            where id = (${languages.join(',')});
        `
    })
    const languagesData = await languagesResponse.json(); 

    return {
        info,
        languagesData
    };
}