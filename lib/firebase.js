'use strict';


var Firebase = require('firebase');

module.exports.top = new Firebase("https://hacker-news.firebaseio.com/v0/topstories/");

module.exports.thread = new Firebase("https://hacker-news.firebaseio.com/v0/item/");
