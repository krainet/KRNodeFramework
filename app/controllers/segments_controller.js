/**
 * Created by hadock on 15/09/15.
 */
var _               = require('lodash');
var helpers         = require('./../helpers/responseHelper');
var settings        = require('../../config/settings');
var models          = require('../models');

var controller_name = 'segments';

module.exports = {
    list: function (req, res, next) {
        models.Segment.findAll({
            //include: [{model: models.Devicetoken, as: 'Devicetokens', include: [{model: models.Platform, as: 'Platform'}]}]
            include: [{model: models.Customer, as: 'Customers'},{model: models.Scheduler, as: 'Scheduler'}]
        }).then(function(customers) {
            return res.status(200).json(helpers.formatResponse(controller_name,req.method,customers));
        });
    },
    create: function (req, res, next) {
        var params = _.pick(req.body, 'name','description','configuration');
        models.Segment.create(params)
            .then(function(segment){
                if(segment){
                    return res.status(200).json(helpers.formatResponse(controller_name,req.method,segment));
                }else{
                    return res.status(500).json(helpers.formatErrors(null,controller_name,req.method,'Error creating campaign'));
                }
            })
            .catch(function(err){
                return res.status(500).json(helpers.formatCreateErrors(err,controller_name,req.method));
            });
    },
    get: function (req, res, next) {
        models.Segment.findById(req.params.id)
            .then(function(data){
                if(data)
                    return res.status(200).json(helpers.formatResponse(controller_name,req.method,data));
                else
                    return res.status(500).json(helpers.formatErrors(null,controller_name,req.method,'Segment not found'));
            })
            .catch(function(err){
                return res.status(500).json(helpers.formatErrors(err,controller_name,req.method,'Error finding segment'));
            })

    },
    put: function(req,res,next) {
        if(!req.params.id){
            return res.status(500).json(helpers.formatErrors(null,controller_name,req.method,'Error in REST standard DELETE'));
        }
        var params = _.pick(req.body, 'name','description','configuration');
        models.Segment.findById(req.params.id).then(function(segment) {
            segment.update(params).then(function(result){
                return res.status(200).json(helpers.formatResponse(controller_name,req.method,result,'Updated'));
            });
        });

    },
    delete: function(req,res,next) {
        if(!req.params.id){
            return res.status(500).json(helpers.formatErrors(null,controller_name,req.method,'Error in REST standard DELETE'));
        }
        models.Segment.findById(req.params.id)
            .then(function(segment){
                segment.destroy()
                    .then(function(result){
                        return res.status(200).json(helpers.formatResponse(controller_name,req.method,result,'Deleted successfull'));
                    })
                    .catch(function(err){
                        return res.status(500).json(helpers.formatErrors(err,controller_name,req.method,'Error deleting'));
                    })

            })
            .catch(function(err){
                return res.status(500).json(helpers.formatErrors(err,controller_name,req.method,'Error finding this campaign'));
            })
    }
};
