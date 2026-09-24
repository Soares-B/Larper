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
var __TURBOPACK__imported__module__$5b$project$5d2f$larper$2f$lib$2f$GoogleBooks$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/larper/lib/GoogleBooks.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$larper$2f$lib$2f$TMDB$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/larper/lib/TMDB.ts [app-route] (ecmascript)");
;
;
;
;
async function POST(req) {
    try {
        const { query } = await req.json();
        const encodeQuery = encodeURIComponent(query);
        const [animeResponse, mangaResponse, bookResponse, serieResponse, movieResponse] = await Promise.all([
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$larper$2f$lib$2f$Tenrai$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TenraiAnime"])(encodeQuery),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$larper$2f$lib$2f$Tenrai$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TenraiManga"])(encodeQuery),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$larper$2f$lib$2f$GoogleBooks$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])(encodeQuery),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$larper$2f$lib$2f$TMDB$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TMDBSerie"])(encodeQuery),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$larper$2f$lib$2f$TMDB$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TMDBMovie"])(encodeQuery)
        ]);
        const suggestions = [];
        if (animeResponse) {
            const anime = await animeResponse.json();
            suggestions.push({
                name: anime.info.title,
                type: "anime"
            });
        }
        if (mangaResponse) {
            const manga = await mangaResponse.json();
            suggestions.push({
                name: manga.info.title,
                type: "manga"
            });
        }
        if (bookResponse) {
            const book = await bookResponse.json();
            suggestions.push({
                name: book.info.title,
                type: "book"
            });
        }
        if (serieResponse) {
            const serie = await serieResponse.json();
            suggestions.push({
                name: serie.info.name,
                type: "serie"
            });
        }
        if (movieResponse) {
            const movie = await movieResponse.json();
            suggestions.push({
                name: movie.info.title,
                type: "movie"
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$larper$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            suggestions
        });
    } catch (err) {
        console.error(err);
        return __TURBOPACK__imported__module__$5b$project$5d2f$larper$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            message: `Error! ${err}`
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
];

//# sourceMappingURL=%5Broot-of-the-server%5D__16j1r95._.js.map