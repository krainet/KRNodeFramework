/**
 * Created by hadock on 15/09/15.
 */
var _               = require('lodash');
var helpers         = require('./_helpers');
var settings        = require('../../config/settings');
var models          = require('../models');
var push_helper     = require('../helpers/push_helper')
var b64             = require('../helpers/b64crypt');


var controller_name = 'pushhistory';


module.exports = {
    list: function (req, res, next) {
    return res.status(200).json(helpers.formatResponse(controller_name, req.method, helpers.formatResponse(controller_name,req.method,null,'Empty response')));
    },
    create: function (req, res, next) {
        var params = _.pick(req.body, 'devicetoken','scheduler');
        if(params.devicetoken){
            var decodedtoken = b64.decode(params.devicetoken);
            push_helper.SendOnePush(decodedtoken,function(err,response){
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
        var devicetoken = req.params.devicetoken?req.params.devicetoken:null;
        if(devicetoken){
            models.Devicetoken.findOne({where:{token:devicetoken}}).then(function(token){
                if(token){
                    models.Pushhistory.findAll({ where: {DevicetokenId: token.id},include: [{model: models.Devicetoken, as: 'Devicetoken'}]}).then(function(token) {
                        return res.status(200).json(helpers.formatResponse(controller_name,req.method,token));
                    });
                }else{
                    return res.status(500).json(helpers.formatErrors(null,controller_name,req.method,'Token not found.'));
                }
            });
        }else{
            return res.status(500).json(helpers.formatErrors(null,controller_name,req.method,'No id customer provided'));
        }
    },
    put: function(req,res,next) {
        return res.status(200).json(helpers.formatResponse(controller_name, req.method, helpers.formatResponse(controller_name,req.method,null,'Empty response')));
    },
    delete: function(req,res,next) {
        return res.status(200).json(helpers.formatResponse(controller_name, req.method, helpers.formatResponse(controller_name,req.method,null,'Empty response')));
    }
};
