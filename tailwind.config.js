const flowbite = require('flowbite-react/tailwind');
const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', flowbite.content()],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif']
      }
    }
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.scrollbar': {
          overflowY: 'hidden',
          scrollbarWidth: 'thin',
          scrollbarColor: '#dee2e6 transparent',
          scrollbarGutter: 'stable both-edges'
        },
        '.scrollbar:hover': {
          overflowY: 'auto'
        },
        '.scrollbar::-webkit-scrollbar': {
          width: '8px',
          height: '8px'
        },
        '.scrollbar::-webkit-scrollbar-button': {
          display: 'none'
        },
        '.scrollbar::-webkit-scrollbar-track': {
          backgroundColor: 'transparent',
          borderRadius: '100vh'
        },
        '.scrollbar::-webkit-scrollbar-thumb': {
          backgroundColor: '#343a40',
          borderRadius: '100vh',
          border: '3px solid transparent'
        },
        '.scrollbar::-webkit-scrollbar-thumb:hover': {
          backgroundColor: '#212529'
        }
      });
    }),
    flowbite.plugin()
  ]
};
