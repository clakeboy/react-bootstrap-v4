/**
 * Created by CLAKE on 2016/8/9.
 */
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import path from 'path';
import process from 'process';


let ENV = process.env.NODE_ENV;
// var ip = require('ip');

let node_modules = path.resolve(__dirname, 'node_modules');
let react = path.resolve(node_modules, 'react/dict/react.js');

// const ip_address = ip.address();

export default {
    //页面入口文件配置
    entry: {
        //主文件
        'react-bootstrap-v4' : './src/index.js'
    },
    //插件项
    plugins: [
        // new webpack.optimize.CommonsChunkPlugin('common'),
        // new ExtractTextPlugin("[name].css"),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        })
    ],
    output: {
        path: `${__dirname}/dist`,
        filename: '[name].js',
        chunkFilename:`./view/[name].[chunkhash:8].js`
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader','css-loader']
            },
            {
                test: /\.less$/,
                use: ['style-loader','css-loader','less-loader']
            },
            { test: /\.woff[2]?$/, use: "url-loader?limit=10000&mimetype=application/font-woff" },
            { test: /\.ttf$/,  use: "url-loader?limit=10000&mimetype=application/octet-stream" },
            { test: /\.eot$/,  use: "file-loader" },
            { test: /\.svg$/,  use: "url-loader?limit=10000&mimetype=image/svg+xml" },
            {
                test: /\.jsx$/,
                use: {loader:'babel-loader',query:{presets:['es2015', 'stage-0', 'react']}},
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                use: {loader:'babel-loader',query:{presets:['es2015', 'stage-0', 'react']}},
                exclude: /node_modules/
            },
            {
                test: /\.(jpe?g|png|gif)$/i,
                use: 'url-loader?limit=10000&name=img/[hash:8].[name].[ext]'
            }
        ]
    },
    //其它解决方案配置
    resolve: {
        extensions: [ '.js', '.json', '.less', '.jsx']
        // ,alias: {
        //     AppStore : 'js/stores/AppStores.js',
        //     ActionType : 'js/actions/ActionType.js',
        //     AppAction : 'js/actions/AppAction.js'
        // }
    },
    node: {
        fs: 'empty'
    },
    externals: [
        {
            "jquery": "jQuery",
            "react": "React",
            "react-dom": "ReactDOM",
            "zepto": "Zepto",
            "marked":"marked",
            "moment":"moment"
        },
        require('webpack-require-http')
    ]
};