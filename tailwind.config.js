const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");

module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        fontFamily: Object.assign(
            { ...defaultTheme.fontFamily },
            {
                "readex-pro": ["Readex Pro", "sans-serif"],
                roboto: ["Roboto Condensed", "sans-serif"],
            }
        ),
        screens: {
            xs: "350px",
            ...defaultTheme.screens,
        },
    },
    plugins: [
        plugin(function ({ addUtilities }) {
            addUtilities({
                ".scrollbar-hide": {
                    /* IE and Edge */
                    "-ms-overflow-style": "none",
                    /* Firefox */
                    "scrollbar-width": "none",
                    /* Safari and Chrome */
                    "&::-webkit-scrollbar": {
                        display: "none",
                    },
                },
            });
        }),
    ],
};
