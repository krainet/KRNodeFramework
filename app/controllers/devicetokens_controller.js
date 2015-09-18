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
            var items = devicetokens.map(function (m) {
                return m.serialize();
            });

            return res.status(200).json(helpers.formatResponse(controller_name,req.method,items));
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
        req.models.devicetoken.get(req.params.id,function (err, devicetoken) {
            if(err) return res.status(500).json(helpers.formatErrors(err,controller_name,req.method));
            var items = devicetoken.serialize();
            return res.status(200).json(helpers.formatResponse(controller_name,req.method,items));
        });

    },
    put: function(req,res,next) {
        var params = _.pick(req.body, 'username', 'email','password','token');
        req.models.devicetoken.find({token:params.token},function (err, devicetoken) {
            if(err) return res.status(500).json(helpers.formatErrors(err,controller_name,req.method));
            console.log(devicetoken);
            devicetoken.save(params);
            return res.status(200).json(helpers.formatResponse(controller_name,req.method,devicetoken.serialize()));
        });
    },
    delete: function(req,res,next) {
        req.models.devicetoken.get(req.params.id,function (err, user) {
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
