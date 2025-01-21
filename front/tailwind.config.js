/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    `./src/pages/**/*.{js,jsx,ts,tsx}`,
    `./src/components/**/*.{js,jsx,ts,tsx}`,
  ],
  theme: {
    screens: {
      ssm: "500px",

      sm: "640px",
      // => @media (min-width: 640px) { ... }

      ms: "700px",

      md: "768px",
      // => @media (min-width: 768px) { ... }
      lm: "840px",
      // desde 920 a 840 todo a la izq y con un buen margen, desp le metemos centradiito
      llg: "920px",

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }
      mg: "1135px",

      xl: "1200px",
      // => @media (min-width: 1280px) { ... }

      xxl: "1400px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },

    extend: {
      height: {
        "screen-dvh": ["100vh", "100dvh"], // Fallback to 100vh if dvh isn't supported
      },
      colors: {
        iBlue: {
          DEFAULT: "#03000D", // Por defecto
          rgba: "rgba(3,0,13,1)",
          hsla: "hsla(254,100%,3%,1)",
        },
        grey2: {
          DEFAULT: "#9397A2",
          rgba: "rgba(147,151,162,1)",
          hsla: "hsla(224,7%,61%,1)",
        },
        seaBlue: {
          DEFAULT: "#0024A6",
          rgba: "rgba(0,36,166,1)",
          hsla: "hsla(227,100%,33%,1)",
        },
        skyBlue: {
          DEFAULT: "#0584F5",
          rgba: "rgba(5,132,245,1)",
          hsla: "hsla(208,96%,49%,1)",
        },
        clearBlue: {
          DEFAULT: "#3CC2FF",
          rgba: "rgba(60,194,255,1)",
          hsla: "hsla(199,100%,62%,1)",
        },
        grey0: {
          DEFAULT: "#EAEAEA",
          rgba: "rgba(234,234,234,1)",
          hsla: "hsla(0,0%,92%,1)",
        },
        grey1: {
          DEFAULT: "#C7CBD6",
          rgba: "rgba(199,203,214,1)",
          hsla: "hsla(224,15%,81%,1)",
        },
        grey3: {
          DEFAULT: "#7C7C7C",
          rgba: "rgba(124,124,124,1)",
          hsla: "hsla(0,0%,49%,1)",
        },
        grey4: {
          DEFAULT: "#434652",
          rgba: "rgba(67,70,82,1)",
          hsla: "hsla(228,10%,29%,1)",
        },
        white: {
          DEFAULT: "#F6F6F6",
          rgba: "rgba(246,246,246,1)",
          hsla: "hsla(0,0%,96%,1)",
        },
      },
    },
  },

  plugins: [],
};
