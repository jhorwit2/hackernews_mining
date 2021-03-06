'use strict';


//Getting the orm instance
var orm = require('../lib/database'),
    Seq = orm.Sequelize(),
    logger = require('../lib/logger'),
    threadRank = require('./threadRank'),
    async = require('async'),
    _ = require('lodash');

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
module.exports.create = function (title, rank, callback) {
    orm.model('thread').find({
        where: {
            title:title,
            createdAt: new Date()
        }
    }).success(function (thread) {
        async.waterfall([
            createThread(thread, title),
            threadRank.create(rank)
            ], callback);
    });
};

var createThread = function (thread, title) {
    return function createThread(callback) {
        // The thread already exists so don't create it.
        if (thread) {
            return callback(null, thread.id);
        }

        orm.model('thread').create({
            title: title
        }).success(function (thread) {
            return callback(null, thread.id);
        }).error(function (error) {
            logger.error('An error occured while creating thread', error);
            return callback(error);
        });
    };
};
