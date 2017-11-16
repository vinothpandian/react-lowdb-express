const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const package = require('../package.json');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');

const paths = {
    DIST: path.resolve(__dirname, '../dist'),
    SRC: path.resolve(__dirname, '../src'),
    JS: path.resolve(__dirname, '../src/js')
};

module.exports = {
    context: paths.SRC,
    entry: {
        app: path.join(paths.JS, 'app.js'),
        vendor: Object.keys(package.dependencies)
    },
    output: {
        path: paths.DIST,
        filename: "[name].bundle.js",
        publicPath: "/"
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common' // Specify the common bundle's name.
        }),
        new HtmlWebpackPlugin({
            template: path.join(paths.SRC, 'index.html'),
            minify: {
                collapseWhitespace: true,
                collapseInlineTagWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true
            }
        }),
        new ExtractTextPlugin('style.bundle.css'),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            Popper: ['popper.js', 'default'],
        }),
    ],

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }, {
                test: /\.(css)$/,
                loader: ExtractTextPlugin.extract({use: 'css-loader'})
            }, {
                test: /\.(png|jp(e*)g)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8000, // Convert images < 8kb to base64 strings
                            name: 'images/[hash]-[name].[ext]'
                        }
                    }
                ]
            }, {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                // Limiting the size of the woff fonts breaks font-awesome ONLY for the extract text plugin
                // loader: "url?limit=10000"
                use: "url-loader?limit=10000&mimetype=application/font-woff"
            }, {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: 'file-loader'
            }, {
                test: /\.(scss|sass)$/,
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader'
                }, {
                    loader: 'postcss-loader',
                    options: {
                        plugins: function () {
                            return [
                                require('precss'),
                                require('autoprefixer')
                            ];
                        }
                    }
                }, {
                    loader: 'sass-loader'
                }]
            }
        ]
    },

    resolve: {
        extensions: ['.js', '.jsx']
    },


};
