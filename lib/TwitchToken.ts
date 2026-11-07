const CLIENT_ID = process.env.TwitchClientID;
const CLIENT_SECRET = process.env.TwitchClientSecret;

let accessToken: string | null = null;
let expiresAt = 0;

export default async function getAccessToken(){

    if (accessToken && Date.now() < expiresAt) {
        return accessToken;
    }
    

    if (!CLIENT_ID || !CLIENT_SECRET) {
        throw new Error("Twitch credentials are not configured");
    }

    const body = new URLSearchParams({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: "client_credentials",
    });
    const response = await fetch("https://id.twitch.tv/oauth2/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
    });

    if (!response.ok) throw new Error("Twitch token request failed");

    const data: { access_token?: string; expires_in?: number } = await response.json();
    if (!data.access_token || typeof data.expires_in !== "number") {
        throw new Error("Twitch returned an invalid token response");
    }

    accessToken = data.access_token;

    expiresAt = Date.now() + Math.max(0, data.expires_in - 300) * 1000;

    return accessToken;
}
