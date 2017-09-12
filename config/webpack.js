'use strict';
// CONSTANTS
const ENV = process.env.NODE_ENV,
    isProd = ENV == 'production',
    path = require('path'),
    webpack = require('webpack');
// PLUGINS
const CopyWebpackPlugin = require('copy-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ImageminPlugin = require('imagemin-webpack-plugin').default,
    ProgressBarPlugin = require('progress-bar-webpack-plugin');
var config = {
    context: path.join(__dirname, '..'),
    devServer: {
        noInfo: true,
        hot: true,
        inline: true,
        historyApiFallback: true
    },
    // LOADERS
    module: {
        rules: [{ // ASSETS
            test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            use: [{
                loader: 'file-loader?name=fonts/[name].[hash].[ext]?'
            }]
        }, { // HTML
            test: /\.html$/,
            use: [{
                loader: 'html-loader'
            }]
        }, {
            // JS
            test: /\.js$/,
            use: [{
                loader: 'babel',
            }],
            exclude: [
                path.resolve(__dirname, '../node_modules'),
                path.resolve(__dirname, '../_dist')
            ]
        }, { // PUG
            test: /\.pug$/,
            use: [{
                loader: 'pug-html-loader'
            }]
        }, { // CSS
            test: /\.css$/,
            use: [{
                loader: 'css-loader'
            }]
        }, { // SCSS
            test: /\.scss$/,
            use: [{
                loader: "raw-loader"
            }, {
                loader: "sass-loader",
                options: {
                    sourceMap: true
                }
            }]
        }, { // TS
            test: /\.ts$/,
            use: [
                'awesome-typescript-loader',
                'angular2-template-loader',
                '@angularclass/hmr-loader',
                'angular2-router-loader'
            ]
        }]
    },
    // OUTPUT FILE
    output: {
        path: path.resolve(__dirname, '../_dist'),
        filename: 'bundle.js'
    },
    // PLUGINS
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        // NG2 HACK: angular/angular#11580
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            __dirname
        ),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': ENV
            }
        }),
        new webpack.ProvidePlugin({
            Hammer: 'hammerjs/hammer',
            jQuery: 'jquery',
            $: 'jquery',
            jquery: 'jquery'
        }),
        // BETTER PROGRESS INDICATORS IN TERMINAL DURING BUILDS
        new ProgressBarPlugin(),
        // ADD VENDOR MODULES TO SEPARATE FILE
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            minChunks: Infinity,
            filename: "commons.js"
        })
    ],
    resolve: {
        extensions: ['.ts', '.js', '.json', '.css', '.scss', '.html', '.pug', 'map']
    }
};
// ENV SPECIFIC SETTINGS
if (isProd) {
    console.log('SERVING PRODUCTION BUILD');
    config.devtool = 'cheap-module-source-map';
    config.entry = {
        vendor: [
            './app/polyfills.ts',
            './app/vendor.ts'
        ],
        app: [
            'webpack-hot-middleware/app?path=/__webpack_hmr&timeout=20000&noInfo=true&reload=true',
            './app/main.ts'
        ]
    };
    config.plugins.push(
        // Reference: http://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
        // Only emit files when there are no errors
        //new webpack.NoErrorsPlugin(),
        // // Reference: http://webpack.github.io/docs/list-of-plugins.html#dedupeplugin
        // // Dedupe modules in the output
        // new webpack.optimize.DedupePlugin(),
        // Reference: http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
        // Minify all javascript, switch loaders to minimizing mode
        new webpack.optimize.UglifyJsPlugin({
            comments: false,
            compress: true,
            mangle: false, // MANGLE BREAKS JQUERY
            sourceMap: true
        }),
        // A plugin for a more aggressive chunk merging strategy
        // https://webpack.github.io/docs/list-of-plugins.html#aggressivemergingplugin
        // new webpack.optimize.AggressiveMergingPlugin(),
        // https://github.com/Klathmon/imagemin-webpack-plugin
        new ImageminPlugin({
            disable: process.env.NODE_ENV !== 'production', // Disable during development
            pngquant: {
                quality: '95-100'
            }
        }),
        // Copy assets from the public folder
        // Reference: https://github.com/kevlened/copy-webpack-plugin
        new CopyWebpackPlugin([
            { from: 'assets', to: 'assets' },
            { from: 'config', to: 'config' }
        ])
    );
} else {
    console.log('SERVING DEVELOPMENT BUILD ');
    new webpack.NoEmitOnErrorsPlugin();
    //config.devtool = 'inline-source-map';
    config.devtool = 'cheap-module-source-map';
    config.entry = {
        vendor: [
            './app/polyfills.ts',
            './app/vendor.ts'
        ],
        app: [
            './app/boot.ts'
        ]
    };
    config.plugins.push(
        // new ExtractTextPlugin('css/styles.css', {
        //   allChunks: true
        // }),
        new CopyWebpackPlugin([
            { from: 'assets', to: 'assets' },
            { from: 'config', to: 'config' },
            { from: 'sw.js', to: 'sw.js' }
        ]),
        // new webpack.optimize.UglifyJsPlugin({
        //     comments: false,
        //     compress: true,
        //     mangle: false, // MANGLE BREAKS JQUERY
        //     sourceMap: true
        // }),
        new HtmlWebpackPlugin({
            filetype: 'pug',
            template: 'index.pug'
        })
    );
}

module.exports = config;
