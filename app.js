'use strict';

var Firebase = require('firebase'),
    async = require('async');

// Get a reference to our posts
var postsRef = new Firebase("https://hacker-news.firebaseio.com/v0/topstories");

// Attach an asynchronous callback to read the data at our posts reference
postsRef.on('value', function (snapshot) {
    async.each(snapshot.val(), function (id, callback) {

    }, finished);

}, error);

var error = function (error) {
    console.log('The read failed: ' + errorObject.code);
};

var finished = function (error) {
    console.log(error || 'success');
};
