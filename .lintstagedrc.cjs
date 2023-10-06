module.exports = {
    "*.{tsx,ts}": ["pnpm lint", "pnpm type-check"],
    "*.{tsx,ts,html,css}": "pnpm format",
}
