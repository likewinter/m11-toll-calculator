/*eslint-env es6 */
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var webpack = require('webpack');
var isProduction = process.env.NODE_ENV === 'production';

var plugins = [];
var pluginsCommon = [
    new ExtractTextPlugin('css/styles.css'),
    new webpack.optimize.CommonsChunkPlugin('vendors', 'js/vendors.js')
];
if (isProduction) {
  plugins = [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    ...pluginsCommon
  ]
} else {
  plugins = pluginsCommon;
}

var publicPath = isProduction ? '/m11/' : 'http://localhost:8080/';

module.exports = {
  entry: {
    bundle: './scripts/main.js',
    vendors: ['vue', 'vue-router', 'isomorphic-fetch', 'lodash', 'bootstrap.native']
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    publicPath,
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
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('css!less')
      }, {
        test: /\.(ttf|eot|svg|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file?name=fonts/[name].[ext]'
      },
    ],
  },
  resolve: {
    extensions: ['', '.vue', '.js', '.less'],
    alias: {
      'assets': path.resolve(__dirname, 'assets'),
      'components': path.resolve(__dirname, 'assets/components')
    }
  },
  plugins,
  babel: {
    presets: ['es2015', 'stage-0'],
    plugins: ['transform-runtime']
  },
  devServer: {
    inline: true,
    historyApiFallback: true,
    quiet: true,
    contentBase: 'public/'
  }
}
