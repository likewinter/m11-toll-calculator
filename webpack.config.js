var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    bundle: './scripts/main.js',
    vendors: ['vue', 'vue-resource', 'vue-router', 'lodash']
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    publicPath: 'http://localhost:8080/',
    filename: 'js/[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      }, {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['stage-0', 'es2015']
        }
      }, {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      }, {
        test: /\.(ttf|eot|svg|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file?name=fonts/[name].[ext]'
      },
    ],
  },
  resolve: {
    extensions: ['', '.vue', '.js'],
    alias: {
      'assets': path.resolve(__dirname, 'assets'),
      'components': path.resolve(__dirname, 'assets/components')
    }
  },
  plugins: [
    new ExtractTextPlugin('css/styles.css'),
    new webpack.optimize.CommonsChunkPlugin('vendors', 'js/vendors.js')
  ],
  babel: {
    presets: ['es2015', 'stage-0'],
    plugins: ['transform-runtime']
  }
}