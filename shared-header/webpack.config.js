const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

const isStandalone = process.env.STANDALONE === 'true';

module.exports = {
  entry: './src/bootstrap.tsx',
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  devServer: {
    port: 3002,
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
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'shared_header',
      filename: 'remoteEntry.js',
      exposes: {
        './HeaderApp': './src/HeaderApp',
      },
      shared: {
        react: {
            singleton: true,
            requiredVersion: '^18.2.0',
            eager: true
        },
        'react-dom': {
            singleton: true,
            requiredVersion: '^18.2.0',
            eager: true
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
