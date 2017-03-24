// 所有的文件产出到 static/ 目录下
fis.match('*', {
    release: '/$0',
    useHash: false
});

fis.match('*.scss', {
    rExt: '.css',
    parser: fis.plugin('node-sass'),
    userMap: true,
    preprocessor: fis.plugin('cssprefixer', {
        "browsers": ["FireFox > 1", "Chrome > 1", "ie >= 8"],
        "cascade": true
    })
});
// //mock目录不发布
// fis.match("mock/**", {
//     release: false
// });
fis.match('{/static/widget/**.js, /static/js/config/*.js, /components/**/**.js, /static/js/lib/*.js}', {
    useMap: true,
    isMod: true
});
fis.hook('commonjs');
fis.match('::package', {
    postpackager: fis.plugin('loader', {
        //allInOne: true, //js&css打包成一个文件
        sourceMap: true, //是否生成依赖map文件
        useInlineMap: true //是否将sourcemap作为内嵌脚本输出
    }),
    postprocessor: fis.plugin('jswrapper', {
        type: 'commonjs'
    })
});
fis.match('*.png', {
    // fis-optimizer-png-compressor 插件进行压缩，已内置
    optimizer: fis.plugin('png-compressor',{
        type : 'pngquant' //default is pngcrush 
    })
});

// fis.match('/static/*/**.tpl', {
//     isMod: false,
//     isJsLike: true,
//     rExt:'.js',
//     parser:fis.plugin('handlebars'),
//     release:true,
//     extras: {
//         isPage: true
//     }
// });

fis.media('qa').match('*', {
    deploy:  fis.plugin('http-push', {
        receiver: 'http:///receiver.php',
        to: '/Users/mac/.fis3-tmp/www'
    })
});

// optimize
fis.media('prod')
    .match("mock/**", {
        release: false
    })
    .match('*.js', {
        optimizer: fis.plugin('uglify-js', {
            mangle: {
                expect: ['require', 'define', 'some string'] //不想被压的
            }
        })
    })
    .match('*.css', {
        optimizer: fis.plugin('clean-css', {
            'keepBreaks': true //保持一个规则一个换行
        })
    });

// pack
fis.media('prod')
    // 启用打包插件，必须匹配 ::package
    .match('::package', {
        packager: fis.plugin('map')
    });


