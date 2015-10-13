var _               = require('lodash');
var helpers         = require('./_helpers');
var settings        = require('../../config/settings');
var async           = require('async');
var models          = require('../models');

var controller_name = 'ncomponents';

var Ncomponent = models.Ncomponent;

module.exports = {
    list: function (req, res, next) {
        Ncomponent.findAll({
            include: [],
            attributes: ['name', 'type', 'tconstructor', 'template', 'values']
        }).then(function(ncomponent) {
            return res.status(200).json(helpers.formatResponse(controller_name,req.method,ncomponent));
        });
    },

    create: function (req, res, next) {
        var params = _.pick(req.body, 'type','name', 'tconstructor', 'template', 'values');
        console.log(params);
        if(params.type && params.name && params.tconstructor && params.template && params.values){
            Ncomponent
                .findOrCreate({where: {type: params.type}, defaults: {name: params.name, tconstructor: params.tconstructor,  template: params.template, values:params.values}})
                .spread(function(ncomponent, created) {
                    if(created)
                        return res.status(200).json(helpers.formatResponse(controller_name,req.method,ncomponent));
                    else
                        return res.status(500).json(helpers.formatErrors(null,controller_name,req.method,'Component already exist, use put bro!'));
                });
        }
    },
    get: function (req, res, next) {
        var searchname = req.params.searchname ? req.params.searchname : null;
        var searchtype = req.params.searchtype ? req.params.searchtype : null;
        var getId = req.params.id ? req.params.id : null;

        if(searchname){
            Ncomponent.findOne({ where: {name: searchname}}).then(function(component) {
                return res.status(200).json(helpers.formatResponse(controller_name,req.method,component));
            });
        }
        else if (searchtype){
            Ncomponent.findOne({ where: {type: searchtype}}).then(function(component) {
                return res.status(200).json(helpers.formatResponse(controller_name,req.method,component));
            });
        }
        else if(getId){
            Ncomponent.findOne({ where: {id: getId}}).then(function(component) {
                return res.status(200).json(helpers.formatResponse(controller_name,req.method,component));
            });
        }
        else{
            return res.status(200).json(helpers.formatResponse(controller_name,req.method,null,'Empty'));
        }
    },
    put: function(req,res,next) {
        var getId = req.params.id ? req.params.id : null;
        var searchname = req.params.searchname ? req.params.searchname : null;
        var searchtype = req.params.searchtype ? req.params.searchtype : null;

        var params = _.pick(req.body, 'type', 'name', 'tconstructor', 'template', 'values');
        if (searchname){
            Ncomponent.update(
                params,
                {where: {name : searchname}}
            ).then(function(updated) {
                if(updated) {
                    return res.status(200).json(helpers.formatResponse(controller_name,req.method,'Updated OK'));
                } else {
                    return res.status(500).json(helpers.formatResponse(controller_name,req.method,'Not found so not updated bro'));
                }
            });
        }
        else if (searchtype){
            Ncomponent.update(
                params,
                {where: {type : searchtype}}
            ).then(function(updated) {
                if(updated) {
                    return res.status(200).json(helpers.formatResponse(controller_name,req.method,'Updated OK'));
                } else {
                    return res.status(500).json(helpers.formatResponse(controller_name,req.method,'Not found so not updated bro'));
                }
            });
        }
        else if (getId){
            Ncomponent.update(
                params,
                {where: {id : getId}}
            ).then(function(updated) {
                if(updated) {
                    return res.status(200).json(helpers.formatResponse(controller_name,req.method,'Updated OK'));
                } else {
                    return res.status(500).json(helpers.formatResponse(controller_name,req.method,'Not found so not updated bro'));
                }
            });
        }
        else {
            return res.status(500).json(helpers.formatResponse(controller_name,req.method,null,'I need something to update bro'));
        }
    },
    delete: function(req,res,next) {
        var getId = req.params.id ? req.params.id : null;
        var searchtype = req.params.searchtype ? req.params.searchtype : null;


        if (searchtype){
            Ncomponent.update(
                {deleted :1},
                {where: {type : searchtype}}
            ).then(function(deleted) {
                console.log(deleted);
                if(deleted) {
                    return res.status(200).json(helpers.formatResponse(controller_name,req.method,'deleted OK'));
                } else {
                    return res.status(500).json(helpers.formatResponse(controller_name,req.method,'Not found so not destroyed bro'));
                }
            });
        }
        else if (getId){
            Ncomponent.update(
                {deleted :1},
                {where: {id : getId}}
            ).then(function(deleted) {
                if(deleted) {
                    return res.status(200).json(helpers.formatResponse(controller_name,req.method,'deleted OK'));
                } else {
                    return res.status(500).json(helpers.formatResponse(controller_name,req.method,'Not found so not destroyed bro'));
                }
            });
        }
        else {
            return res.status(500).json(helpers.formatResponse(controller_name,req.method,null,'I need something to destroy bro'));
        }
    }
};
