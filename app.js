'use strict';

var Firebase = require('firebase'),
    async = require('async');

// Get a reference to our posts
var topRef = new Firebase("https://hacker-news.firebaseio.com/v0/topstories/"),
    itemRef = new Firebase("https://hacker-news.firebaseio.com/v0/item/");

// // Attach an asynchronous callback to read the data at our posts reference
topRef.on('value', function (snapshot) {
    async.each(snapshot.val(), function (id, callback) {

        itemRef.child(id).once('value', function (snapshot) {
            console.log(snapshot.val().title);
            callback();
        });
    }, finished);

}, error);


var error = function (error) {
    console.log('The read failed: ' + errorObject.code);
};

var finished = function (error) {
    if(itemRef) {
        itemRef.off();
    }
    console.log(error || 'success');
};
