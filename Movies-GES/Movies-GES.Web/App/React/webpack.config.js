module.exports = {
    entry: './movie-management/app.jsx',
    output: {
        path: '../../Dist/React',
        filename: 'movie-management.js'
    },
    module:{
        loaders:[
            {
                test: /\.jsx?$/,
                exclude: [/node_modules/],
                loaders: ['babel-loader']
            }
        ]
    }
};