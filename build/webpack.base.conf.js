var path = require('path')
var entry = require('./getentry')
var config = require('../config')
var utils = require('./utils')
var projectRoot = path.resolve(__dirname, '../')
var entries = entry.getEntry('src/js/*.js');
console.log('entries', entries);
module.exports = {
  entry: entries,
  output: {
    path: config.build.assetsRoot,// dist
    publicPath: config.build.assetsPublicPath,
    filename: 'static/js/[name].js',
  },
  resolve: {
    extensions: ['', '.js', '.vue'],
    fallback: [path.join(__dirname, '../node_modules')],
    alias: {
      'src': path.resolve(__dirname, '../src'),
      'component': path.resolve(__dirname, '../src/component')
    }
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /vux.src.*?js$/,
        loader: 'babel'
      },
       {
         test: /\.json$/,
         loader: 'json'
       },
      {
        test: /\.html$/,
        loader: 'vue-html'
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('[name].[hash:7].[ext]')
        }
      }
    ]
  },
  eslint: {
    /* 语法检测时,报错信息的**友好**展示 */
    formatter: require('eslint-friendly-formatter')
  },
  vue: {
    loaders: utils.cssLoaders()
  }
}
