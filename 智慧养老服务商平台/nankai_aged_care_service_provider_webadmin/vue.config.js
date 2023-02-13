/**
 * @date 2019.11.27
 * @author 关宁
 * @describe vue-cli 4.x 配置文件
 */

const path = require('path')
const resolve = dir => path.resolve(__dirname, dir)
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i

module.exports = {
  // 部署应用包时的基本url
  publicPath: './',
  // 打包后生成的生产环境构建文件的目录
  outputDir: 'dist',
  // 放置生成的静态资源
  assetsDir: 'assets',
  // 是否开启 eslint 认证
  lintOnSave: true,
  // 指定生成的输出路径
  indexPath: 'index.html',
  // 生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存
  filenameHashing: true,
  parallel: require('os').cpus().length > 1,
  // 配置类型是Object 这也是多页面应用的所需要配置的
  pages: {
    index: {
      entry: 'src/main.js',
      // 模板来源
      template: 'public/index.html',
      filename: 'index.html',
      title: '首页',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
  },
  // 是否使用包含运行时编译器的 Vue 构建版本
  runtimeCompiler: false,
  // Babel 显式转译列表
  transpileDependencies: ['sl-vue-tre'],
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: false,
    // 开启 CSS source maps?是否在构建样式地图，false将提高构建速度
    sourceMap: false,
    // css预设器配置项
    loaderOptions: { css: {}, scss: {} },
    // 启用 CSS modules for all css / pre-processor files
    modules: false
  },

  // 基础配置项
  devServer: {
    open: true, // 配置自动启动浏览器
    host: '0.0.0.0', // 设置主机地址
    port: 8080, // 端口号
    hotOnly: false, // 热更新
    proxy: null, // 设置代理
    historyApiFallback: true,
    compress: true,
    https: false,
    before: app => {}
  },

  chainWebpack: (config) => {
    config.entry.app = ['@babel/polyfill', './src/main.js']
    // 修改文件引入自定义路径
    config.resolve.alias
      .set('@', resolve('src'))
      .set('static', resolve('static'))
      .set('&', resolve('theme'))
      .set('js', resolve('src/assets/js'))
      .set('base', resolve('src/assets/base'))
      .set('scss', resolve('src/assets/scss'))
      .set('plugin', resolve('src/component/plugin'))
      .set('store', resolve('src/store'))
      .set('directive', resolve('src/directive'))
      .set('template', resolve('src/component/template'))
    config.module
      // 压缩图片
      .rule('images').use('image-webpack-loader').loader('image-webpack-loader')
      .options({
        bypassOnDebug: true
      })
      .end()
  },

  configureWebpack: config => {
    if (IS_PROD) {
      const plugins = []
      // 开启 gzip 压缩
      plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: productionGzipExtensions,
          threshold: 10240,
          minRatio: 0.8
        })
      )
      config.plugins = [
        ...config.plugins,
        ...plugins
      ]
    }
  }
}
