const path = require('path')
const webpack = require('webpack')
const appName = 'elemental'
const outputFile = appName + '.js'
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const PATH = {
  source: path.join(__dirname, 'src'),
  dist: path.join(__dirname, 'dist'),
  entry: path.join(__dirname, 'src', 'index.js')
}

const config = {
  entry: PATH.entry,
  devtool: 'inline-source-map',
  output: {
    path: PATH.dist,
    filename: outputFile,
    library: [appName],
    libraryTarget: 'umd',
    externals: {
      'react': 'react',
      'react-dom': 'react-dom'
    }
  },
  module: {
    loaders: [{
      test: /\.scss$/,
      include: __dirname,
      loaders: [
        'style',
        'css',
        'sass'
      ]
    }, {
      test: /(\.jsx|\.js)$/,
      loader: 'babel',
      exclude: /node_modules/,
      query: {
        presets: ['react', 'es2015', 'stage-1']
      }
    }, {
      test: /(\.jsx|\.js)$/,
      loader: 'eslint-loader',
      exclude: /node_modules/
    }, {
      test: /.*\.(gif|png|jpe?g|svg)$/i,
      loaders: [
        'file?hash=sha512&digest=hex&name=[hash].[ext]',
        'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
      ]
    }, {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&mimetype=application/octet-stream'
    }, {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'file'
    }, {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&mimetype=image/svg+xml'
    }]
  },
  resolve: {
    root: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'node_modules')],
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new ExtractTextPlugin('styles.css'),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
}

module.exports = config
