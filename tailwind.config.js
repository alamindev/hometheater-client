module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    fontFamily: {
      custom: ["Poppins", "sans-serif"],
      roboto: ["Roboto", "sans-serif"],
      rubik: ["Rubik", "sans-serif"],
    },
    extend: {
      colors: {
        dark: "#24364a",
        "dark-sm": "#24364a", 
        "brand-color": "#4E81EE",
        "brand-color-hover": "#336EEB",
        "brand-gray": "#656d75",
        "brand-dark": "#24364a",
        "brand-dark-gray": "#24364a",
        "blue-light": "rgba(224, 233, 255, 0.3)",
        "red-light": "#FF575D",
        "brand-cyan": "#6EEAEE",
        "blue-dark": "#24364a",
        "blug-10": "#F2F4FB",
        "megenta-color": "#EA6969",
        "megenta-color-hover": "#E84747",
        rating: "#F3BA2E",
        "light-gray": "#F4F4F4",
        "light-15": "#E7EDFB",
        "light-20": "#F1F5FB",
        "light-10": "#f2f2fd",
        "light-5": "#f7f8fde8",
        "light-blue-cart": "#F3F6FB",
        whitesmoke: "whitesmoke",
        "pending-color": "#ffc61c",
        "review-color": "#fea31b",
        "red-color": "#e25050",
        "brand-red-200": "#d52020",
        "approve-color": "#10b981",
        black: "#24364a",
        "red-dark": "#6A0208",
        "yellow-light": "#FFBABA",
        "dark-light-30": "#4e81ee",
      },
      width: {
        98: "26rem",
      },
    },
    fontSize: {
      xs: ".75rem",
      sm: ".875rem",
      tiny: ".875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "4rem",
      "7xl": "5rem",
      "brand-header": "38px",
      "brand-sub-header": "18px",
    },
    zIndex: {
      0: 0,
      10: 10,
      20: 20,
      30: 30,
      40: 40,
      50: 50,
      25: 25,
      50: 50,
      75: 75,
      100: 100,
      auto: "auto",
    },
  },
  variants: {
    extend: {
      opacity: ["disabled"],
      backgroundColor: ["disabled"],
      borderWidth: ["last"],
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
  rules: {
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: [
          "tailwind",
          "apply",
          "variants",
          "responsive",
          "screen",
        ],
      },
    ],
    "declaration-block-trailing-semicolon": null,
    "no-descending-specificity": null,
  },
};
