const merge = require('webpack-merge');
const webpack = require('webpack');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const common = require('./common.js');

module.exports = merge(common, {
    mode: 'production',
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            minimize: true
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        }),
        new MinifyPlugin()
    ]
});
