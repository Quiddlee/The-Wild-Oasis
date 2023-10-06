module.exports = {
    "./src/**/*.{tsx,ts}": ["pnpm lint", "pnpm type-check"],
    "./src/**/*.{tsx,ts,html,css}": "pnpm format",
}
