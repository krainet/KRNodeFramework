/**
 * Created by hadock on 15/09/15.
 */
var _               = require('lodash');
var helpers         = require('./_helpers');
var settings        = require('../../config/settings');
var async           = require('async');
var models          = require('../models');

var controller_name = 'platforms';


module.exports = {
    list: function (req, res, next) {
        models.Platform.findAll({
            include: [{model: models.Devicetoken, as: 'Devicetoken'}],
        }).then(function(platforms) {
            return res.status(200).json(helpers.formatResponse(controller_name, req.method, helpers.formatResponse(controller_name,req.method,platforms)));
        });
    },
    create: function (req, res, next) {
        var params = _.pick(req.body, 'token');
        return res.status(200).json(helpers.formatResponse(controller_name, req.method, helpers.formatResponse(controller_name,req.method,null,'Empty response')));
    },
    get: function (req, res, next) {
        var searchtoken = req.params.searchtoken?req.params.searchtoken:null;
        return res.status(200).json(helpers.formatResponse(controller_name, req.method, helpers.formatResponse(controller_name,req.method,null,'Empty response')));
    },
    put: function(req,res,next) {
        return res.status(200).json(helpers.formatResponse(controller_name, req.method, helpers.formatResponse(controller_name,req.method,null,'Empty response')));
    },
    delete: function(req,res,next) {
        return res.status(200).json(helpers.formatResponse(controller_name, req.method, helpers.formatResponse(controller_name,req.method,null,'Empty response')));
    }
};
