/**
 * Created by hadock on 15/09/15.
 */
var _               = require('lodash');
var helpers         = require('./_helpers');
var settings        = require('../../config/settings');
var async           = require('async');

var controller_name = 'devicetokens';


module.exports = {
    list: function (req, res, next) {

        req.models.devicetoken.find().order('-id').all(function (err, devicetokens) {
            if (err) return res.status(500).json(helpers.formatErrors(err,controller_name,req.method));
            return res.status(200).json(helpers.formatResponse(controller_name,req.method,helpers.mapResults(devicetokens)));
        });
    },
    create: function (req, res, next) {
        var params = _.pick(req.body, 'token');

        req.models.devicetoken.count({token:params.token},function(err,devicetoken_count){
            if(err){
                return res.status(500).json(helpers.formatErrors(err,controller_name,req.method));
            }else{
                if(devicetoken_count>0){
                    return res.status(200).json(helpers.formatResponse(controller_name,req.method,null,'Duplicated deviceToken'));
                }else{
                    req.models.devicetoken.create(params,function(err,devicetoken){
                        return res.status(200).json(helpers.formatResponse(controller_name,req.method,devicetoken.serialize()));
                    });
                }
            }
        });
    },
    get: function (req, res, next) {
        var searchtoken = req.params.searchtoken?req.params.searchtoken:null;

        if(searchtoken){
            req.models.devicetoken.find({token:searchtoken},function (err, devicetoken) {
                if(err)
                    return res.status(500).json(helpers.formatErrors(err,controller_name,req.method));
                else
                    return res.status(200).json(helpers.formatResponse(controller_name,req.method,helpers.mapResults(devicetoken)));
            });
        }else{
            req.models.devicetoken.get(req.params.id,function (err, devicetoken) {
                if(err)
                    return res.status(500).json(helpers.formatErrors(err,controller_name,req.method));
                else
                    return res.status(200).json(helpers.formatResponse(controller_name,req.method,devicetoken.serialize()));
            });
        }
    },
    put: function(req,res,next) {
        var params = _.pick(req.body, 'email', 'token','id_customer');
        req.models.devicetoken.get(req.params.id,function (err, devicetoken) {
            if(err) return res.status(500).json(helpers.formatErrors(err,controller_name,req.method));
            devicetoken.hasOwner(function(err,hasowner){
                if(!hasowner){
                    if(params.id_customer || params.email){
                        req.models.customer.create(params, function(err,customer){
                            devicetoken.setOwner(customer, function(err,devicetoken){
                                if(err) {
                                    return res.status(500).json(helpers.formatErrors(err,controller_name,req.method));
                                }
                                else {
                                    delete  params['token'];
                                    //devicetoken.save(params);
                                    return res.status(200).json(helpers.formatResponse(controller_name,req.method,devicetoken.serialize()));
                                }
                            });
                        });
                    }else{
                        return res.status(200).json(helpers.formatResponse(controller_name,req.method,devicetoken.serialize(),'No info provided to update owner of token'));
                    }
                }else{
                    return res.status(200).json(helpers.formatResponse(controller_name,req.method,devicetoken.serialize(),'This devicetoken has owner yet'));
                }
            });
        });
    },
    delete: function(req,res,next) {
        req.models.devicetoken.get(req.params.id,function (err, devicetoken) {
            user.remove(function(err){
                if(err) {
                    return res.status(500).json(helpers.formatErrors(err,controller_name,req.method));
                }else{
                    return res.status(200).json(helpers.formatResponse(controller_name,req.method,null,'Devicetoken deleted'));
                }

            })
        });
    }
};
