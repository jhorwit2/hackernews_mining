'use strict';


//Getting the orm instance
var orm = require('../lib/database'),
    Seq = orm.Sequelize(),
    logger = require('../lib/logger');

//Creating our module
module.exports = {
    model:{
        title: Seq.STRING
    },
    options:{
        tableName: 'threads',
        timestamps: true
    }
};

// // Attach an asynchronous callback to read the data at our posts reference
module.exports.create = function (title, callback) {
    orm.model('thread').create({
        title: title
    }).success(function (thread) {
        logger.info('created thread', thread.text);
        return callback();
    }).error(function (error) {
        logger.error('An error occured while creating thread', error);
        return callback(error);
    });
};
