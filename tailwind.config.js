/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue1: "#CDFAFA",
        blue4: "#005A82",
        blue5: "#0A323C",
        blue6: "#091428",
        blue7: "#0A1428",
        gold4: "#C89B3C",
        grey1: "#A09B8C", 
        grey2: "#5B5A56",
        grey3: "#1E2328",
        gold3: "#C8AA6E",
        gold5: "#785A28",
        gold6: "#463714",
        gold7: "#32281E",
        hextechblack: "#010A13",
        mainbg: "#081110",
        innerborder: "#214546",
        timeline: "#081819",
      },
      borderWidth: {
        1: "1px"
      }
    },
  },
  plugins: [],
}