const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const config = {
  entry: {
    gcharts: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'lib'),
    libraryTarget: 'umd',
    library: "gcharts",
    umdNamedDefine: true,
    filename: "[name].js"
  },
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      '@': path.resolve('src')
    }
  },
  module: {
    rules: [{
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(less|scss|css)$/,
        use: [{
            loader: "css-loader",
            options: {
              minimize: true //css压缩
            }
          },
          {
            loader: "less-loader",
            options: {
              minimize: true //css压缩
            }
          },
          {
            loader: "sass-loader",
            options: {
              minimize: true //css压缩
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new CleanWebpackPlugin(['lib']),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      comments: false,
      compress: {
        warnings: false,
        drop_console: true,
        collapse_vars: true,
        reduce_vars: true,
      }
    })
  ]
};

module.exports = config;