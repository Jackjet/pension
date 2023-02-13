module.exports = {
  presets: [
    //' @vue/app', vue cli3 配置
    '@vue/cli-plugin-babel/preset',
    // 本地调试
    // ['@babel/preset-env', {
    //   useBuiltIns: 'entry',
    //   corejs: 3,
    //   polyfills: [
    //     'es6.array.iterator',
    //     'es6.promise',
    //     'es7.promise.finally',
    //     'es6.symbol'
    //   ]
    // }]
    // 打包后的严格模式
    ["@babel/preset-env", {
      "modules": false,
      // 通过设置target预设插件对语法进行处理
      "targets": {
        "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
      },
      "useBuiltIns": "entry",
      "corejs": 3
    }]
  ]
}
