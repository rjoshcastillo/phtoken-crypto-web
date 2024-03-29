const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const path = require('path');
const devMode = process.env.NODE_ENV === 'development'
const SRC_DIR = __dirname + '/CLIENT/src';
const DIST_DIR = __dirname + '/CLIENT/dist';
const PUBLIC_DIR = __dirname + '/CLIENT/public';
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: [
        SRC_DIR + '/index.js',
    ],
    output: {
        path: path.resolve(DIST_DIR),
        filename: '[name].bundle.js',
        publicPath: '/',
    },
    optimization: {
        splitChunks: {
          chunks: 'all',
        },
    },
    module: {
        rules: [
            {
                test: /\.(html)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'html-loader',
                    options: { minimize: true }
                }
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(css|scss)$/,
                use: [
                    devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            /* importLoaders: 2,
                            modules: {
                                localIdentName: "[hash:base64:5]"
                            }, */
                            sourceMap: devMode
                        },
                    },
                    "sass-loader"
                ],
            },
            {
                test: /\.(png|jp(e*)g|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            limit: 8000,
                            name: 'images/[name].[ext]',
                            publicPath: '/'
                        }
                    }
                ]
            },
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx','.scss']
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new Dotenv({
            systemvars: true,
            path: `./.env`
        }),
        new HtmlWebpackPlugin({
            template: PUBLIC_DIR + '/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
             filename: 'styles/[name].module.css',
             chunkFilename: 'styles/[id].module.css'
        })
    ],
    devServer: {
        static: DIST_DIR,
        port: 3001,
        historyApiFallback: true,
    }
};