var webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: './src/main.js'
    },
    output: {
        path: './dist',
        publicPath: process.env.NODE_ENV == 'production' ? '' : '/dist/',
        filename: 'vue-ruler.js',
        library: 'VueRuler',
        libraryTarget: 'umd'
    },
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js'
        }
    },
    module: {
        loaders: [{
                test: /\.vue$/,
                loader: 'vue'
            },
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'file?name=[name].[ext]?[hash]'
            }
        ]
    },
    babel: {
        presets: ['es2015', 'es2017'],
        plugins: ['transform-runtime', 'transform-class-properties']
    }
}


module.exports.plugins = [
    new HtmlWebpackPlugin({
        filename: '../demo/index.html',
        template: './demo/demo.html',
        inject: 'true'
    })
];

if (process.env.NODE_ENV === 'production') {
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify("production")
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin()
    ]);
} else {
    module.exports.devtool = 'eval-source-map'
}