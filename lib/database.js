'use strict';


var logger = require('./logger'),
    filesystem = require('fs'),
    models = {},
    relationships = {};

var database = function database() {
    var Sequelize = require("sequelize"),
        sequelize = null,
        modelsPath = "";

    this.setup = function (config, callback){
        modelsPath = config.modulePath;

        config = config.database;

        sequelize = new Sequelize(config.database, config.username, config.password, config.options);

        sequelize.authenticate()
            .complete(function (error) {
                if (!!error) {
                    logger.error('Unable to connect to the database:', error)
                    return callback(error);
                } else {
                    logger.info('Connection has been established successfully.')
                    init(callback);
                }
        });
    };

    this.model = function () {
        return model;
    };

    this.Sequelize = function () {
        return Sequelize;
    };

    function init(callback) {
        filesystem.readdirSync(modelsPath).forEach(function(name){
            var object = require('.' + modelsPath + "/" + name);
            var options = object.options || {};
            var modelName = name.replace(/\.js$/i, "");

            models[modelName] = sequelize.define(modelName, object.model, options);

            if ("relations" in object) {
                relationships[modelName] = object.relations;
            }
        });

        for (var name in relationships) {
            var relation = relationships[name];
            for (var relName in relation) {
                var related = relation[relName];
                models[name][relName](models[related]);
            }
        }

        return callback();
    };
};

database.instance = null;

database.getInstance = function () {
    if(this.instance === null){
        this.instance = new database();
    }
    return this.instance;
};

module.exports = database.getInstance();
