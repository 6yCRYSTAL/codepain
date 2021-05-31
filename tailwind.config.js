module.exports = {
  purge: {
    enabled: true,
    content: [
      "app/**/*.html.erb",
      "app/**/**/*.html.erb",
      "app/helpers/**/*.rb"
    ],
    options: {
      keyframes: true,
    },
  },
  darkMode: false,
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false
  }
}