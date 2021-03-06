var gulp = require("gulp");
var sass = require("gulp-sass");
var autoprefixer = require('gulp-autoprefixer');
var notify = require("gulp-notify");
var htmlmin = require('gulp-htmlmin');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var concat = require('gulp-concat');
var reset_heroi = require('browser-sync').create();

// Transforma o Sass da pasta source(desenvolvimento) em CSS levando para a pasta dist(produção)
gulp.task('thor', function () {
    return gulp.src('./source/sass/*.scss')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(autoprefixer({
            "overrideBrowserslist": [
                "> 1%",
                "ie >= 8",
                "edge >= 15",
                "ie_mob >= 10",
                "ff >= 45",
                "chrome >= 45",
                "safari >= 7",
                "opera >= 23",
                "ios >= 7",
                "android >= 4",
                "bb >= 10"
              ], cascade:false
        
        }))
        .pipe(gulp.dest('./dist/css'))
        .pipe(reset_heroi.stream());
});

// Minifica o Javascript da pasta source(desenvolvimento) levando para a pasta dist(produção)
gulp.task('mulher-elastico', function () {
    return gulp.src([
        // *** OBS: Não alterar ordem ***
        './node_modules/jquery/dist/jquery.js',
        './node_modules/bootstrap/dist/js/bootstrap.bundle.js',
        './node_modules/bootstrap/dist/js/bootstrap.js',
        './source/js/*.js'
        ]
    )
        .pipe(concat('main.js'))
        .pipe(gulp.dest('./dist/js'));
});

// Minifica o HTML da pasta source(desenvolvimento) para a pasta raíz do projeto
gulp.task('stan-lee', function () {
    return gulp.src('./source/php/*')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('./'));
});

// Comprime as imagens da pasta img e colocando na pasta img-comprimida
gulp.task('ant-man', function () {
    return gulp.src("./source/img/*")
        .pipe(imagemin())
        .pipe(gulp.dest("./dist/img"))
});

// Atualiza o navegador automaticamente
gulp.task('reset_heroi', function () {
    reset_heroi.init({

        // INFORME O LOCAL DA PASTA DO PROJETO
        proxy:   "localhost/sites/notas-gean",
        open:    "local",
    })
});

// Limpa o cache do navegador
gulp.task('flash', () =>
    cache.clearAll()
);

// Assiste as tasks

gulp.task('demolidor', function () {
    gulp.watch('./source/sass/*.scss', gulp.parallel('thor','flash'));
    gulp.watch('./source/js/**/*.js', gulp.parallel('mulher-elastico','flash')).on('change', reset_heroi.reload);
    gulp.watch('./source/img/*', gulp.parallel('ant-man','flash')).on('change', reset_heroi.reload);
    gulp.watch('./source/php/*.php', gulp.parallel('stan-lee','flash')).on('change', reset_heroi.reload);
});

// Chama as tasks

gulp.task('default',
    gulp.parallel(
        'thor',
        'mulher-elastico',
        'ant-man',
        'demolidor',
        'stan-lee',
        'flash',
        'reset_heroi'
    )
);
