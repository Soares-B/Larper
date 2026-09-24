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
"[project]/larper/app/api/search/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$larper$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/larper/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$larper$2f$lib$2f$Tenrai$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/larper/lib/Tenrai.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$larper$2f$lib$2f$IGDB$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/larper/lib/IGDB.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$larper$2f$lib$2f$GoogleBooks$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/larper/lib/GoogleBooks.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$larper$2f$lib$2f$TMDB$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/larper/lib/TMDB.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$larper$2f$lib$2f$Deezer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/larper/lib/Deezer.ts [app-route] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module '@/utils/Restructure'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
;
;
;
;
;
;
;
async function POST(req) {
    try {
        const { query, filters } = await req.json();
        let anime, manga, game, book, music, serie, movie = null;
        let searchVar, restructure;
        let fullSearch = [
            []
        ];
        const encodeQuery = encodeURIComponent(query);
        if (filters.anime) {
            searchVar = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$larper$2f$lib$2f$Tenrai$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TenraiAnime"])(encodeQuery);
            if (searchVar) {
                anime = await searchVar.json();
                restructure = Restructure(anime, "anime");
                anime = await restructure?.json() ?? null;
            }
            if (anime !== null) {
                fullSearch.push(anime);
                fullSearch[0].push('anime');
            }
        }
        if (filters.manga) {
            searchVar = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$larper$2f$lib$2f$Tenrai$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TenraiManga"])(encodeQuery);
            if (searchVar) {
                manga = await searchVar.json();
                restructure = Restructure(manga, "manga");
                manga = await restructure?.json() ?? null;
            }
            if (manga !== null) {
                fullSearch.push(manga);
                fullSearch[0].push('manga');
            }
        }
        if (filters.game) {
            searchVar = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$larper$2f$lib$2f$IGDB$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])(encodeQuery);
            if (searchVar) {
                game = await searchVar.json();
                restructure = Restructure(game, "game");
                game = await restructure?.json() ?? null;
            }
            if (game !== null) {
                fullSearch.push(game);
                fullSearch[0].push('game');
            }
        }
        if (filters.book) {
            searchVar = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$larper$2f$lib$2f$GoogleBooks$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])(encodeQuery);
            if (searchVar) {
                book = await searchVar.json();
                restructure = Restructure(book, "book");
                book = await restructure?.json() ?? null;
            }
            if (book !== null) {
                fullSearch.push(book);
                fullSearch[0].push('book');
            }
        }
        if (filters.serie) {
            searchVar = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$larper$2f$lib$2f$TMDB$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TMDBSerie"])(encodeQuery);
            if (searchVar) {
                serie = await searchVar.json();
                restructure = Restructure(serie, "serie");
                serie = await restructure?.json() ?? null;
            }
            if (serie !== null) {
                fullSearch.push(serie);
                fullSearch[0].push('serie');
            }
        }
        if (filters.movie) {
            searchVar = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$larper$2f$lib$2f$TMDB$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TMDBMovie"])(encodeQuery);
            if (searchVar) {
                movie = await searchVar.json();
                restructure = Restructure(movie, "movie");
                movie = await restructure?.json() ?? null;
            }
            if (movie !== null) {
                fullSearch.push(movie);
                fullSearch[0].push('movie');
            }
        }
        if (filters.music) {
            searchVar = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$larper$2f$lib$2f$Deezer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])(encodeQuery);
            if (searchVar) {
                music = await searchVar.json();
                restructure = Restructure(music, "music");
                music = await restructure?.json() ?? null;
            }
            if (music !== null) {
                fullSearch.push(music);
                fullSearch[0].push('music');
            }
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$larper$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(fullSearch);
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
"[project]/larper/lib/Deezer.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Deezer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$larper$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/larper/node_modules/next/server.js [app-route] (ecmascript)");
;
async function Deezer(query) {
    try {
        const url = 'https://api.deezer.com/search?q=';
        const response = await fetch(url + query);
        const data = await response.json();
        const info = data.data[0];
        if (!info) {
            return null;
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$larper$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            info
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
"[project]/larper/lib/GoogleBooks.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>GoogleBooks
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$larper$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/larper/node_modules/next/server.js [app-route] (ecmascript)");
;
const Key = process.env.GoogleBooks_Token;
async function GoogleBooks(query) {
    try {
        const url = 'https://www.googleapis.com/books/v1/volumes?q=';
        const response = await fetch(url + query + '&key=' + Key);
        const data = await response.json();
        let info = data.items.find((book)=>'authors' in book.volumeInfo);
        info = info.volumeInfo;
        if (!info) {
            return null;
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$larper$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            info
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
"[project]/larper/lib/TMDB.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TMDBMovie",
    ()=>TMDBMovie,
    "TMDBSerie",
    ()=>TMDBSerie
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$larper$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/larper/node_modules/next/server.js [app-route] (ecmascript)");
;
const Key = process.env.TMDB_Token;
async function TMDBMovie(query) {
    try {
        const urlPrincipal = 'https://api.themoviedb.org/3/search/movie?query=';
        const urlDetails = 'https://api.themoviedb.org/3/movie/';
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${Key}`
            }
        };
        const response = await fetch(urlPrincipal + query, options);
        const data = await response.json();
        const info = data.results[0];
        if (!info) {
            return null;
        }
        const responseDetails = await fetch(urlDetails + info.id, options);
        const dataDetails = await responseDetails.json();
        const responseReview = await fetch(urlDetails + info.id + '/reviews', options);
        const dataReviews = await responseReview.json();
        const infoReview = dataReviews.results[0];
        return __TURBOPACK__imported__module__$5b$project$5d2f$larper$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            info,
            dataDetails,
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
async function TMDBSerie(query) {
    try {
        const urlPrincipal = 'https://api.themoviedb.org/3/search/tv?query=';
        const urlDetails = 'https://api.themoviedb.org/3/tv/';
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${Key}`
            }
        };
        const response = await fetch(urlPrincipal + query, options);
        const data = await response.json();
        const info = data.results[0];
        if (!info) {
            return null;
        }
        const responseDetails = await fetch(urlDetails + info.id, options);
        const dataDetails = await responseDetails.json();
        const responseReview = await fetch(urlDetails + info.id + '/reviews', options);
        const dataReviews = await responseReview.json();
        const infoReview = dataReviews.results[0];
        return __TURBOPACK__imported__module__$5b$project$5d2f$larper$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            info,
            dataDetails,
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

//# sourceMappingURL=%5Broot-of-the-server%5D__1qjifqh._.js.map