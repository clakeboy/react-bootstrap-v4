import webpack from 'webpack';
import merge from 'webpack-merge';
let cfg = require('./webpack.common').default;

export default merge(cfg,{
    entry: {
        //主文件
        app : [
            'webpack/hot/dev-server',
            'webpack-hot-middleware/client?reload=true',
            './exsrc/app.js'
        ]
    },
    output: {
        path: `${__dirname}/examples`,
        filename: '[name].js',
        chunkFilename:`./view/chunk/[name].[chunkhash:8].js`
    },
    //插件项
    plugins: [
        // new ExtractTextPlugin('[name].css'),
        // new webpack.optimize.CommonsChunkPlugin('common'),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("development")
            }
        })
    ],
    mode: 'development',
    devtool: 'eval-source-map',
});