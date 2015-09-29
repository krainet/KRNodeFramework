/**
 * Created by hadock on 15/09/15.
 */
var _               = require('lodash');
var helpers         = require('./_helpers');
var settings        = require('../../config/settings');
var models          = require('../models');
var push_helper     = require('../helpers/push_helper')



var controller_name = 'pushlauncher';


module.exports = {
    list: function (req, res, next) {
    return res.status(200).json(helpers.formatResponse(controller_name, req.method, helpers.formatResponse(controller_name,req.method,null,'Empty response')));
    },
    create: function (req, res, next) {
        var params = _.pick(req.body, 'devicetoken','scheduller');
        if(params.devicetoken){
            push_helper.SendOnePush(params.devicetoken,function(err,response){
                if(err)
                    return res.status(500).json(helpers.formatErrors(err,controller_name,req.method));
                else
                    return res.status(200).json(helpers.formatResponse(controller_name, req.method,response));
            });
        }else{
            return res.status(500).json(helpers.formatErrors(null,controller_name,req.method));
        }
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
