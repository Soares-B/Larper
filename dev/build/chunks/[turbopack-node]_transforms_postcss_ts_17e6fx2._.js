module.exports = [
"[turbopack-node]/transforms/postcss.ts?config=[project]/larper/postcss.config.mjs { CONFIG => \"[project]/larper/postcss.config.mjs [postcss] (ecmascript)\" } [postcss] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "chunks/19tb_1t5kd7v._.js",
  "chunks/[root-of-the-server]__0yubjb-._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[turbopack-node]/transforms/postcss.ts?config=[project]/larper/postcss.config.mjs { CONFIG => \"[project]/larper/postcss.config.mjs [postcss] (ecmascript)\" } [postcss] (ecmascript)");
    });
});
}),
];