/// <vs AfterBuild='typescript' />
module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        ts: {
            default: {
                src: ["**/*.ts", "!node_modules/**/*.ts"],
                out: '_main.js',
                options: {
                    module: 'commonjs',
                    target: 'es5',
                    sourceMap: true,
                }
            }
        },
        /*uglify: {
            options: {
                mangle: false,
                compress: false,
                beautify: true
            },
            customize: {
                src: [
                  'start.js',
                  '_main.js',
                  'end.js'
                ],
                dest: 'main.js'
            },
        },*/
        concat:{
            customize: {
                src: [
                  'start.js',
                  '_main.js',
                  'end.js'
                ],
                dest: 'main.js'
            },
        },
        watch: {
            ts: {
                files: ["**/*.ts", "!node_modules/**/*.ts"],
                tasks: ['ts'],
            },
            scripts: {
                files: [
                  'start.js',
                  '_main.js',
                  'end.js'
                ],
                tasks: ['concat'],
                options: {
                    spawn: false,
                },
            },

        }
    });
    grunt.registerTask('default', ['ts', 'watch']);
};