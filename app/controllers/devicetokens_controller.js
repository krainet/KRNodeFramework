/**
 * Created by hadock on 15/09/15.
 */
var _               = require('lodash');
var helpers         = require('./_helpers');
var settings        = require('../../config/settings');
var async           = require('async');
var models          = require('../models');
var b64             = require('../helpers/b64crypt');


var controller_name = 'devicetokens';

var Devicetoken = models.Devicetoken;

module.exports = {
    list: function (req, res, next) {
        models.Devicetoken.findAll({
            include: [ {model:models.Platform,as:'Platform'},{model:models.Customer,as:'Customer'},{model:models.Segment},{model:models.Pushhistory,as:'Pushhistory'}]
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
                    if(created)
                        return res.status(200).json(helpers.formatResponse(controller_name,req.method,devicetoken));
                    else
                        return res.status(500).json(helpers.formatErrors(null,controller_name,req.method,'Token allready exist!'));
                });
        }


    },
    get: function (req, res, next) {
        var searchtoken = req.params.searchtoken ? req.params.searchtoken : null;
        var getId = req.params.id ? req.params.id : null;
        var idCustomer = req.params.id_customer ? req.params.id_customer : null;


        if(searchtoken){
            var decodedsearch = b64.decode(searchtoken);
            Devicetoken.findOne({ where: {token: decodedsearch}}).then(function(token) {
                return res.status(200).json(helpers.formatResponse(controller_name,req.method,token));
            });
        }else if(getId){
            Devicetoken.findOne({ where: {id: getId}}).then(function(token) {
                return res.status(200).json(helpers.formatResponse(controller_name,req.method,token));
            });
        }else if(idCustomer){
            Devicetoken.findOne({ where: {CustomerId: idCustomer}}).then(function(token) {
                return res.status(200).json(helpers.formatResponse(controller_name,req.method,token));
            });
        }else{
                return res.status(200).json(helpers.formatResponse(controller_name,req.method,null,'Empty'));
        }
    },
    put: function(req,res,next) {
        var params = _.pick(req.body, 'email', 'token','id_customer');
        return res.status(200).json(helpers.formatResponse(controller_name,req.method,null,'Empty'));
    },
    delete: function(req,res,next) {
        return res.status(200).json(helpers.formatResponse(controller_name,req.method,null,'Empty'));
    }
};
