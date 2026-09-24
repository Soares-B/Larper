module.exports = [
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/runtime-reacts.external.js [external] (next/dist/server/runtime-reacts.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/runtime-reacts.external.js", () => require("next/dist/server/runtime-reacts.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/node:stream [external] (node:stream, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:stream", () => require("node:stream"));

module.exports = mod;
}),
"[project]/larper/app/api/suggestions/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$larper$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/larper/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$larper$2f$lib$2f$Tenrai$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/larper/lib/Tenrai.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$larper$2f$lib$2f$IGDB$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/larper/lib/IGDB.ts [app-route] (ecmascript)");
;
;
;
async function POST(req) {
    try {
        const { query } = await req.json();
        let anime, manga, game, book, music, serie, movie = null;
        let searchVar;
        const encodeQuery = encodeURIComponent(query);
        const suggestions = [];
        searchVar = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$larper$2f$lib$2f$Tenrai$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TenraiAnime"])(encodeQuery);
        if (searchVar) {
            anime = await searchVar.json();
            anime = anime.info.title;
            suggestions.push({
                name: anime,
                type: 'anime'
            });
        } else {
            anime = null;
        }
        searchVar = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$larper$2f$lib$2f$Tenrai$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TenraiManga"])(encodeQuery);
        if (searchVar) {
            manga = await searchVar.json();
            manga = manga.info.title;
            suggestions.push({
                name: manga,
                type: 'manga'
            });
        } else {
            manga = null;
        }
        searchVar = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$larper$2f$lib$2f$IGDB$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])(encodeQuery);
        if (searchVar) {
            game = await searchVar.json();
            game = game.info.title;
            suggestions.push({
                name: game,
                type: 'game'
            });
        } else {
            game = null;
        }
        searchVar = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$larper$2f$lib$2f$IGDB$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])(encodeQuery);
        if (searchVar) {
            game = await searchVar.json();
            game = game.info.title;
            suggestions.push({
                name: game,
                type: 'game'
            });
        } else {
            game = null;
        }
        console.log(suggestions);
        return __TURBOPACK__imported__module__$5b$project$5d2f$larper$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            query
        });
    } catch (err) {
        console.log(err);
        return __TURBOPACK__imported__module__$5b$project$5d2f$larper$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            message: `Error! ${err}`
        }, {
            status: 500
        });
    }
}
}),
"[project]/larper/lib/IGDB.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>IGDB
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$larper$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/larper/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$larper$2f$lib$2f$TwitchToken$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/larper/lib/TwitchToken.ts [app-route] (ecmascript)");
;
;
async function IGDB(query) {
    try {
        const token = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$larper$2f$lib$2f$TwitchToken$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])();
        const url = 'https://api.igdb.com/v4/games';
        const options = {
            method: 'POST',
            headers: {
                'Client-ID': process.env.TwitchClientID,
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'text/plain'
            },
            body: `
                search "${query}";
                fields name, cover.url, genres.name, age_ratings.synopsis, rating, game_modes.name, game_type.type, platforms.name, release_dates.human, storyline, themes.name, url, summary, language_supports.language;
                limit 1;
            `
        };
        const response = await fetch(url, options);
        const data = await response.json();
        let info = data[0];
        if (!info) {
            return null;
        }
        if (info.cover?.url) {
            info.cover.url = info.cover.url.replace('t_thumb', 't_original');
        }
        const languages = info.language_supports?.map((l)=>l.language) ?? null;
        let languagesData = null;
        if (languages !== null) {
            const languagesResponse = await fetch('https://api.igdb.com/v4/languages', {
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
            });
            languagesData = await languagesResponse.json();
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$larper$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            info,
            languagesData
        });
    } catch (err) {
        console.log(err);
        return __TURBOPACK__imported__module__$5b$project$5d2f$larper$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            message: `Erro! ${err}`
        }, {
            status: 500
        });
    }
}
}),
"[project]/larper/lib/Tenrai.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TenraiAnime",
    ()=>TenraiAnime,
    "TenraiManga",
    ()=>TenraiManga
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$larper$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/larper/node_modules/next/server.js [app-route] (ecmascript)");
;
async function TenraiAnime(query) {
    try {
        const url = 'https://api.tenrai.org/v1/anime';
        const response = await fetch(url + '?q=' + query);
        const data = await response.json();
        const info = data.data[0];
        if (!info) {
            return null;
        }
        const responseReview = await fetch(url + '/' + info.mal_id + '/reviews');
        const dataReview = await responseReview.json();
        const infoReview = dataReview.data?.[0] ?? null;
        return __TURBOPACK__imported__module__$5b$project$5d2f$larper$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            info,
            infoReview
        });
    } catch (err) {
        console.log(err);
        return __TURBOPACK__imported__module__$5b$project$5d2f$larper$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            message: `Erro! ${err}`
        }, {
            status: 500
        });
    }
}
async function TenraiManga(query) {
    try {
        const url = 'https://api.tenrai.org/v1/manga';
        const response = await fetch(url + '?q=' + query);
        const data = await response.json();
        const info = data.data[0];
        if (!info) {
            return null;
        }
        const responseReview = await fetch(url + '/' + info.mal_id + '/reviews');
        const dataReview = await responseReview.json();
        const infoReview = dataReview.data?.[0] ?? null;
        return __TURBOPACK__imported__module__$5b$project$5d2f$larper$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            info,
            infoReview
        });
    } catch (err) {
        console.log(err);
        return __TURBOPACK__imported__module__$5b$project$5d2f$larper$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            message: `Erro! ${err}`
        }, {
            status: 500
        });
    }
}
}),
"[project]/larper/lib/TwitchToken.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>getAccessToken
]);
const CLIENT_ID = process.env.TwitchClientID;
const CLIENT_SECRET = process.env.TwitchClientSecret;
let accessToken = null;
let expiresAt = 0;
async function getAccessToken() {
    if (accessToken && Date.now() < expiresAt) {
        return accessToken;
    }
    const response = await fetch(`https://id.twitch.tv/oauth2/token` + `?client_id=${CLIENT_ID}` + `&client_secret=${CLIENT_SECRET}` + `&grant_type=client_credentials`, {
        method: 'POST'
    });
    const data = await response.json();
    accessToken = data.access_token;
    expiresAt = Date.now() + (data.expires_in - 300) * 1000;
    return accessToken;
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0aljaep._.js.map