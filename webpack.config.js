const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'client/index.js'),
  output: {
    path: path.resolve(__dirname, 'client/build'),
    filename: 'bundle.js'
  }, 
  devServer: {
    port:8080,
    publicPath: '/build',
    contentBase: path.join(__dirname, '/client'),
    proxy: {
      '/': 'http://localhost:3000/',
      '/airportFetch': 'http://localhost:3000/',
      '/events&activities': 'http://localhost:3000/'
    }
  },
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      { test: /\.jsx?/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/,
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react']
        }
      },
      { test: /\.s?css/i,
        exclude: /(node_modules|bower_components)/, 
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  }
};