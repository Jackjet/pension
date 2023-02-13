/**
 * @date 2019.11.27
 * @author 关宁
 * @describe vue-cli 4.x 生成系统主题文件
 */

const path = require('path')
const gulp = require('gulp')
const cleanCSS = require('gulp-clean-css')
const cssWrap = require('gulp-css-wrap')

// 找需要添加命名空间的css文件 支持正则表达式
gulp.task('css-wrap', function () {
  return gulp.src(path.resolve('./themes/index.css'))
    // 添加的命名空间
    .pipe(cssWrap({
      selector: '.custom-red'
    }))
    // 存放的目录
    .pipe(cleanCSS()).pipe(gulp.dest('theme/red'))
})
