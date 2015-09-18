/**
 * Created by hadock on 15/09/15.
 */
var _               = require('lodash');
var helpers         = require('./_helpers');
var settings        = require('../../config/settings');
var async           = require('async');

var controller_name = 'customers';


module.exports = {
    list: function (req, res, next) {

        req.models.customer.find().order('-id').all(function (err, customers) {
            if (err) return res.status(500).json(helpers.formatErrors(err,controller_name,req.method));
            var items = customers.map(function (m) {
                return m.serialize();
            });

            return res.status(200).json(helpers.formatResponse(controller_name,req.method,items));
        });
    },
    create: function (req, res, next) {
        var params = _.pick(req.body, 'email', 'id_customer');
        var tokenparams = _.pick(req.body, 'token');

        async.waterfall([
            //Check if device token is registered
            function(next){
                req.models.devicetoken.count({token:tokenparams.token},function(err,devicetoken_count){
                    if(err){
                        return res.status(500).json(helpers.formatErrors(err,controller_name,req.method));
                    }else{
                        if(devicetoken_count>0){
                            return res.status(200).json(helpers.formatResponse(controller_name,req.method,null,'Duplicated deviceToken'));
                        }else{
                            next();
                        }
                    }
                    next();
                });
            },
            //If not registered - register user & token
            function(next){
                req.models.customer.create(params, function(err,customer){
                    if (err) return res.status(500).json(helpers.formatErrors(err,controller_name,req.method));

                    tokenparams.owner_id = customer.id;
                    req.models.devicetoken.create(tokenparams, function (err, devicetoken) {
                        if(err) return res.status(500).json(helpers.formatErrors(err,controller_name,req.method));
                        return res.status(200).json(helpers.formatResponse(controller_name,req.method,customer.serialize()));
                    });
                });
            }
        ],function(err,result){
            if(err) return res.status(500).json(helpers.formatErrors(err,controller_name,req.method));
        });
    },
    get: function (req, res, next) {
        req.models.customer.get(req.params.id,function (err, customer) {
            if(err) return res.status(500).json(helpers.formatErrors(err,controller_name,req.method));
            var items = customer.serialize();
            return res.status(200).json(helpers.formatResponse(controller_name,req.method,items));
        });

    },
    put: function(req,res,next) {
        var params = _.pick(req.body, 'username', 'email','password');
        req.models.customer.get(req.params.id,function (err, user) {
            if(err) return res.status(500).json(helpers.formatErrors(err,controller_name,req.method));
            user.save(params);
        });
    },
    delete: function(req,res,next) {
        req.models.customer.get(req.params.id,function (err, user) {
            user.remove(function(err){
                if(err) return res.status(500).json(helpers.formatErrors(err,controller_name,req.method));
            })
        });
    }
};
