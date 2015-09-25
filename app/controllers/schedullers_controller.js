/**
 * Created by hadock on 15/09/15.
 */
var _               = require('lodash');
var helpers         = require('./_helpers');
var settings        = require('../../config/settings');
var async           = require('async');

var controller_name = 'schedullers';


module.exports = {
    list: function (req, res, next) {

        req.models.scheduller.find().order('-id').all(function (err, schedullers) {
            if (err) return res.status(500).json(helpers.formatErrors(err,controller_name,req.method));
            return res.status(200).json(helpers.formatResponse(controller_name,req.method,helpers.mapResults(schedullers)));
        });
    },
    create: function (req, res, next) {
        var params = _.pick(req.body, 'name','active');

        req.models.scheduller.create(params,function(err,scheduller){
            return res.status(200).json(helpers.formatResponse(controller_name,req.method,scheduller.serialize()));
        });

    },
    get: function (req, res, next) {
        req.models.scheduller.get(req.params.id,function (err, scheduller) {
            if(err)
                return res.status(500).json(helpers.formatErrors(err,controller_name,req.method));
            else
                return res.status(200).json(helpers.formatResponse(controller_name,req.method,scheduller.serialize()));
        });

    },
    put: function(req,res,next) {
        var params = _.pick(req.body, 'name', 'active');
        req.models.scheduller.get(req.params.id,function (err, scheduller) {
            if(err) return res.status(500).json(helpers.formatErrors(err,controller_name,req.method));
            else scheduller.save(params);

        });
    },
    delete: function(req,res,next) {
        req.models.scheduller.get(req.params.id,function (err, scheduller) {
            scheduller.remove(function(err){
                if(err) {
                    return res.status(500).json(helpers.formatErrors(err,controller_name,req.method));
                }else{
                    return res.status(200).json(helpers.formatResponse(controller_name,req.method,null,'scheduller deleted'));
                }

            })
        });
    }
};
