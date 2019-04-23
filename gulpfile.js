const os = require('os');
const childProcess = require('child_process');

const gulp = require('gulp');
const streamToPromise = require('stream-to-promise');
const packageJson = require('./package.json');

let { version } = packageJson;
if (/\.0$/.test(version)) {
  version = version.substring(0, version.length - 2);
}


// Builds the documentation
gulp.task('jsdoc', () => {
  const envPathSeperator = os.platform() === 'win32' ? ';' : ':';

  return new Promise(((resolve, reject) => {
    childProcess.exec('jsdoc --configure tools/jsdoc/conf.js', {
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
