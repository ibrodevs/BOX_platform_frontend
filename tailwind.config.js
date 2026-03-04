import colors from 'tailwindcss/colors'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      ...colors,
      red: colors.gray,
      blue: colors.gray,
      green: colors.gray,
      yellow: colors.gray,
      purple: colors.gray,
      pink: colors.gray,
      orange: colors.gray,
      teal: colors.gray,
      cyan: colors.gray,
      sky: colors.gray,
      indigo: colors.gray,
      emerald: colors.gray,
      lime: colors.gray,
      amber: colors.gray,
      rose: colors.gray,
      fuchsia: colors.gray,
      violet: colors.gray,
      primary: colors.gray[900],
      "primary-dark": colors.gray[950],
      black: '#111111',
      white: '#FFFFFF',
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
