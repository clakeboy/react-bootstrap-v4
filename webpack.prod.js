/**
 * Created by CLAKE on 2016/8/9.
 */
import webpack from 'webpack';
import merge from 'webpack-merge';
let cfg = require('./webpack.common').default;

export default merge(cfg,{
    //页面入口文件配置
    entry: {
        //主文件
        'react-bootstrap-v4' : './src/index.js'
    },
    //插件项
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        })
    ],
    optimization: {
        minimize:true,
    },
    mode: 'production',
});