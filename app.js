'use strict';

// Start the application
var app = require('./controllers/threads'),
    database = require('./lib/database'),
    logger = require('./lib/logger'),
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
