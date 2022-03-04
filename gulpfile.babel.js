/**
 * Created by CLAKE on 2016/8/7.
 */
import gulp from 'gulp';
import browserSync from 'browser-sync';
import del from 'del';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import gutil from 'gulp-util';
import pkg from './package.json';
import babel from 'gulp-babel';
import plumber from 'gulp-plumber';
import path from 'path';
import sourcemaps from 'gulp-sourcemaps';
import historyApiFallback from 'connect-history-api-fallback';
import header from 'gulp-header';
import gulpLoadPlugins from 'gulp-load-plugins';
import through2 from 'through2';
import * as rttyd from 'react-to-typescript-definitions';
import fs from 'fs';
let $ = gulpLoadPlugins();

const banner = `/* ${pkg.name} v${pkg.version} | by Clake
 * Copyright (c) ${$.util.date(Date.now(), 'UTC:yyyy')} Clake,
 * ${$.util.date(Date.now(), 'isoDateTime')}
 */
`;

gulp.task('server', () => {
    let webpackConfigDev = require('./webpack.dev').default;
    const bundler = webpack(webpackConfigDev);
    const bs = browserSync.create();

    bs.init({
        logPrefix: 'AMT',
        server: {
            baseDir: ['examples'],
            middleware: [
                historyApiFallback(),
                webpackDevMiddleware(bundler, {
                    publicPath: '/',  //webpackConfig.output.publicPath,
                    stats: {colors: true},
                    lazy:false,
                    watchOptions:{
                        aggregateTimeout: 300,
                        poll: true
                    }
                }),
                webpackHotMiddleware(bundler)
            ]
        }
    });

    let dev_server = require('./dev_server/server');
    dev_server.listen("12345")
});

gulp.task('clean:publish', (callback) => {
    return del([
        'lib/*'
    ],callback);
});

gulp.task('clean:build', (callback) => {
    return del([
        'dist/*'
    ],callback);
});

gulp.task('clean',gulp.series('clean:build','clean:publish'));

gulp.task('publish:css',()=>{
    return gulp.src('src/css/*.less')
        .pipe(gulp.dest('lib/css'));
});

gulp.task('publish:pack',()=>{
    return gulp.src('src/**/*.js')
        // .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(babel({
            "presets": [
                "@babel/preset-env",
                "@babel/preset-react"
            ],
            "plugins": [
                "@babel/plugin-proposal-object-rest-spread",
                ["@babel/plugin-transform-runtime",{
                    "helpers": false,
                    "useESModules": false
                }],
                "@babel/plugin-proposal-class-properties",
                "@babel/plugin-syntax-dynamic-import",
                "@babel/plugin-proposal-export-default-from",
                "@babel/plugin-proposal-nullish-coalescing-operator",
                "@babel/plugin-proposal-optional-chaining"
            ]
        }))
        .pipe(header(banner))
        // .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('lib'))
        // .pipe(through2.obj((chunk, enc, callback)=>{
        //     // for (let k in chunk) {
        //     //     console.log(k,chunk[k])
        //     // }
        //     try {
        //         let ops = [
        //             'jsx',
        //             'nullishCoalescingOperator',
        //             'exportDefaultFrom',
        //             'dynamicImport'
        //         ]
        //         let org_path = chunk.path.replace('lib','src');
        //         let dts_src = rttyd.generateFromFile(null,org_path,{babylonPlugins:ops})
        //         fs.writeFileSync(path.join(path.dirname(chunk.path),path.basename(chunk.path)+'.d.ts'),dts_src)
        //     } catch(e) {
        //         console.log("generate ts.d file error:",chunk.path,e)
        //     }
        //
        //     // console.log(path.basename(chunk.path,'.js'),path.dirname(chunk.path))
        //     callback(null,chunk);
        // }));
});

gulp.task('build:pack', (callback)=>{
    let webpackConfig = require('./webpack.prod').default;
    webpack(webpackConfig,function(err,stats){
        gutil.log("[webpack]", stats.toString({
            colors:true
        }));
        callback();
    });
});

gulp.task('build:over',()=>{
    return gulp.src('dist/*.js')
        .pipe(header(banner))
        .pipe(gulp.dest('dist/'));
});

gulp.task('default', gulp.series('server'));

gulp.task('build',gulp.series('clean:build','build:pack','build:over'));
gulp.task('publish',gulp.series('clean:publish','publish:css','publish:pack'));