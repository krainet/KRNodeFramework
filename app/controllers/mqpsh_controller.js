/**
 * Created by ramon on 21/10/15.
 */

/**
 * Created by ramon on 21/10/15.
 * APP CONFIG & VERSIONING
 */

var _               = require('lodash');
var helpers         = require('./../helpers/responseHelper');
var settings        = require('../../config/settings');
var models          = require('../models');
var specialDay      = require('../presta/specialdayData');

var controller_name = 'mqpsh';

module.exports = {
    list: function (req, res, next) {
        return res.status(200).json(helpers.formatResponse(controller_name,req.method,null,'Empty'));
    },
    create: function (req, res, next) {
        return res.status(200).json(helpers.formatResponse(controller_name,req.method,null,'Empty'));
    },
    get: function (req, res, next) {
        specialDay.getIdCustomerFromEmail(req.params.email, function(result,meta) {
            console.log('hola');
            console.log(result);
            models.Customer.findAll({
                include: [{model: models.Devicetoken, as: 'Devicetoken', include: [{model: models.Platform, as: 'Platform',where: {active: true}}]}],
                where: {id_customer : result[0].id_customer.toString()}
            })
                .then(function(customer){
                    if(customer[0]){
                        return res.status(200).json(helpers.formatResponse(controller_name,req.method,customer[0]));
                    }else{
                        return res.status(200).json(helpers.formatResponse(controller_name,req.method,null,'Not found'));
                    }
                })
                .catch(function(err){
                    return res.status(500).json(helpers.formatResponse(controller_name,req.method,err));
                });
            //return res.status(200).json(helpers.formatResponse(controller_name,req.method,result));
        });
    },
    put: function(req,res,next) {
        return res.status(200).json(helpers.formatResponse(controller_name,req.method,null,'Empty'));
    },
    delete: function(req,res,next) {
        return res.status(200).json(helpers.formatResponse(controller_name,req.method,null,'Empty'));
    }
};


