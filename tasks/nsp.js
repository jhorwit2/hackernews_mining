'use strict';


module.exports = function clean(grunt) {
    // Load task

    // First prepare the shrinkwrap.json

    grunt.loadNpmTasks('grunt-nsp-shrinkwrap');

    grunt.registerTask('nsp', ['validate-shrinkwrap']);

};
