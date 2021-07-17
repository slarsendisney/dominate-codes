module.exports = {
  variants: {
    extend: {
      textColor: ["selection"],
      backgroundColor: ["selection"],
    },
  },
  theme: {
    extend: {
      typography: theme => ({
        unprose: {
          css: {
            h1: {
              "margin-top": "0",
              "margin-bottom": "0",
            },
            h2: {
              "margin-top": "0",
              "margin-bottom": "0",
            },
            h3: {
              "margin-top": "0",
              "margin-bottom": "0",
            },
            h4: {
              "margin-top": "0",
              "margin-bottom": "0",
            },
            p: {
              "margin-top": "0",
              "margin-bottom": "0",
            },
          },
        },
      }),
    },
  },
  purge: {
    content: [
      "./public/**/*.html",
      "./src/**/*.html",
      "./src/**/*.jsx",
      "./src/**/*.js",
    ],
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwindcss-selection-variant"),
  ],
}
