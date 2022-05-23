/**
 * Created by CLAKE on 2016/8/9.
 */
import webpack from 'webpack';

export default {
    //插件项
    plugins: [
        // new webpack.optimize.CommonsChunkPlugin('common'),
        // new ExtractTextPlugin("[name].css"),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        })
    ],
    output: {
        path: `${__dirname}/dist`,
        filename: '[name].js',
        chunkFilename:`./view/[name].[chunkhash:8].js`,
        libraryTarget: "umd",
        library:'ReactBootstrapV4'
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
                test: /\.ts|\.tsx$/,
                use: [{loader:'babel-loader',query:{presets:["@babel/preset-env", "@babel/preset-react","@babel/preset-typescript"]}},'eslint-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.jsx$/,
                use: {loader:'babel-loader',query:{presets:["@babel/preset-env", "@babel/preset-react"]}},
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                use: {loader:'babel-loader',query:{presets:["@babel/preset-env", "@babel/preset-react"]}},
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
        extensions: [ '.js', '.json', '.less', '.jsx','.tsx','.ts']
    },
    node: {
        fs: 'empty'
    },
    externals: {
        "jquery": "jQuery",
        "react": "React",
        "react-dom": "ReactDOM",
        "zepto": "Zepto",
        "marked":"Marked",
        "moment":"Moment"
    }
};