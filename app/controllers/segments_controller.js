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
        req.models.segment.create(req.body,function(err,segment){
            if(err) return res.status(500).json(helpers.formatErrors(err,controller_name,req.method));
            return res.status(200).json(helpers.formatResponse(controller_name,req.method,segment.serialize()));
        });
    },
    get: function (req, res, next) {
        req.models.segment.get(req.params.id,function (err, segment) {
            if(err) return res.status(500).json(helpers.formatErrors(err,controller_name,req.method));
            return res.status(200).json(helpers.formatResponse(controller_name,req.method,segment.serialize()));
        });

    },
    put: function(req,res,next) {
        req.models.segment.get(req.params.id,function (err, segment) {
            if(err) return res.status(500).json(helpers.formatErrors(err,controller_name,req.method));
            segment.save(req.body);
            return res.status(200).json(helpers.formatResponse(controller_name,req.method,segment.serialize()));
        });
    },
    delete: function(req,res,next) {
        req.models.segment.get(req.params.id,function (err, segment) {
            segment.remove(function(err){
                if(err) {
                    return res.status(500).json(helpers.formatErrors(err,controller_name,req.method));
                }else{
                    return res.status(200).json(helpers.formatResponse(controller_name,req.method,null,'Segment deleted'));
                }

            })
        });
    }
};
