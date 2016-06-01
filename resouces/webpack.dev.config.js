var path = require('path'),
    webpack = require('webpack');

var SRC_PATH = path.join(__dirname, 'src'),
    DIST_PATH = path.join(__dirname, '../static');


var config = {
	context: SRC_PATH,
    entry: {
        app: './app/app.js',
        form: path.join(SRC_PATH, 'app/form.js'),
        router: path.join(SRC_PATH, 'app/router.js'),
        vendors: [
            'babel-polyfill',
            'zone.js/dist/zone',
            '@angular/core',
            '@angular/platform-browser-dynamic',
            '@angular/common',
            '@angular/router'
        ]
    },

    resolve: {
        alias: {},
        extensions: ['', '.less', '.css', '.js', '.json']
    },

    output: {
        path: DIST_PATH,
        publicPath: '/static/',
        filename: 'js/[name].js'
    },

    clearBeforeBuild: true,

    plugins: [
        new webpack.optimize.CommonsChunkPlugin(
            'vendors',
            'js/vendors.js', // vendor date
            Infinity
        ),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
            '__DEV__': true
        })

    ],

    module: {
        noParse: [],

        loaders: [{
                test: /\.js$/,
                loader: 'babel',
                query: {
                    plugins: ['angular2-annotations','babel-plugin-transform-decorators-legacy'],
                    presets: ['es2015', 'angular2','stage-0']
                },

                exclude: /node_modules/
            },

            {
                test: /\.css$/,
                loader: 'style!css!autoprefixer!less',
                exclude: /node_modules/
            },

            {
                test: /\.less$/,
                loader: 'style!css!autoprefixer!less',
                exclude: /node_modules/
            },

            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url',
                query: {
                    limit: 8192,
                    name: 'imgs/[name].[ext]'
                }
            },

            {
                test: /\.(eot|woff|woff2|ttf|svg)((\?|\#)[\?\#\w\d_-]+)?$/,
                loader: 'url',
                query: {
                    limit: 100,
                    name: 'fonts/[name].[ext]'
                }
            }
        ]
    }
};


console.log('initializing webpack developent build....');

module.exports = config;
