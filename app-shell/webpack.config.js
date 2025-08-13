const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

const { DefinePlugin } = require('webpack');

const REMOTE_SHARED_HEADER = process.env.REMOTE_SHARED_HEADER || 'http://localhost:3002/remoteEntry.js';

module.exports = {
  entry: './src/index.tsx',
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  devServer: {
    port: 3001,
    historyApiFallback: true,
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'auto',
    clean: true,
  },
  resolve: {
    alias: {
      react: path.resolve(__dirname, './node_modules/react'),
      'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
    },
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      },
    ],
  },
  plugins: [
    new DefinePlugin({
      REMOTE_SHARED_HEADER: JSON.stringify(REMOTE_SHARED_HEADER) || 'http://localhost:3002/remoteEntry.js',
    }),
    new ModuleFederationPlugin({
      name: 'app-shell',
      remotes: {
        shared_header: `shared_header@${REMOTE_SHARED_HEADER}`
      },
      shared: {
        react: {
            singleton: true,
            requiredVersion: '^18.2.0',
            eager: true,
        },
        'react-dom': {
            singleton: true,
            requiredVersion: '^18.2.0',
            eager: true,
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
