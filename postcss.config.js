let environment = {
  plugins: [
    require("tailwindcss")("tailwind.config.js"),
    require("tailwindcss"),
    require('autoprefixer'),
    require('postcss-import'),
    require('postcss-flexbugs-fixes'),
    require('postcss-preset-env')({
      autoprefixer: {
        flexbox: 'no-2009'
      },
      stage: 3
    })
  ]
}

if (process.env.RAILS_ENV === 'production') {
  environment.plugins.push(
    require('@fullhuman/postcss-purgecss')({
      content: [
        "app/**/*.html.erb",
        "app/helpers/**/*.rb",
        "app/javascript/**/*.js",
        "app/javascript/**/*.jsx",
        "app/javascript/**/*.scss",
        "./node_modules/tailwindcss/**/*.js",
        "./node_modules/tailwindcss/**/*.css",
        "./node_modules/sweetalert2/**/*.js",
        "./node_modules/sweetalert2/**/*.css",
        "./node_modules/sweetalert2-react-content/**/*.js",
        "./node_modules/sweetalert2-react-content/**/*.js.map",
        "./node_modules/react-collapse-pane/**/*.js",
        "./node_modules/react-collapse-pane/**/*.js.map",
        "./node_modules/react-collapse-pane/**/*.ts"
      ],
      defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || [],
      whitelistPatterns: [/swal/, /Resizer/, /ace/, /Pane/, /vertical/, /horizontal/],
      whitelistPatternsChildren: [/swal/, /Resizer/, /ace/, /Pane/, /vertical/, /horizontal/]
    })
  )
}

module.exports = environment