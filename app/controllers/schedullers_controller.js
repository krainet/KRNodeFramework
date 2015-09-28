/**
 * Created by hadock on 15/09/15.
 */
var _               = require('lodash');
var helpers         = require('./_helpers');
var settings        = require('../../config/settings');
var async           = require('async');
var models          = require('../models');

var controller_name = 'schedullers';


module.exports = {
    list: function (req, res, next) {
        models.Scheduller.findAll({
            include: [{model: models.Segment, as: 'Segments'}]
        }).then(function(schedullers) {
            return res.status(200).json(helpers.formatResponse(controller_name,req.method,schedullers));
        });
    },
    create: function (req, res, next) {
        var params = _.pick(req.body, 'name','active');
        return res.status(200).json(helpers.formatResponse(controller_name,req.method,null,'Empty'));
    },
    get: function (req, res, next) {
        return res.status(200).json(helpers.formatResponse(controller_name,req.method,null,'Empty'));
    },
    put: function(req,res,next) {
        return res.status(200).json(helpers.formatResponse(controller_name,req.method,null,'Empty'));
    },
    delete: function(req,res,next) {
        return res.status(200).json(helpers.formatResponse(controller_name,req.method,null,'Empty'));
    }
};
