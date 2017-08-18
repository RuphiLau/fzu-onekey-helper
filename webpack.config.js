const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        app: path.join(__dirname, 'src/app.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[hash].bundle.js'
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new ExtractTextWebpackPlugin('style.css'),
        new HtmlWebpackPlugin({
            title: '福大评议助手',
            template: path.join(__dirname, 'src/templates/index.html'),
            filename: path.join(__dirname, 'index.html')
        })
    ],
    module: {
        rules: [
            {
                test: /\.(less|css)$/,
                use: ExtractTextWebpackPlugin.extract({
                    use: ['css-loader', 'less-loader']
                })
            },
            {
                test: /\.(png|jpg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192
                    }
                }]
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'react']
                    }
                }
            }
        ]
    }
};