const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin/lib/index');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const APP_PATH = path.resolve(__dirname, 'src');

function srcPath(subdir) {
    return path.join(__dirname, "src", subdir);
}

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: APP_PATH,

  devServer: {
    contentBase: "./dist",
    port: process.env.PORT 
  },
  
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },

  resolve: {
    modules: ['node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      assets: srcPath('assets'),
      logger: path.resolve(__dirname, 'src/util/logger'),
      shared: path.resolve(__dirname, '../shared')
    }
  },

  module: {
    rules: [
      { test: /\.(ts|js)x?$/, loader: 'babel-loader', exclude: /node_modules/ },
      {
         test: /\.css$/,
         use: [
           'style-loader',
           'css-loader'
         ]
       },
             {
         test: /\.(png|svg|jpg|gif)$/,
         use: [
           'file-loader'
         ]
       },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      }
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({ inject: true, template: path.join(path.resolve(__dirname, 'public'), 'index.html') }),
    new ForkTsCheckerWebpackPlugin(),
  ]
};
