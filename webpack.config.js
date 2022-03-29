const path = require('path');
const webpack = require('webpack');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const config = {
  entry: './src/index.js',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // condition1
        exclude: /(node_modules|bower_components)/, // condition2
        loader: 'babel-loader', // need transpiler
        options: { presets: ['@babel/env'] },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'], // can import css as style object, single transpiler use `loader`, multiple transpilers use `use`
      },
    ],
  },
  resolve: { extensions: ['*', '.js', '.jsx'] }, //? resolve allow us to import these files without extension.
  output: {
    path: path.resolve(__dirname, 'dist/'),
    publicPath: '/dist/',
    filename: 'bundle.js',
  },
  devServer: {
    static: { directory: path.join(__dirname, 'public/') },
    port: 3000,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new BundleAnalyzerPlugin({
      generateStatsFile: false,
    }),
  ],
};

module.exports = (env, argv) => {
  const mode = argv.mode;

  if (mode === 'production') {
    return Object.assign(config, {
      mode: 'production',
      plugins: [],
    });
  }
  return config;
};
