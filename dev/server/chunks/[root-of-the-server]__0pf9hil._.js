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
            anime = null;
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

//# sourceMappingURL=%5Broot-of-the-server%5D__0pf9hil._.js.map