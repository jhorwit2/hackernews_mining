'use strict';


var Sequelize = require('sequelize'),
    config = require('../config/config').database,
    logger = require('./logger'),
    database = null;


module.exports.start = function (callback) {
    database = new Sequelize(config.database, config.username, config.password, config.options);

    database
        .authenticate()
        .complete(function(err) {
            if (!!err) {
                logger.error('Unable to connect to the database:', err)
                return callback(err);
            } else {
                logger.info('Connection has been established successfully.')
                return callback();
            }
        });
};

module.exports.database = database;
