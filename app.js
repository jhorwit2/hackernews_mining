'use strict';

// Start the application
var app = require('./controllers/threads'),
    database = require('./lib/database'),
    thread = require('./models/thread'),
    logger = require('./lib/logger'),
    async = require('async'),
    config = require('./config/config');


(function () {
    database.config(config, function (error) {
        if (error) {
            logger.error('The app is quiting due to config failures');
            process.kill();
        } else {
            app.start();
        }
    })
}());
