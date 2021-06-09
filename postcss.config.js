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
        "./node_modules/tailwindcss/dist/*.js",
        "./node_modules/tailwindcss/lib/*.js"
      ],
      defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || [],
      whitelistPatterns: [/swal/, /Resizer/, /ace/, /Pane/, /vertical/, /horizontal/],
      whitelistPatternsChildren: [/swal/, /Resizer/, /ace/, /Pane/, /vertical/, /horizontal/]
    })
  )
}

module.exports = environment