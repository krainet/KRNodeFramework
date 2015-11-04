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
                params.segments.forEach(function(segment){
                    models.Segment.findOne({ where: {id: segment.id} }).then(function(segment) {
                        segment.addScheduler(campaign);
                    });
                });
                return res.status(200).json(helpers.formatResponse(controller_name,req.method,campaign));
            }else{
                return res.status(500).json(helpers.formatErrors(null,controller_name,req.method,'Error in post campaign'));
            }

        }).catch(function(err){
            return res.status(500).json(helpers.formatCreateErrors(err,controller_name,req.method));
        });
    },
    get: function (req, res, next) {
        models.Scheduler.findById(req.params.id,{
            include: [{model: models.Segment, as: 'Segments'}]
        })
            .then(function(scheduler){
                if(scheduler){
                    return res.status(200).json(helpers.formatResponse(controller_name,req.method,scheduler));
                }else{
                    return res.status(200).json(helpers.formatResponse(controller_name,req.method,null,'Not found'));
                }
            })
            .catch(function(err){
                return res.status(500).json(helpers.formatResponse(controller_name,req.method,err));
            });

    },
    put: function(req,res,next) {
        var params = _.pick(req.body, 'name','message_apple','message_android','date_send','segments','is_draft');
        params.segments=params.segments?params.segments:[];
        params.id = req.params.id;
        models.Scheduler.findById(params.id).then(function(scheduler) {
            scheduler.update(params).then(function(scheduler){
                scheduler.setSegments([]);
                params.segments.forEach(function(segment){
                    models.Segment.findById(segment.id).then(function(segment2) {
                        scheduler.addSegment(segment2);
                    });
                });
                return res.status(200).json(helpers.formatResponse(controller_name,req.method,scheduler,'Empty'));
            });

        });

    },
    delete: function(req,res,next) {
        if(!req.params.id){
            return res.status(500).json(helpers.formatErrors(null,controller_name,req.method,'Error in REST standard DELETE'));
        }
        models.Scheduler.findById(req.params.id)
            .then(function(campaign){
                campaign.destroy()
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
