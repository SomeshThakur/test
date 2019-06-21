const HtmlWebPackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const path = require('path')
module.exports = {
    entry: [
        'whatwg-fetch',
        "@babel/polyfill",
        './src/index.js'
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                // include: [path.resolve(__dirname, "src")],
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-env"],
                }

            },
            {
                test: /\.html$/,
                loader: "html-loader",
            },
            {

                test: /\.scss$/,
                use: [
                    // style-loader
                    {
                        loader: 'style-loader'
                    },
                    // css-loader
                    {
                        loader: 'css-loader',
                    },
                    // sass-loader
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
    ],
    output: {
        filename: 'bundle.js',
        path: __dirname + '/dist'
    },
}
