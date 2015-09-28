/**
 * Created by hadock on 15/09/15.
 */
var _               = require('lodash');
var helpers         = require('./_helpers');
var settings        = require('../../config/settings');
var async           = require('async');
var models          = require('../models');

var controller_name = 'customers';


module.exports = {
    list: function (req, res, next) {
        models.Customer.findAll({
            include: [{model: models.Devicetoken, as: 'Devicetokens', include: [{model: models.Platform, as: 'Platform'}]}],
            include: [{model: models.Segment, as: 'Segments'}]
        }).then(function(customers) {
            return res.status(200).json(helpers.formatResponse(controller_name,req.method,customers));
        });
    },
    create: function (req, res, next) {
        var params = _.pick(req.body, 'email', 'id_customer','token','platform');
        //Check if device token is registered

        if(params.token && params.platform && params.id_customer){ //Devicetoken and id_customer
            models.Devicetoken
                .findOrCreate({where: {token: params.token}})
                .spread(function(devicetoken, created) {
                    if(created){
                        models.Customer
                            .findOrCreate({where:{id_customer: params.id_customer}})
                            .spread(function(customer,created){
                                if(created){
                                    //Creamos customer (primer customer y token)
                                    customer.addDevicetoken(devicetoken);
                                }else{
                                    //Ya existia el customer
                                    customer.addDevicetoken(devicetoken);
                                }
                            });
                    }else{
                        return res.status(500).json(helpers.formatResponse(controller_name,req.method,null,'Device token allredy exist'));
                    }

                    return res.status(200).json(helpers.formatResponse(controller_name,req.method,devicetoken,'Created!'));
                });
        }else if(params.token && params.platform){ //Only devicetoken
            Devicetoken
                .findOrCreate({where: {token: params.token}})
                .spread(function(devicetoken, created) {
                    return res.status(200).json(helpers.formatResponse(controller_name,req.method,devicetoken,'Created!'));

                });
        }
    },
    get: function (req, res, next) {
        req.models.customer.get(req.params.id,function (err, customer) {
            if(err) return res.status(500).json(helpers.formatErrors(err,controller_name,req.method));
            return res.status(200).json(helpers.formatResponse(controller_name,req.method,customer.serialize()));
        });

    },
    put: function(req,res,next) {
        var params = _.pick(req.body, 'username', 'email','password','id_customer','token');
        req.models.customer.get(req.params.id,function (err, customer) {
            if(err) return res.status(500).json(helpers.formatErrors(err,controller_name,req.method));
            customer.save(params);
            return res.status(200).json(helpers.formatResponse(controller_name,req.method,customer.serialize()));
        });
    },
    delete: function(req,res,next) {
        req.models.customer.get(req.params.id,function (err, user) {
            user.remove(function(err){
                if(err) {
                    return res.status(500).json(helpers.formatErrors(err,controller_name,req.method));
                }else{
                    return res.status(200).json(helpers.formatResponse(controller_name,req.method,null,'Customer deleted'));
                }

            })
        });
    }
};
