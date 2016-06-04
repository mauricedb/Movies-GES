var webpack = require('webpack');

module.exports = {
    entry: {
        'movie-management': ['./movie-management/app.jsx'],
        'vendor-bundle': Object.keys(require('./package.json').dependencies)
    },
    output: {
        path: '../../Dist/React',
        filename: '[name].js'
    },
    module: {
        preLoaders: [
            //{
            //    test: /\.jsx?$/,
            //    exclude: [/node_modules/],
            //    loaders: ['eslint-loader']
            //}
        ],
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: [/node_modules/],
                loaders: ['babel-loader']
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor-bundle'],
            filename: '[name].js',
        }),
    ],
    externals: {
        'jquery': 'jQuery'
    }
};
