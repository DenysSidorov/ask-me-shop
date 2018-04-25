var path = require('path');
var webpack = require('webpack');
var env = 'development';
var config = {
  context: path.resolve(__dirname, './src'),
  entry: './app.js',
  output: {
    path: path.resolve(__dirname, './www'),
    filename: 'build.js',
    publicPath: '/'
  },

  module: {
    loaders: [
      {test: /\.html$/, use: 'vue-template-loader'},
      {test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/},
      {
        test: /\.vue$/, loader: 'vue-loader',
        options: {
          loaders: {
            scss: 'style-loader!css-loader!sass-loader'
          }
        }
      },
      {test: /\.(png|jpg|gif)$/, loader: 'file?name=[name].[ext]?[hash]',},
      {test: /\.styl$/i, use: ['style-loader', 'css-loader', 'stylus-loader']}
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"development"'
        }
      }
    )
  ],
  devServer: {
    hot: true,
    host: "localhost",
    port: 8088,
    contentBase: path.join(__dirname, 'www'),
    // proxy: [{
    //     path: '*',
    //     target: 'http://localhost:3000',
    // }]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'  // Resolving the vue var for standalone build
    }
  },
}
module.exports = config;
