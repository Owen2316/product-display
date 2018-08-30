const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./common.js');

module.exports = merge(common, {
    devtool: 'eval-source-map',
    mode: 'development',
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
});
