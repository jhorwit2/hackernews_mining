var pg = require('pg'),
    config = require('./config/config').database;

console.log(config);
var client = new pg.Client({
    user: config.username,
    password: config.password,
    database: config.database,
    port: config.options.port,
    host: config.options.host,
    ssl: false
});

client.connect(function (error) { console.log(error);});
