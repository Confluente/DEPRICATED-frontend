module.exports = function (grunt) {

    var webpack = require('webpack');
    const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        webpack: {
            context: __dirname + '/src/js',
            entry: './index.js',
            dev: {
                context: __dirname + '/src/js',
                entry: './index.js',
                output: {
                    path: __dirname + '/src/js',
                    filename: 'bundle.js'
                }
            },
            build: {
                context: __dirname + '/src/js',
                entry: './index.js',
                plugins: [
                    new UglifyJsPlugin({
                        cache: true,
                        parallel: true,
                        uglifyOptions: {
                            compress: false,
                            ecma: 6,
                            mangle: true
                        },
                        sourceMap: true
                    })
                ],
                output: {
                    path: __dirname + '/build/js',
                    filename: 'bundle.js'
                }
            }
        },
        "webpack-dev-server": {
            options: {
                webpack: {
                    context: __dirname + '/src/js',
                    entry: './index.js'
                }
            },
            start: {
                contentBase: __dirname + "/src",
                watchContentBase: false,
                compress: true,
                host: "0.0.0.0",
                port: 9001
            }
        },
        copy: {
            main: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['*', 'css/**', 'img/**', 'fonts/**', 'pages/**'],
                    dest: 'build/'
                }]
            }
        },
        clean: {
            dev: ['src/js/bundle.js'],
            build: ['build/*'],
            options: {
                'no-write': false
            }
        },
        jshint: {
            files: ['src/js/*.js', '!src/js/bundle.js', 'src/js/app/**.js'],
        },
        jscs: {
            src: ['<%= jshint.files %>'],
            options: {
                config: '.jscsrc'
            }
        },
        watch: {
            options: {
                livereload: false
            },
            files: ['src/**'],
            js: {
                files: ['<%= jshint.files %>'],
                tasks: ['jshint', 'jscs', 'webpack:dev']
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-jscs');
    grunt.loadNpmTasks('grunt-webpack');

    grunt.registerTask('default', ['clean:dev', 'webpack:dev']);
    grunt.registerTask('check', ['jshint', 'jscs']);
    grunt.registerTask('serve', ['webpack-dev-server:start']);
    grunt.registerTask('dev', ['default', 'watch']);
    grunt.registerTask('build', ['check', 'clean:build', 'copy', 'webpack:build']);
};
