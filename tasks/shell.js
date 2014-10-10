'use strict';


module.exports = function clean(grunt) {
    grunt.loadNpmTasks('grunt-shell');
    return {
        shrinkwrap: {
            command: 'npm shrinkwrap',
            options: {
                stderr: false
            }
        }
    };
};
