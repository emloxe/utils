
# 版本
```
"@babel/core": "^7.4.3",
"gulp": "^4.0.0",
```

# 使用

## 初始化项目
```
> npm i

// 实时监听
> npm run dev
// 打包
> npm run build
//打包版本--压缩混淆
> npm run release
```

## 编辑项目
以vs code为例
1. 安装vscode 插件，对文档进行检验
`eslint` 
`Prettier - Code formatter`
2. 编辑时格式化代码
组合键 `shift+ctrl+p`输入`format document`回车

## 与rollup组合使用
gulp直接对es代码进行打包，如果js文件内部使用了`import`,gulp并不会对引入的文件一起打包，需要与rollup协同使用。

默认打包方式如下：
```
const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rev = require('gulp-rev'); // - 对文件名加MD5后缀
const revCollector = require('gulp-rev-collector'); // - 路径替换
gulp.task('default', () => {
  gulp
    .src(['./src/script/a.js', './src/script/b.js', './src/script/index.js'])
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
    .pipe(gulp.dest('./rev'));
});
```
