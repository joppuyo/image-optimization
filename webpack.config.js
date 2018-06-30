var webpack = require('webpack');

module.exports = {
  entry: {
    script: './src/js/script.js',
  },
  output: { path: __dirname, filename: '[name].bundle.js' },
  resolve: {
    extensions: ['*', '.js'],
  },
  devtool: 'inline-source-map',
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'window.$': 'jquery',
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
    ],
  },
};
