module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        lint: {
            data: 'data/**/*.js',
            lib: 'lib/**/*.js',
            grunt: 'grunt.js',
            tests-content-script: 'test/content-script/**/*.js',
            tests-module: 'test/module/**/*.js'
        },
        qunit: {
            files: ['test/content-script/*.html']
        }
    });

    // Task to run tests
    grunt.registerTask('travis', 'lint qunit');
};
