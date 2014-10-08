'use strict';

var Firebase = require('firebase'),
    async = require('async'),
    fs = require('fs');

// Get a reference to our posts
var topRef = new Firebase("https://hacker-news.firebaseio.com/v0/topstories/"),
    threadRef = new Firebase("https://hacker-news.firebaseio.com/v0/item/"),
    file = fs.createWriteStream('output.txt');

// // Attach an asynchronous callback to read the data at our posts reference
topRef.on('value', function (snapshot) {
    var top100 = snapshot.val();
    async.each(top100, processThread, finished);
}, error);

var processThread = function (id, callback) {
    threadRef.child(id).once('value', function (snapshot) {
        var title = snapshot.val().title;
        file.write(title + '\n');
        return callback();
    });
};

var error = function (error) {
    console.log('The read failed: ' + error.code);
};

var finished = function (error) {
    // Clear the callbacks for threadRef
    threadRef.off();

    console.log(error);
};
