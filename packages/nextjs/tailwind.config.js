/** @type {import('tailwindcss').Config} */
module.exports = {
    important: true,
    content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./utils/**/*.{js,ts,jsx,tsx}"],
    plugins: [require("daisyui")],
    // DaisyUI theme colors
    daisyui: {
        themes: [
            {
                light: {
                    primary: "#e8d914",
                    "primary-content": "#212638",
                    secondary: "#e8d914",
                    "secondary-content": "#212638",
                    accent: "#93BBFB",
                    "accent-content": "#212638",
                    neutral: "#e8d914",
                    "neutral-content": "#e8d914",
                    "base-100": "#e8d914",
                    "base-200": "#e8d914",
                    "base-300": "#DAE8FF",
                    "base-content": "#212638",
                    info: "#93BBFB",
                    success: "#34EEB6",
                    warning: "#FFCF72",
                    error: "#FF8863",

                    "--rounded-btn": "9999rem",

                    ".tooltip": {
                        "--tooltip-tail": "6px",
                    },
                    ".link": {
                        textUnderlineOffset: "2px",
                    },
                    ".link:hover": {
                        opacity: "80%",
                    },
                },
            },

        ],
    },
    theme: {
        extend: {
            boxShadow: {
                center: "0 0 12px -2px rgb(0 0 0 / 0.05)",
            },
            animation: {
                "pulse-fast": "pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite",
            },
        },
    },
};
