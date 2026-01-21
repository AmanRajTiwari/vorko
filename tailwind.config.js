module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#0a0e27",
        "dark-light": "#1a1f3a",
        "dark-lighter": "#252d47",
        accent: "#00d9ff",
        "accent-purple": "#a78bfa",
        "accent-blue": "#3b82f6",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        glow: "0 0 20px rgba(0, 217, 255, 0.3)",
        "glow-purple": "0 0 30px rgba(167, 139, 250, 0.2)",
        "glow-blue": "0 0 20px rgba(59, 130, 246, 0.2)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
