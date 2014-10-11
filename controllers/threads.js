'use strict';

var firebase = require('../lib/firebase'),
    topRef = firebase.top,
    threadRef = firebase.thread,
    async = require('async'),
    logger = require('../lib/logger'),
    Thread = require('../models/thread'),
    _ = require('lodash');

module.exports.start = function () {
    topRef.on('value', handleThreads, error);
};

var handleThreads = function (snapshot) {
    var top100 = snapshot.val();

    async.each(top100, function (id, callback) {
        var rank = top100.indexOf(id),
            func =  _.bind(processThread, {}, callback, rank);

        threadRef.child(id).once('value', func);
    }, finished);
};

var processThread = function (callback, rank, snapshot) {
    // Clear the callbacks for threadRef
    threadRef.off();

    var title = snapshot.val().title;
    Thread.create(title, rank, callback);
};

var error = function (error) {
    logger.error('The read failed: ' + error.code);
};

var finished = function (error) {
    if (error) {
        logger.error('Error:', error);
    } else {
        logger.info('Successfully updated output.txt');
    }
};
