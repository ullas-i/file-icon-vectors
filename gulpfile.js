/**
 * Gulpfile for File Icon Vectors
 *
 * @author Daniel M. Hendricks
 * @license MIT
 * {@link https://github.com/dmhendricks/file-icon-vectors GitHub repository}
 */

var pkg           = require( './package.json' );
var gulp          = require( 'gulp' );
var rename        = require( 'gulp-rename' );
var minifycss     = require( 'gulp-uglifycss' );
var sass          = require( 'gulp-sass' );
var autoprefixer  = require( 'gulp-autoprefixer' );
var lineec        = require( 'gulp-line-ending-corrector' );
var filter        = require( 'gulp-filter' );
var notify        = require( 'gulp-notify' );

const AUTOPREFIXER_BROWSERS = [ 'last 2 version', '> 1%', 'ie >= 9', 'ie_mob >= 10', 'ff >= 30', 'chrome >= 34', 'safari >= 7', 'opera >= 23', 'ios >= 7', 'android >= 4', 'bb >= 10' ];

gulp.task( 'sassTask', function () {
  gulp.src( [ './src/scss/file-icon-classic.scss', './src/scss/file-icon-vivid.scss', './src/scss/file-icon-square-o.scss', './src/scss/file-icon-vectors.scss' ] )
    .pipe( sass( {
      outputStyle: 'expanded' } ) )
    .on( 'error', console.error.bind( console ) )
    .pipe( autoprefixer ( AUTOPREFIXER_BROWSERS ) )
    .pipe( lineec() )
    .pipe( gulp.dest( './dist') )
    .pipe( filter( '**/*.css' ) )
    .pipe( rename( { suffix: '.min' } ) )
    .pipe( minifycss() )
    .pipe( lineec() )
    .pipe( gulp.dest( './dist' ) )
    .pipe( notify( { message: 'TASK: "sassTask" completed.', onLast: true } ) );
});

gulp.task('default', [ 'sassTask' ], function(){

  gulp.watch( './src/scss/*.scss', [ 'sassTask' ] );

});
