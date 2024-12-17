/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        auto: "repeat(auto-fill, minmax(200px, 1fr))",
      },
      colors: {
        primary: "#5F6FFF",
      },
      screens: {
        sm: "640px", // Small screens (mobile)
        md: "768px", // Medium screens (tablet)
        lg: "1024px", // Large screens (desktop)
        xl: "1280px", // Extra large screens
      },
    },
  },
  plugins: [],
};
