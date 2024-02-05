/** @type {import('tailwindcss').Config} */
import { breakPoints ,colors, spacing} from './src/config/tailwind';
const {BASE,LG,MD,SM,XL,XL_2} = breakPoints;



export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors,
    screens:{
      'base': `${BASE}px`,
      'sm': `${SM}px`,
      'md': `${MD}px`,
      'lg': `${LG}px`,
      'xl': `${XL}px`,
      '2xl': `${XL_2}px`,
    },
    spacing,
  },
  plugins: [],
}

