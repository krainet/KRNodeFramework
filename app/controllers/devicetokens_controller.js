/**
 * Created by hadock on 15/09/15.
 */
var _               = require('lodash');
var helpers         = require('./_helpers');
var settings        = require('../../config/settings');
var async           = require('async');
var models          = require('../models');

var controller_name = 'devicetokens';


module.exports = {
    list: function (req, res, next) {
        models.Devicetoken.findAll({
            include: [ models.Platform ],
            include: [ models.Segment ],
            include: [ models.Customer ]
        }).then(function(devicetoken) {
            return res.status(200).json(helpers.formatResponse(controller_name,req.method,devicetoken));
        });

    },
    create: function (req, res, next) {
        var params = _.pick(req.body, 'token','platform');

        if(params.token && params.platform){
            Devicetoken
                .findOrCreate({where: {token: params.token}})
                .spread(function(devicetoken, created) {
                    console.log(created);
                });
        }


    },
    get: function (req, res, next) {
        var searchtoken = req.params.searchtoken?req.params.searchtoken:null;

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
