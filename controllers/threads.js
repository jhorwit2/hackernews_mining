'use strict';

var topRef = require('../lib/firebase').top,
    async = require('async'),
    logger = require('../lib/logger'),
    thread = require('../models/thread');

module.exports.start = (function () {
    topRef.on('value', function (snapshot) {
        var top100 = snapshot.val();
        async.each(top100, thread.create, finished);
    }, error);
});

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
