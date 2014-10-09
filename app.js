'use strict';

// Start the application
var app = require('./controllers/threads'),
    database = require('./lib/database'),
    logger = require('./lib/logger');

var start = function () {
    database.start(function (error) {
        if (!error) {
            //app.start();
        } else {
            logger.error('The app is quiting due to config failures');
            process.kill();
        }
    });
};

start();
