module.exports = {
    entry: './movie-management/app.jsx',
    output: {
        path: '../../Dist/React',
        filename: 'movie-management.js'
    },
    module: {
        preLoaders: [
            {
                test: /\.jsx?$/,
                exclude: [/node_modules/],
                loaders: ['eslint-loader']
            }
        ],
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: [/node_modules/],
                loaders: ['babel-loader']
            }
        ]
    },
    externals: {
        "jquery": "jQuery"
    }
};
