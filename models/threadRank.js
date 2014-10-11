'use strict';


//Getting the orm instance
var orm = require('../lib/database'),
    Seq = orm.Sequelize(),
    logger = require('../lib/logger');

//Creating our module
module.exports = {
    model:{
        threadId: Seq.INTEGER,
        rank: Seq.INTEGER
    },
    options:{
        tableName: 'thread_rank',
        timestamps: true
    }
};

/*
    I think what I should do is check if the current rank is different than the last
    saved rank. If it is then update, if it's the same then ignore.
*/
module.exports.create = function (rank) {
    return function create (threadId, callback) {
        orm.model('threadRank').find({
            where: {
                threadId: threadId,
                rank:rank,
                createdAt: new Date()
            }
        }).success(function (threadRank) {
            if (threadRank) {
                return callback();
            } else {
                createRank(threadId, rank, callback);
            }
        });
    };
};

var createRank = function (threadId, rank, callback) {
    orm.model('threadRank').create({
        threadId: threadId,
        rank: rank
    }).success(function (threadRank) {
        return callback();
    }).error(function (error) {
        logger.error('An error occured while creating thread rank', error);
        return callback(error);
    });
};
