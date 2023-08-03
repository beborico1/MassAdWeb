module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'massad-100': '#f7d9da',
        'massad-200': '#efb4b6',
        'massad-300': '#e68f92',
        'massad-400': '#de6a6e',
        'massad-500': '#b93a3f',
        'massad-600': '#a2282c',
        'massad-700': '#881d20',
        'massad-800': '#6e171a',
        'massad-900': '#540f13',
        'massad-1000': '#3a080c',
      },
      boxShadow: {
        custom: '0 0 10px rgba(0,0,0,0.15)',
      },
      borderRadius: {
        'custom': '10px',
      },
    },

    customForms: theme => ({
      default: {
        checkbox: {
          color: '#b93a3f',
          '&:checked': {
            backgroundColor: '#b93a3f',
          },
          borderColor: theme('colors.gray.500'),
          borderWidth: theme('borderWidth.DEFAULT'),
        },
      },
    })
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/custom-forms'),
  ],
}
