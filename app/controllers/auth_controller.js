/**
 * Created by hadock on 15/09/15.
 */
var _               = require('lodash');
var helpers         = require('./../helpers/responseHelper');
var settings        = require('../../config/settings');
var jwt             = require('jsonwebtoken');
var models          = require('../models');
var crypto          = require('crypto');

var controller_name = 'auth';


module.exports = {
    list: function (req, res, next) {
        return res.status(200).json(helpers.formatResponse(controller_name,req.method,req.decoded,null));
/*
        models.User
            .findAndCountAll({})
            .then(function(users) {
                if(users){
                    return res.status(200).json(helpers.formatResponse(controller_name,req.method,users,null));
                }else{
                    return res.status(500).json(helpers.formatErrors(null,controller_name,req.method,'Not found'));
                }
            });
*/

    },
    create: function (req, res, next) {
        if(req.body.username && req.body.password){
            models.User.findOne({ where: {username: req.body.username,password: crypto.createHash('md5').update(req.body.password).digest("hex")} })
                .then(function(user) {
                    if(user){
                        var token = jwt.sign(user, settings.secret_jwt, {
                            expiresInMinutes: 5 // expires in 24 hours
                        });
                        return res.status(200).json(helpers.formatResponse(controller_name,req.method,user,null,token));
                    }else{
                        return res.status(500).json(helpers.formatErrors(null,controller_name,req.method,'Authentication failed'));
                    }
                })
        }else{
            return res.status(500).json(helpers.formatErrors(null,controller_name,req.method,'Parameters missing'));
        }
    },
    get: function (req, res, next) {
        return res.status(200).json(helpers.formatResponse(controller_name,req.method,null,'Empty'));
    },
    put: function(req,res,next) {
        return res.status(200).json(helpers.formatResponse(controller_name,req.method,null,'Empty'));
    },
    delete: function(req,res,next) {
        return res.status(200).json(helpers.formatResponse(controller_name,req.method,null,'Empty'));
    }
};