'use strict';

var pg = require('pg').native,
    async = require('async'),
    config = require('./config/config').database;
    
var conString = 'postgres://' + config.username + ':' + config.password +
    '@' + config.options.host + '/' + config.database;

var queryList = [
    query('SELECT count(*) from threads', 'Thread Count:', 'count'),
    query('SELECT count(*) from thread_rank', 'Thread Rank Count:', 'count'),
    query('SELECT count(*) from threads where "createdAt" = now()::date', 'Today thread count:', 'count'),
    query('SELECT count(*) from thread_rank where "createdAt" = now()::date', 'Today rank count:', 'count')
];

var client = new pg.Client(conString);
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
        }
        async.parallel(queryList, function () {
                client.end();
            });
});


function query(queryString, title, key) {
    return function query(callback) {
        client.query(queryString, function(err, result) {
            if(err) {
                console.error('error running query', err);
                return callback(err);
            }
            console.log(title, result.rows[0][key]);
            return callback();
        });
    };
}
