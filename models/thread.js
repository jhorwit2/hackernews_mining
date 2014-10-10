'use strict';



var threadRef = require('../lib/firebase').thread,
    database = null,
    Sequelize = require('sequelize'),
    Thread = null;

//Getting the orm instance
var orm = require("../lib/database"),
    Seq = orm.Sequelize();

//Creating our module
module.exports = {
    model:{
        text: Seq.STRING
    },
    options:{
        timestamps: true
    }
}

// // Attach an asynchronous callback to read the data at our posts reference
module.exports.create = function (id, callback) {
    threadRef.child(id).once('value', function (snapshot) {
        // Clear the callbacks for threadRef
        threadRef.off();


        var title = snapshot.val().title;
        console.log(title);
        //file.write(title + '\n');
        return callback();
    });
};
