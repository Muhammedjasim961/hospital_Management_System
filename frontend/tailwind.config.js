module.exports = {
  content: ["./src/**/*.{html,ts}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      keyframes: {
        rotate1: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        rotate2: {
          "0%": { transform: "rotate(360deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
      },
      animation: {
        rotate1: "rotate1 6s linear infinite",
        rotate2: "rotate2 10s linear infinite",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
