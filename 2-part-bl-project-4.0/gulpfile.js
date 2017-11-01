// 引入模块
var gulp = require("gulp");
var concat = require("gulp-concat");// 文件的合并 npm install gulp-concat
var uglify = require("gulp-uglify");// JS文件的压缩 npm install gulp-uglify

gulp.task("js", function(){
	gulp.src(["src/js/ajax.js","src/js/cookie.js"])
		.pipe(concat("hb.js"))
		.pipe(uglify())
		.pipe(gulp.dest("dist/js"));
});

gulp.task("html", function(){
	gulp.src("src/index.html")	
		.pipe(gulp.dest("dist/"));
});
