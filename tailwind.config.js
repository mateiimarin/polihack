import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  theme: {
    extend: {
      colors: {
        'chateau-green': {
            50: '#f1fcf5',
            100: '#ddfbe9',
            200: '#bef4d5',
            300: '#8aebb5',
            400: '#50d88d',
            500: '#29be6c',
            600: '#1ea85c',
            700: '#1a7b46',
            800: '#19623b',
            900: '#175033',
            950: '#072c19',
        },    
      },
      fontFamily: {
        'title': ['Ubuntu', 'serif'],
        'main': ['Inter', 'sans-serif'],
        'sec': ['Roboto', 'sans-serif'],
      }
    },
  }
}