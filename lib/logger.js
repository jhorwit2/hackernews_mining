'use strict';

var winston = require('winston');

module.exports = new (winston.Logger)({
    transports: [
      new (winston.transports.Console)({'timestamp':true}),
      new (winston.transports.File) ({filename: 'audit.log'})
    ]
});
