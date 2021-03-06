'use strict';


module.exports = function (grunt) {

    // Load the project's grunt tasks from a directory
    require('grunt-config-dir')(grunt, {
        configDir: require('path').resolve('tasks')
    });

    // Register group tasks
    grunt.registerTask('hint', ['jshint']);
    grunt.registerTask('test', ['jshint', 'shell', 'nsp', 'mochacli']);
    grunt.registerTask('mocha', ['mochacli']);

};
