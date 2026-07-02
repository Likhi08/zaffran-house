export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        royal: "#3b0954",
        plum: "#18051f",
        gold: "#d7a84f",
        ivory: "#fffaf0",
        ink: "#09070b"
      },
      fontFamily: {
        display: ["Georgia", "serif"],
        body: ["Inter", "ui-sans-serif", "system-ui"]
      },
      boxShadow: {
        glow: "0 24px 80px rgba(215, 168, 79, 0.18)"
      }
    }
  },
  plugins: []
};
