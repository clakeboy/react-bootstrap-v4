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

gulp.task('publish:pack',['clean:publish'],(callback)=>{
    return gulp.src('src/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel({presets: ['env','es2015', 'stage-0', 'react']}))
        .pipe(sourcemaps.write('.'))
        .pipe(header(banner))
        .pipe(gulp.dest('lib'));
});

gulp.task('publish:css',()=>{
    return gulp.src('src/css/*.less')
        .pipe(gulp.dest('lib/css'));
});

// gulp.task('publish:header',()=>{
//     return gulp.src('lib/**/*.js').pipe(header(banner));
// });

gulp.task('build:pack', (callback)=>{
    let webpackConfig = require('./webpack.common').default;
// return gulp.src('dist/*.js')
//     .pipe(replaceVersion())
//     .pipe(addBanner())
//     // .pipe($.rename('ticket_manage.min.js'))
//     // .pipe(gulp.dest(paths.dist))
//     .pipe($.rename({suffix: '.min'}))
//     .pipe(gulp.dest(paths.dist));
// gulp.start('webpack');
// webpackStream(webpackConfig,null, function(err, stats) {
//     if(err) throw new gutil.PluginError("webpack", err);
//     gutil.log("[webpack]", stats.toString({
//         color:true
//     }));
//     callback();
// });
    webpack(webpackConfig,function(err,stats){
        gutil.log("[webpack]", stats.toString({
            colors:true
        }));
        callback();
    });
});

gulp.task('build:over',['build:pack'],()=>{
    return gulp.src('dist/*.js')
        .pipe(header(banner))
        .pipe(gulp.dest('dist/'));
});

gulp.task('default', ['server']);

gulp.task('build',['clean:build','build:pack','build:over']);
gulp.task('publish',['clean:publish','publish:css','publish:pack']);