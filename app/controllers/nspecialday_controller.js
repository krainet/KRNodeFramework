var _               = require('lodash');
var helpers         = require('./_helpers');
var specialDay      = require('../presta/specialdayData');

var controller_name = 'nspecialday';

module.exports = {
    list: function (req, res, next) {
       /* Nhistory.findAll({
            include: [],
            where: {deleted : 0},
            attributes: ['name', 'shop', 'json', 'html']
        }).then(function(nhistory) {
            return res.status(200).json(helpers.formatResponse(controller_name,req.method,nhistory));
        });*/
    },

    create: function (req, res, next) {

    },
    get: function (req, res, next) {
        var getId = req.params.id ? req.params.id : null;
        var expectedDate = req.params.expectedDate ? req.params.expectedDate : null;

       if(getId && expectedDate){
           specialDay.getData(expectedDate, function(result) {
               return res.status(200).json(helpers.formatResponse(controller_name,req.method,result[0]));
           });
        }
        else{
            return res.status(500).json(helpers.formatResponse(controller_name,req.method,null,'Empty'));
        }

    },
    put: function(req,res,next) {
       /* var getId = req.params.id ? req.params.id : null;
        var searchname = req.params.searchname ? req.params.searchname : null;

        var params = _.pick(req.body,'name', 'shop', 'json', 'html');

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
        }*/
    },
    /*delete: function(req,res,next) {
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
    }*/
};
