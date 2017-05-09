const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const entry = {
    dev: {
        app: [
            'webpack-dev-server/client?http://localhost:8080',
            'webpack/hot/only-dev-server',
            path.resolve(__dirname, 'src/scripts/index.js'),
        ],
    },
    prod: {
        app: [
            path.resolve(__dirname, 'src/scripts/index.js'),
        ],
    },
};

const plugins = {
    base: [
        new webpack.ProvidePlugin({
            Promise: 'es6-promise',
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/index.html'),
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'production'),
            },
        }),
    ],
    dev: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
    ],
};

module.exports = (env = {}) => ({
    context: path.resolve(__dirname, 'src'),
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        historyApiFallback: true,
        host: process.env.IP || 'localhost',
        hot: true,
        publicPath: '/',
        stats: 'minimal',
    },
    devtool: env.prod ? 'source-map' : 'eval',
    entry: env.prod ? entry.prod : entry.dev,
    module: {
        rules: [
            {
                include: path.resolve(__dirname, 'src'),
                test: /\.(js|jsx)$/,
                use: [{ loader: 'babel-loader' }],
            },
            {
                test: /\.css$/,
                use: ['style-loader', { loader: 'css-loader', options: { importLoaders: 1 } }],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                use: [{
                    loader: 'file-loader',
                    options: { name: './dist/fonts/[name].[ext]' },
                }],
            },
            {
                test: /.*\.(gif|png|jpe?g|svg)$/i,
                use: [{
                    loader: 'file-loader',
                    options: { name: './dist/media/[name].[ext]' },
                }, {
                    loader: 'image-webpack-loader',
                    query: {
                        interlaced: false,
                        optimizationLevel: 7,
                        pngquant: { quality: '85-90', speed: 4 },
                        progressive: true,
                    },
                }],
            },
        ],
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        pathinfo: true,
        publicPath: './',
    },
    plugins: env.prod ? plugins.base : plugins.base.concat(plugins.dev),
    resolve: {
        alias: {
            base: path.resolve(__dirname, 'src/scripts/base'),
            components: path.resolve(__dirname, 'src/scripts/components'),
            constants: path.resolve(__dirname, 'src/scripts/constants.js'),
            containers: path.resolve(__dirname, 'src/scripts/containers'),
            forms: path.resolve(__dirname, 'src/scripts/forms'),
            helpers: path.resolve(__dirname, 'src/scripts/helpers.js'),
            services: path.resolve(__dirname, 'src/scripts/services'),
            styles: path.resolve(__dirname, 'src/scripts/styles'),
        },
    },
});
