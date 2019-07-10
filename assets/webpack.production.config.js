const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const config = {
  devtool: 'cheap-module-source-map',

  entry: [
    './main.js',
    './assets/scss/index.scss',
  ],

  context: resolve(__dirname, 'app'),

  resolve: {
    alias: {
      components: resolve(__dirname, 'app/components/index.js'),
      reducers: resolve(__dirname, 'app/reducers'),
      actions: resolve(__dirname, 'app/actions'),
      config: resolve(__dirname, 'app/config'),
      store: resolve(__dirname, 'app/store'),
      utils: resolve(__dirname, 'app/utils'),
      sagas: resolve(__dirname, 'app/sagas'),
    },
  },


  output: {
    filename: 'js/app.js',
    path: resolve(__dirname, '../priv/static'),
    publicPath: '/',
  },

  optimization: {
    minimizer: [

      new UglifyJsPlugin({
        uglifyOptions: {
          // beautify: false,
          // mangle: {
          //   screw_ie8: true,
          //   keep_fnames: true,
          // },
          compress: {
            booleans: true,
            // screw_ie8: true,
          },
          output: {
            comments: false,
          },
          minify: {},
        }
      }),
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: `${__dirname}/app/index.html`,
      filename: 'index.html',
      inject: 'body',
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify('production') } }),
    // new MiniCssExtractPlugin({ filename: 'css/style.css'}),
    new ExtractTextPlugin({ filename: 'css/style.css', disable: false, allChunks: true }),
    new CopyWebpackPlugin([{ from: './vendors', to: 'vendors' }]),
  ],

  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
        }]
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            { loader: 'sass-loader', query: { sourceMap: false } },
          ],
        }),

        // use: [
        //   MiniCssExtractPlugin.loader,
        //   'css-hot-loader',
        //   'css-loader',
        //   'sass-loader',
        // ],

        // use: MiniCssExtractPlugin.extract({
        //   fallback: 'style-loader',
        //   use: [
        //     'css-loader',
        //     { loader: 'sass-loader', query: { sourceMap: false } },
        //   ],
        // }),
      },
      { test: /\.css$/, loader: ['style-loader', 'css-loader'] },
      { test: /\.(png|jpg)$/, use: 'url-loader?limit=15000' },
      { test: /\.svg$/, loader: 'url-loader?limit=65000&mimetype=image/svg+xml&name=fonts/[name].[ext]' },
      { test: /\.woff$/, loader: 'url-loader?limit=65000&mimetype=application/font-woff&name=fonts/[name].[ext]' },
      { test: /\.woff2$/, loader: 'url-loader?limit=65000&mimetype=application/font-woff2&name=fonts/[name].[ext]' },
      { test: /\.[ot]tf$/, loader: 'url-loader?limit=65000&mimetype=application/octet-stream&name=fonts/[name].[ext]' },
      { test: /\.eot$/, loader: 'url-loader?limit=65000&mimetype=application/vnd.ms-fontobject&name=fonts/[name].[ext]' },
    ],
  },
};

module.exports = config;
