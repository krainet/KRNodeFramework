/**
 * Created by hadock on 15/09/15.
 */
var _               = require('lodash');
var helpers         = require('./../helpers/responseHelper');
var settings        = require('../../config/settings');
var async           = require('async');
var models          = require('../models');

var controller_name = 'campaigns';


module.exports = {
    list: function (req, res, next) {
        return res.status(500).json(helpers.formatErrors(null,controller_name,req.method,'Endpoint not aviable'));
    },
    create: function (req, res, next) {
        return res.status(500).json(helpers.formatErrors(null,controller_name,req.method,'Endpoint not aviable'));
    },
    get: function (req, res, next) {
        models.Scheduler.findById(req.params.id,{
            include: [{model: models.Segment, as: 'Segments'}]
        })
            .then(function(scheduler){
                if(scheduler){
                    var conditions = [];
                    scheduler.Segments.forEach(function(element){
                        conditions.push(JSON.parse(element.configuration));
                    });
                    models.Devicetoken.findAll({where: conditions,attributes: ['token']})
                        .then(function(result) {
                            return res.status(200).json(helpers.formatResponse(controller_name,req.method,result));
                        });
                }else{
                    return res.status(200).json(helpers.formatResponse(controller_name,req.method,null,'Not found'));
                }
            })
            .catch(function(err){
                return res.status(500).json(helpers.formatResponse(controller_name,req.method,err));
            });

    },
    put: function(req,res,next) {
        return res.status(500).json(helpers.formatErrors(null,controller_name,req.method,'Endpoint not aviable'));
    },
    delete: function(req,res,next) {
        return res.status(500).json(helpers.formatErrors(null,controller_name,req.method,'Endpoint not aviable'));
    }
};
