module.exports = {
  presets: [
    ['@vue/app', {
      useBuiltIns: 'entry',
      polyfills: [
        'es6.array.iterator',
        'es6.promise',
        'es7.promise.finally',
        'es6.symbol'
      ]
    }]
  ]
}
