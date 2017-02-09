var path = require('path')
var config = require('../config')
var utils = require('./utils')
var entry = require('./getentry')
var webpack = require('webpack')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var chunks = Object.keys(baseWebpackConfig.entry);
var prodConfig = merge(baseWebpackConfig, {
  module: {
    loaders: utils.styleLoaders({ sourceMap: config.build.productionSourceMap, extract: true })
  },
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.build.assetsRoot,

    filename: 'static/js/[name].[chunkhash].js',
    chunkFilename: 'static/js/[id].chunk.js?[chunkhash]'
  },
  vue: {
    loaders: utils.cssLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        drop_debugger: process.env.NODE_ENV === 'production',
        drop_console: process.env.NODE_ENV === 'production',
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new ExtractTextPlugin('static/css/[name].[contenthash].css'),
    new CommonsChunkPlugin({
      name: 'vendors',
      chunks: chunks,
      minChunks: chunks.length
    })
  ]
})
var pages = Object.keys(entry.getEntry('src/view/*.html', 'src/view/'));
pages.forEach(function(pathname) {
  var conf = {
    filename: config.build.assetsRoot+'/view/' + pathname + '.html', //生成的html存放路径，相对于path
    template: 'src/view/' + pathname + '.html', //html模板路径
    inject: 'body'
  };
  if (pathname in baseWebpackConfig.entry) {
    conf.inject = 'body';
    conf.chunks = ['vendors', pathname];
    conf.hash = true;
  }
  prodConfig.plugins.push(new HtmlWebpackPlugin(conf));
});
module.exports = prodConfig;