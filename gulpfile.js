const os = require('os');
const child_process = require('child_process');

const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rev = require('gulp-rev'); // - 对文件名加MD5后缀
const revCollector = require('gulp-rev-collector'); // - 路径替换
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
// const cssnext = require('postcss-cssnext');
const shortcss = require('postcss-short');
const cssmin = require('gulp-clean-css');
const streamToPromise = require('stream-to-promise');

const packageJson = require('./package.json');

let { version } = packageJson;
if (/\.0$/.test(version)) {
  version = version.substring(0, version.length - 2);
}

// gulp.task('clean', cb => del(['./docs/css/bundle.css'], cb));

// 兼容其他浏览器
// gulp.task( 'css',  gulp.series('clean', () => {
//     let plugins = [
//       shortcss,
//       // cssnext,
//       autoprefixer({
//         browsers: [
//           'Android 4.1',
//           'iOS 7.1',
//           'Chrome > 31',
//           'ff > 15',
//           'ie >= 9',
//         ],
//         cascade: false,
//       }),
//       cssmin,
//     ];
//     return gulp
//       .src('docs/css/*.css') // 不打包base.css 用['docs/css-editor/layout.css', 'docs/css-editor/chart.css']
//       .pipe(concat('bundle.css'))
//       .pipe(postcss(plugins))
//       .pipe(gulp.dest('docs/css'));
//   }),
// );


// Builds the documentation
gulp.task('jsdoc', () => {
  const envPathSeperator = os.platform() === 'win32' ? ';' : ':';

  return new Promise(((resolve, reject) => {
    child_process.exec('jsdoc --configure tools/jsdoc/conf.js', {
      env: {
        PATH: `${process.env.PATH + envPathSeperator}node_modules/.bin`,
        VERSION: version,
      },
    }, (error, stdout, stderr) => {
      if (error) {
        console.log(stderr);
        return reject(error);
      }
      console.log(stdout);
      const stream = gulp.src('tools/jsdoc/images/**').pipe(gulp.dest('docs/images'));
      return streamToPromise(stream).then(resolve);
    });
  }));
});


gulp.task('build', () => gulp
  .src(['./src/index.js'])
  .pipe(concat('main.js'))
  .pipe(
    babel({
      presets: ['@babel/env'],
    }),
  )
  .pipe(uglify())
  .pipe(rev())
  .pipe(gulp.dest('./dist/js'))
  .pipe(rev.manifest()) // - 生成一个rev-manifest.json
  .pipe(gulp.dest('./dist')));
