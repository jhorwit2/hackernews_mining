'use strict';

var firebase = require('../lib/firebase'),
    topRef = firebase.top,
    threadRef = firebase.thread,
    async = require('async'),
    logger = require('../lib/logger'),
    thread = require('../models/thread');

module.exports.start = (function () {
    topRef.on('value', function (snapshot) {
        var top100 = snapshot.val();
        async.each(top100, getThread, finished);
    }, error);
});

var getThread = function (id, callback) {
    threadRef.child(id).once('value', function (snapshot) {
        // Clear the callbacks for threadRef
        threadRef.off();


        var title = snapshot.val().title;
        //console.log(title);
        //file.write(title + '\n');
        return callback();
    });
};

var error = function (error) {
    logger.error('The read failed: ' + error.code)
};

var finished = function (error) {
    if (error) {
        logger.error('Error:', error);
    } else {
        logger.info('Successfully updated output.txt');
    }
};
