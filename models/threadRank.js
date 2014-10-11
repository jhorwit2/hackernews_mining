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
