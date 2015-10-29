var _               = require('lodash');
var helpers         = require('./../helpers/responseHelper');
var settings        = require('../../config/settings');
var async           = require('async');
var models          = require('../models');

var controller_name = 'nhistory';

var Nhistory = models.Nhistory;

module.exports = {
    list: function (req, res, next) {
        Nhistory.findAll({
            include: [],
            where: {deleted : 0},
            attributes: ['name', 'shop',  'expectedDate', 'sent', 'json', 'html', 'text']
        }).then(function(nhistory) {
            return res.status(200).json(helpers.formatResponse(controller_name,req.method,nhistory));
        });
    },

    create: function (req, res, next) {
        var params = _.pick(req.body,'name', 'expectedDate', 'shop', 'json', 'html', 'text');
        console.log(params);
        if(params.name && params.json && params.html){
            params.expectedDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
            Nhistory
                .create({name: params.name, shop: params.shop, json: params.json,  html: params.html, expectedDate: params.expectedDate})
                .then(function(created) {
                    if(created)
                        return res.status(200).json(helpers.formatResponse(controller_name,req.method, created));
                    else
                        return res.status(500).json(helpers.formatErrors(null,controller_name,req.method,'Error while creating'));
                });
        }
        else {
            return res.status(500).json(helpers.formatResponse(null, controller_name,req.method,'Error while creating'));
        }
    },
    get: function (req, res, next) {
        var searchname = req.params.searchname ? req.params.searchname : null;
        var getId = req.params.id ? req.params.id : null;

        if(searchname){
            if (getId && searchname == 'duplicate') {
                Nhistory.findOne({
                    attributes: ['name', 'expectedDate', 'shop', 'json', 'html', 'text'],
                    where: {id: getId, deleted : 0}
                }).then(function(component) {
                    console.log(component.name);
                    //console.log(component.id);
                    console.log(component.shop);
                    Nhistory
                        .create({name: component.name, expectedDate: component.expectedDate, shop: component.shop, json: component.json,  html: component.html})
                        .then(function(created) {
                            if(created)
                                return res.status(200).json(helpers.formatResponse(controller_name,req.method, 'Duplicated ok'));
                            else
                                return res.status(500).json(helpers.formatErrors(null,controller_name,req.method,'Error while duplicating'));
                        });
                });
            }
            else if (searchname == 'lastnews') {
                Nhistory.findAll({
                    order: 'updatedAt DESC',
                    limit: 1,
                    attributes: ['id', 'name', 'expectedDate', 'shop', 'json', 'html', 'text'],
                    where: {deleted : 0}
                }).then(function(component) {
                    return res.status(200).json(helpers.formatResponse(controller_name,req.method,component));
                });
            }
            else if (searchname == 'ids') {
                Nhistory.findAll({
                    order: 'updatedAt ASC',
                    attributes: ['id', 'sent','name', 'expectedDate', 'shop', 'createdAt', 'updatedAt'],
                    where: {deleted : 0}
                }).then(function(component) {
                    return res.status(200).json(helpers.formatResponse(controller_name,req.method,component));
                });
            }
            else {
                Nhistory.findOne({
                    attributes: ['id','name', 'expectedDate', 'shop', 'json', 'html', 'text'],
                    where: {name: searchname, deleted :0}
                }).then(function(component) {
                    return res.status(200).json(helpers.formatResponse(controller_name,req.method,component));
                });
            }
        }
        else if(getId){
            Nhistory.findOne({
                attributes: ['id', 'name', 'expectedDate', 'shop', 'json', 'html', 'text'],
                where: {id: getId, deleted : 0}
            }).then(function(component) {
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

        var params = _.pick(req.body,'name', 'expectedDate', 'shop', 'json', 'html','text');

        if (searchname){
            Nhistory.update(
                params,
                {where: {name: searchname, deleted: 0}}
            ).then(function(updated) {
                if(updated) {
                    return res.status(200).json(helpers.formatResponse(controller_name,req.method,'Updated OK' + getID));
                } else {
                    return res.status(500).json(helpers.formatResponse(controller_name,req.method,'Not found so not updated bro'));
                }
            });
        }
        else if (getId){
            console.log("ha entrat aqui!");
            //console.log(params);
            Nhistory.update(
                params,
                {where: {id : getId, deleted: 0}}
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
        if (getId){
            Nhistory.update(
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
