const mix = require('laravel-mix');

require('laravel-mix-polyfill');

mix.setPublicPath('dist')
    .webpackConfig({
        output: {
            library: 'contentEditable',
            libraryTarget: 'window',
            libraryExport: 'default'
        },
    })
    .polyfill({
        enabled: true,
        useBuiltIns: "usage",
        targets: {"ie": 11}
    })
    .js('src/index.js', 'content-editable.js')
    .sourceMaps();

