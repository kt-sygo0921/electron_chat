// global require
const webpack = require('webpack');

const config = {
    entry: {
        'common': './src/js/common.js'
        // 'activation': './src/js/activation.js',
        // 'admission': './src/js/admission.js',
        // 'basket': './src/js/basket.js',
        // 'detail': ['babel-polyfill', './src/js/detail.js'],
        // 'error': './src/js/error.js',
        // 'gamelist': './src/js/gamelist.js',
        // 'help': './src/js/help.js',
        // 'leftnavi': './src/js/leftnavi.js',
        // 'mygame': './src/js/mygame.js',
        // 'profile': './src/js/profile.js',
        // 'review': './src/js/review.js',
        // 'top': ['babel-polyfill','./src/js/top.js'],
        // 'update': './src/js/update',
        // 'guide': ['babel-polyfill','./src/js/guide.js']
    },
    output: {
        filename: '[name].min.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'eslint-loader',
                options: {
                    fix: true,
                    failOnError: true
                }
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true
        })
    ]
};

module.exports = config;
