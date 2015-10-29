/**
 * Created by hadock on 15/09/15.
 */
var _               = require('lodash');
var helpers         = require('./../helpers/responseHelper');
var settings        = require('../../config/settings');
var models          = require('../models');
var push_helper     = require('../helpers/push_helper')
var b64             = require('../helpers/b64crypt');


var controller_name = 'pushlauncher';


module.exports = {
    list: function (req, res, next) {
    return res.status(200).json(helpers.formatResponse(controller_name, req.method, helpers.formatResponse(controller_name,req.method,null,'Empty response')));
    },
    create: function (req, res, next) {
        var params = _.pick(req.body, 'pushMessage','token','pushTitle','pushName','platform');

        var token = params.token?params.token:'';
        var title = params.pushTitle?params.pushTitle:'Push title';
        var msg = params.pushMessage?params.pushMessage:'Push message';
        var pushname = params.pushName?params.pushName:'No push name';
        var platform = params.platform?params.platform:0;

        if(token.length){
            //TODO save push history to BBDD
            token = b64.decode(token);
/*            console.log(token);
            console.log(title);
            console.log(msg);
            console.log(platform);*/
            push_helper.SendOnePush(token,title,msg,platform,function(err,response){
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
        var searchtoken = req.params.searchtoken?req.params.searchtoken:null;
        return res.status(200).json(helpers.formatResponse(controller_name, req.method, helpers.formatResponse(controller_name,req.method,null,'Empty response')));
    },
    put: function(req,res,next) {
        return res.status(200).json(helpers.formatResponse(controller_name, req.method, helpers.formatResponse(controller_name,req.method,null,'Empty response')));
    },
    delete: function(req,res,next) {
        return res.status(200).json(helpers.formatResponse(controller_name, req.method, helpers.formatResponse(controller_name,req.method,null,'Empty response')));
    }
};
