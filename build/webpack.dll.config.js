var path = require('path');
var webpack = require('webpack');
module.exports = {
    entry: {
        vendor: ['vue']
    },
    output: {
        path: path.join(__dirname, '../static/js'),
        filename: 'dll.[name].js',
        library: '[name]'
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, 'dll', '[name]-manifest.json'),
            name: '[name]',
            context: path.resolve(__dirname, 'client')
        }),
        new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
        })
    ]
};