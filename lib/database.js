'use strict';


var logger = require('./logger'),
    filesystem = require('fs'),
    models = {},
    relationships = {};

var Database = function database() {
    var Sequelize = require("sequelize"),
        sequelize = null,
        modelsPath = "",
        hasBeenConfigured = false;

    this.config = function (config, callback){
        if (hasBeenConfigured) {
            return callback('Error, the database has already been configured');
        }
        hasBeenConfigured = true;

        modelsPath = config.modulePath;
        config = config.database;

        sequelize = new Sequelize(config.database, config.username, config.password, config.options);

        sequelize
            .authenticate()
            .complete(function (error) {
                if (!!error) {
                    logger.error('Unable to connect to the database:', error)
                    return callback(error);
                } else {
                    logger.info('Connection has been established successfully.')
                    setupModels(callback);
                }
        });
    };

    this.model = function () {
        return model;
    };

    this.Sequelize = function () {
        return Sequelize;
    };

    var setupModels = function (callback) {
        filesystem.readdirSync(modelsPath).forEach(function(name){
            var object = require('.' + modelsPath + "/" + name),
                options = object.options || {},
                modelName = name.replace(/\.js$/i, "");

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

Database.getInstance = function () {
    if(!this.instance){
        this.instance = new Database();
    }
    return this.instance;
};

module.exports = Database.getInstance();
