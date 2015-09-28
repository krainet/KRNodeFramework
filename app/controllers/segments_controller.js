/**
 * Created by hadock on 15/09/15.
 */
var _               = require('lodash');
var helpers         = require('./_helpers');
var settings        = require('../../config/settings');
var models          = require('../models');

var controller_name = 'segments';

module.exports = {
    list: function (req, res, next) {
        models.Segment.findAll({
            //include: [{model: models.Devicetoken, as: 'Devicetokens', include: [{model: models.Platform, as: 'Platform'}]}]
            include: [{model: models.Customer, as: 'Customers'}]
        }).then(function(customers) {
            return res.status(200).json(helpers.formatResponse(controller_name,req.method,customers));
        });
    },
    create: function (req, res, next) {
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
