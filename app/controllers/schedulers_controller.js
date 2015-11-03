/**
 * Created by hadock on 15/09/15.
 */
var _               = require('lodash');
var helpers         = require('./../helpers/responseHelper');
var settings        = require('../../config/settings');
var async           = require('async');
var models          = require('../models');

var controller_name = 'schedulers';


module.exports = {
    list: function (req, res, next) {
        models.Scheduler.findAll({
            include: [{model: models.Segment, as: 'Segments'}]
        }).then(function(schedulers) {
            return res.status(200).json(helpers.formatResponse(controller_name,req.method,schedulers));
        });
    },
    create: function (req, res, next) {
        var params = _.pick(req.body, 'name','message_apple','message_android','date_send','segments');
        models.Scheduler.create(params).then(function(campaign){
            if(campaign){
                return res.status(200).json(helpers.formatResponse(controller_name,req.method,campaign));
            }else{
                return res.status(500).json(helpers.formatErrors(null,controller_name,req.method,'Error in post campaign'));
            }

        }).catch(function(err){
            return res.status(500).json(helpers.formatCreateErrors(err,controller_name,req.method));
        });
/*
        models.Scheduler
            .findOrCreate({where:{},defaults: {name: params.name, message_apple: params.message_apple,  message_android: params.message_android, date_send:params.date_send}})
            .spread(function(campaign,created){
                if(created){
                    return res.status(200).json(helpers.formatResponse(controller_name,req.method,campaign));
                }else{
                    return res.status(200).json(helpers.formatResponse(controller_name,req.method,campaign));
                }
            });
*/

        //return res.status(500).json(helpers.formatErrors(null,controller_name,req.method,'Error in post request'));
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
