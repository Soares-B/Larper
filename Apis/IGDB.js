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
            search "${query}";
            fields name, cover.url, game_engines.name, game_engines.url;
            limit 10;
        `
    }

    const response = await fetch(url, options);

    return await response.json();
}