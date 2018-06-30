var webpack = require('webpack');

module.exports = {
  entry: {
    script: './src/js/script.js',
  },
  output: { path: __dirname, filename: '[name].bundle.js' },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
    },
  },
  devtool: 'inline-source-map',
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'window.$': 'jquery',
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks(module, count) {
        var context = module.context;
        return context && context.indexOf('node_modules') >= 0;
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015'],
          },
        },
      },
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader',
          options: {
            loaders: {
              js: {
                loader: 'babel-loader',
                options: {
                  presets: ['es2015'],
                },
              },
            },
          },
        },
      },
      {
        test: /\.svg$/,
        use: {
          loader: 'raw-loader',
        },
      },
    ],
  },
};
