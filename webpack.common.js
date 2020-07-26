const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        'styles.css': [
          path.resolve(__dirname, './src/styles.scss')
        ],
        'bundle.js': [
          path.resolve(__dirname, './src/app.js')
        ]
    },
    output: {
        filename: '[name]',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            favicon: './src/images/favicon.png'
        }),
        new CleanWebpackPlugin(),
        new ExtractTextPlugin('bundle.css')
    ],
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: 'html-loader'
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.css/,
                loader: 'css!style!autoprefixer!?browsers=last 12 versions',
            }
        ]
    },
};