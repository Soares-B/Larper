const CLIENT_ID = process.env.TwitchClientID;
const CLIENT_SECRET = process.env.TwitchClientSecret;

let accessToken = null;
let expiresAt = 0;

export async function getAccessToken() {

    if (accessToken && Date.now() < expiresAt) {
        return accessToken;
    }

    const response = await fetch(
        `https://id.twitch.tv/oauth2/token` +
        `?client_id=${CLIENT_ID}` +
        `&client_secret=${CLIENT_SECRET}` +
        `&grant_type=client_credentials`,
        {
            method: 'POST'
        }
    );

    const data = await response.json();

    accessToken = data.access_token;

    expiresAt = Date.now() + (data.expires_in - 300) * 1000;

    return accessToken;
}