/**
 * Created by CLAKE on 2016/8/7.
 */
import gulp from 'gulp';
import browserSync from 'browser-sync';
import gulpLoadPlugins from 'gulp-load-plugins';
import del from 'del';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
// import webpackConfig from './webpack.config';
// import webpackConfigDev from './webpack.dev.config';
import gutil from 'gulp-util';
import pkg from './package.json';

import historyApiFallback from 'connect-history-api-fallback';

const $ = gulpLoadPlugins();

const banner = `/** ${pkg.title} v${pkg.version} | by Clake
  * (c) ${$.util.date(Date.now(), 'UTC:yyyy')} Clake,
  * ${$.util.date(Date.now(), 'isoDateTime')}
  */
  `;

const paths = {
    jsEntry: 'src/app.jsx',
    dist: 'dist'
};

const replaceVersion = function() {
    return $.replace('__VERSION__', pkg.version);
};

const addBanner = function() {
    return $.header(banner);
};

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

gulp.task('clean', () => {
    return del([
        'dist/*',
        '!dist/vendor',
        '!dist/index.html',
        '!dist/manage.html',
        '!dist/static',
        '!dist/favicon.ico'
    ]);
});

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
        gulp.src('dist/*.js').pipe(replaceVersion()).pipe(addBanner());
        callback();
    });
});

gulp.task('default', ['server']);

gulp.task('build',['clean','build:pack']);