'use strict';

var pg = require('pg'),
    async = require('async'),
    config = require('./config/config').database;

var conString = 'postgres://' + config.username + ':' + config.password +
    '@' + config.options.host + '/' + config.database;

var client = new pg.Client(conString);
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
        }
        async.parallel([
            query('SELECT count(*) from threads', 'Thread Count:'),
            query('SELECT count(*) from thread_rank', 'Thread Rank Count:')
            ], function () {
                client.end();
            });
});


var query = function (queryString, title) {
    return function query(callback) {
        client.query(queryString, function(err, result) {
            if(err) {
                console.error('error running query', err);
                return callback(err);
            }
            console.log(title, result.rows[0].count);
            return callback();
        });
    };
};
