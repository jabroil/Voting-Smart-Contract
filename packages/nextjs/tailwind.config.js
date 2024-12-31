/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./utils/**/*.{js,ts,jsx,tsx}"],
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#FF7E5F",
          "primary-content": "#2B2A30",
          secondary: "#FFD8CC",
          "secondary-content": "#2B2A30",
          accent: "#FFEAC5",
          "accent-content": "#2B2A30",
          neutral: "#2B2A30",
          "neutral-content": "#ffffff",
          "base-100": "#ffffff",
          "base-200": "#FAF6F3",
          "base-300": "#FFD8CC",
          "base-content": "#2B2A30",
          info: "#A0C4FF",
          success: "#81C995",
          warning: "#FFC857",
          error: "#EF233C",

          "--rounded-btn": "8px",
          ".tooltip": {
            "--tooltip-tail": "6px",
          },
          ".link": {
            textUnderlineOffset: "3px",
          },
          ".link:hover": {
            color: "#FF7E5F",
          },
        },
      },
    ],
  },
  theme: {
    extend: {
      boxShadow: {
        warm: "0 2px 10px rgba(255, 126, 95, 0.2)",
      },
      animation: {
        bounce: "bounce 2s infinite",
      },
    },
  },
};
