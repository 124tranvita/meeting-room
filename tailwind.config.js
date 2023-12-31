/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        "70vh": "70vh",
        "75vh": "75vh",
        "80vh": "80vh",
        "85vh": "85vh",
      },
      width: {
        "90%": "90%",
      },
      maxWidth: {
        "1280px": "1280px",
      },
      minWidth: {
        "78px": "78px",
        sx: "20rem",
      },
      minHeight: {
        screen: "100vh",
      },
    },
  },
  plugins: [],
};
