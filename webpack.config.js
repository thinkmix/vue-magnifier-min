const webpack = require("webpack");
const webpackMerge = require("webpack-merge");
const path = require('path');
const cleanWebpackPlugin = require("clean-webpack-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const htmlWebpackPlugin = require("html-webpack-plugin")
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const pkg = require('./package.json');

const webpackConfBase =  {
  module: {
    rules: [
      {
        test: /\.(css|scss|sass)$/,
        use: ["vue-style-loader","css-loader","sass-loader","postcss-loader"]
      },
      {
        test: /\.vue$/,
        use: ['vue-loader']
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [{
          loader: "url-loader",
          options: {
            limit: 5 * 1024,
            outputPath: "assets/img"
          }
        }]
      },
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new htmlWebpackPlugin({
      filename: 'demo/index.html',
      template: path.join(__dirname, './public/index.html'),
      inject: true,
      chunksSortMode: 'dependency'
    }),
    new webpack.DefinePlugin({
      'process.env.VERSION': `'${pkg.version}'`
    }),
  ],
}

const webpackConfProd = {
  entry: process.env.NODE_ENV == 'demo' ? './src/main.js'　:　'./src/index.js',
  mode: 'production',
  output: {
    path: path.resolve(__dirname, './dist'), 
    publicPath: '/mylib/vue-magnifier-min/',
    filename: process.env.NODE_ENV == 'demo' ? 'demo/[name].[hash].js' : 'vue-magnifier-min.min.js',
    library: 'vue-magnifier-min',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  devtool: false,
  plugins: [
		new OptimizeCSSPlugin({
			cssProcessorOptions: {
				safe: true
			}
		}),
		new UglifyJSPlugin({
			uglifyOptions: {
				compress: {
					warnings: false,
					drop_debugger: false,
					dead_code: true,
					drop_console: true
				}
			}
		}),
		new CompressionWebpackPlugin({
			asset: '[path].gz[query]',
			algorithm: 'gzip',
			test: /\.(js|css)$/,
			threshold: 10240,
			minRatio: 0.8
    }),
    // new cleanWebpackPlugin(['./dist']),
  ]
}

const webpackConfDev = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: './js/[name].bundle.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  devtool: "#source-map",
  devServer: {
    publicPath: '/',
    host: '',
    port: 8088,
    overlay: true,
    open: true,
    stats: "errors-only",
    hot: true,
    proxy: {}
  },
}

let webpackConfig;
if(process.env.NODE_ENV == 'production' || process.env.NODE_ENV == 'demo'){
  webpackConfig = webpackMerge(webpackConfBase, webpackConfProd)
}else if(process.env.NODE_ENV == 'development'){
  webpackConfig = webpackMerge(webpackConfBase, webpackConfDev)
}

module.exports = webpackConfig