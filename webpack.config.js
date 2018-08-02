var webpack = require('webpack');
var path = require('path');
const { resolve } = require('path');
const tsImportPluginFactory = require('ts-import-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

var BUILD_DIR = path.resolve(__dirname, './dist/client');
var APP_DIR = path.resolve(__dirname, './client');

const config = {
    entry: {
        main: APP_DIR + '/src/index.tsx'
    },
    output: {
        filename: 'bundle.js',
        path: BUILD_DIR,
    },
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    module: {
        rules: [
            {
                enforce: "pre",                
                test: /\.(ts|tsx)?$/, 
                loader: 'tslint-loader',
                exclude: [resolve(__dirname, "node_modules")],
            },             
            { 
                test: /\.(ts|tsx)?$/, 
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                            getCustomTransformers: () => ({
                              before: [ tsImportPluginFactory({
                                libraryName: 'antd',
                                libraryDirectory: 'es',
                                style: 'css',
                              }) ]
                            }),
                            compilerOptions: {
                              module: 'es2015'
                            }
                        },
                    }, 
                ],
                exclude: [resolve(__dirname, "node_modules")],                
            },
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
            {
                test:/\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]  
            },
            {
                test:/\.less$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"]
            },
            { test: /\.png$/, loader: "url-loader?limit=100000" },
            { test: /\.jpg$/, loader: "file-loader" },
            { test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/octet-stream' },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader' },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml' }            
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "style.css",
            chunkFilename: "[id].css"
          }),
        // enable HMR globally
        new webpack.NamedModulesPlugin(),
        // prints more readable module names in the browser console on HMR updates
        new HtmlWebpackPlugin({template: resolve(__dirname, 'client/src/index.html')}),
        // inject <script> in html file. 
    ],
};

module.exports = config;