module.exports = {
    "./src/**/*.{tsx, ts}": ["eslint", "tsc --noEmmit"],
    "./src/**/*.{tsx, ts, html, css}": "prettier --write",
}
