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
import sourcemaps from 'gulp-sourcemaps';
import historyApiFallback from 'connect-history-api-fallback';
import header from 'gulp-header';
import gulpLoadPlugins from 'gulp-load-plugins';
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
});

gulp.task('clean:publish', (callback) => {
    del([
        'lib/*'
    ]);
    callback();
});

gulp.task('clean:build', (callback) => {
    del([
        'dist/*'
    ]);
    callback();
});

gulp.task('clean',['clean:build','clean:publish']);

gulp.task('publish:pack',['clean:publish','publish:css'],(callback)=>{
    gulp.src('src/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel({presets: ['env','es2015', 'stage-0', 'react']}))
        .pipe(sourcemaps.write('.'))
        .pipe(header(banner))
        .pipe(gulp.dest('lib'));
    callback();
});

gulp.task('publish:css',['clean:publish'],(callback)=>{
    gulp.src('src/css/*.less')
        .pipe(gulp.dest('lib/css'));
    callback();
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

gulp.task('build:over',['build:pack'],(callback)=>{
    gulp.src('dist/*.js')
        .pipe(header(banner))
        .pipe(gulp.dest('dist/'));
    callback();
});

gulp.task('default', ['server']);

gulp.task('build',['clean:build','build:pack','build:over']);
gulp.task('publish',['clean:publish','publish:css','publish:pack']);