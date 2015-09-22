/**
 * Created by hadock on 15/09/15.
 */
var _               = require('lodash');
var helpers         = require('./_helpers');
var settings        = require('../../config/settings');

var controller_name = 'segments';

module.exports = {
    list: function (req, res, next) {
        req.models.segment.find().order('-id').all(function (err, segments) {
            if (err) {
                return res.status(500).json(helpers.formatErrors(err,controller_name,req.method));
            }else{
                return res.status(200).json(helpers.formatResponse(controller_name,req.method,helpers.mapResults(segments)));
            }
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
