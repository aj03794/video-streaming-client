const path = require("path");
const webpack = require("webpack");
const htmlWebpackPlugin = require('html-webpack-plugin')
const miniCssExtract = require('mini-css-extract-plugin')
const webpackMd5 = require('webpack-md5-hash')
const cleanWebpackPlugin = require('clean-webpack-plugin')

const isDev = process.env.ENV === 'dev'
const styleLoader = isDev ? 'style-loader' : miniCssExtract.loader

module.exports = {
    entry: ['@babel/polyfill', './src/index.js'],
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].[hash].js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                loader: "babel-loader",
                options: { presets: ["@babel/env"] }
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    styleLoader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    resolve: { extensions: ["*", ".js", ".jsx"] },
    devServer: {
        contentBase: path.join(__dirname, "dist/"),
        port: 3000,
        publicPath: "http://localhost:3000/dist/",
        hotOnly: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new htmlWebpackPlugin({
            inject: false,
            hash: true,
            template: './src/infrastructure/external-interfaces/react-ui/index.html',
            filename: 'index.html',
            title: 'Coopie Cam'
        }),
        new miniCssExtract({
            filename: isDev ? '[name].css' : '[name].[hash].css',
            chunkFilename: isDev ? '[id].css' : '[id].[hash].css'
        }),
        new webpackMd5(),
        new cleanWebpackPlugin()
    ]
}