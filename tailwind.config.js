import { appPlugin } from "./src/plugins/tw-plugins";
import iconsPlugin from "./src/plugins/tw-icons-plugins";
import colors from "tailwindcss/colors";
/** @type {import('tailwindcss').Config} */
export default {
   content: [
     "./index.html",
     "./src/**/*.{vue,js,ts,jsx,tsx}",
   ],
   theme: {
     extend: {
      colors:{
         primary: {
            light: "#9FF3E4",
            50: "rgb(230 244 242)",
            100: "rgb(178 219 215)",
            200: "rgb(141 202 196)",
            300: "rgb(90 178 169)",
            400: "rgb(57 163 153)",
            500: "rgb(8 140 127)",
            DEFAULT: "rgb(8 140 127)",
            600: "rgb(7 127 116)",
            700: "rgb(6 99 90)",
            800: "rgb(4 77 70)",
            900: "rgb(3 59 53)",
            950: "rgb(2 54 53)",
        },
      }
     },
     container:{
      center:true,
      padding: "2rem",
     }
   },
   plugins: [appPlugin,iconsPlugin],
 }