const path = require('path');
const dist = path.resolve('./dist');
const src = path.resolve('./src');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const entry = {
    home: `${src}/index.js`,
    attribute: `${src}/Attribute/index.js`,
    category: `${src}/Category/index.js`
};

const htmlList = () => {
    const list = [];
    Object.keys(entry).forEach(key => {
        const filename = key === 'home' ? './index.html' : `./${key}/index.html`;
        const plugin = new HtmlWebpackPlugin({
            // Inject: false,
            chunks: ['vendors', key],
            title: key.replace(/[a-z]/, w => w.substring(0, 1).toUpperCase() + w.substring(1)),
            filename,
            template: `${src}/index.html`
        });
        list.push(plugin);
    });

    return list;

};

module.exports = {
    entry,
    output: {
        path: dist,
        filename: '[name]/index.js'
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    chunks: 'initial',
                    name: 'vendors',
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                }
            }
        }
    },

    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.(js|jsx)$/,
                include: [
                    src
                ],
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                include: [
                    src
                ],
                loader: 'css-loader'
            },
            {
                test: /\.scss/,
                include: [
                    src
                ],
                loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded'
            },
            {
                test: /\.html/,
                include: [
                    src
                ],
                loader: 'html-loader'
            }
        ]
    },
    resolve: {
        modules: [path.resolve('./node_modules')],
        alias: {
            actions: path.resolve('./src/actions/'),
            reducers: path.resolve('./src/reducers/'),
            stores: path.resolve('./src/stores/'),
            components: path.resolve('./src/components/'),
            containers: path.resolve('./src/containers/')
        }
    },
    plugins: [
        new CleanWebpackPlugin(dist, {
            root: '/..'
        }),
        ...htmlList(),
        new CopyWebpackPlugin()
    ]
};
