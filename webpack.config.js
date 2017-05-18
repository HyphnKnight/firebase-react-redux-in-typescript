const path = require('path');
const webpack = require('webpack');

module.exports = {

  entry: {
    index: './src/index.tsx'
  },

  output: {
    path: path.resolve(__dirname, 'docs'),
    filename: '[name].js',
  },

  module: {

    rules: [

      { // Eslint Loader
        test: /.*\.jsx?/,
        exclude: /node_modules/,
        enforce: 'pre',
        use: 'eslint-loader',
      },

      {
        test: /\.tsx?$/,
        use: 'awesome-typescript-loader',
        enforce: 'pre',
      },

      { // Javascript Loader
        test: /.*\.(j|t)sx?/,
        exclude: /node_modules/,
        use: [
          { // Babel Loader
            loader: 'babel-loader',
            options: {
              presets: ['es2015', 'es2017', 'react'],
              plugins: ['transform-flow-strip-types', 'react-html-attrs', 'transform-class-properties', 'transform-runtime']
            }
          }
        ]
      },

      { // Style Loader
        test: /\.css|\.scss|\.sass/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },

      /* Asset Loaders */

      { // File Loader
        test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
        exclude: /node_modules/,
        loader: 'file-loader?name=[name].[hash].[ext]'
      },

      { // Image Loader
        test: /\.(jpe?g|png|gif|svg)$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
              optimizationLevel: 7,
              interlaced: false
            }
          },
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash].[ext]'
            }
          }
        ]
      },

      { // JSON Loader
        test: /.*\.json$/,
        exclude: /node_modules/,
        loader: 'json-loader'
      }

    ]

  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    })
  ].concat(process.env.NODE_ENV !== 'production' ? [] :
    [
      //new webpack.optimize.CommonsChunkPlugin( { name: 'common', minChunks: 2 } ),
      new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } })
    ]
    ),

  performance: {
    hints: process.env.NODE_ENV == 'production' ? 'warning' : false
  },

  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: [
      '.js',
      '.jsx',
      '.ts',
      '.tsx',
      '.css',
      '.scss',
      '.sass',
      '.json'
    ]
  },

  devtool: process.env.NODE_ENV !== 'production' ? 'eval-source-map' : 'source-map',

  devServer: {
    contentBase: path.join(__dirname, 'docs'),
    compress: true,
    port: 8000
  }

};
