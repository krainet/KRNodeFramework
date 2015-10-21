var _               = require('lodash');
var helpers         = require('./../helpers/responseHelper');
var models          = require('../models');
var pnsend          = require('../../tasks/process_nsend');

var controller_name = 'nsend';
var Nhistory = models.Nhistory;

var pujarEmailvision = function(newsletter, callbackFunc) {
    console.log("Pujant " + newsletter.id + ", " + newsletter.name + " per a enviar el dia " + newsletter.expectedDate);

    pnsend.pujar(newsletter, function(result){
        callbackFunc(result);
    })
};

module.exports = {
    get: function (req, res, next) {
        var getId = req.params.id ? req.params.id : 0;

        if(getId){
            Nhistory.findOne({
                where: {id: getId, deleted : 0}
            }).then(function(newsletter) {
                console.log(newsletter.id);
                    pujarEmailvision(newsletter,  function(result) {
                        if (result) {
                            Nhistory.update(
                                {sent:true},
                                {where: {id : newsletter.id}}
                            ).then(function(updated) {
                                if(updated) {
                                    return res.status(200).json(helpers.formatResponse(controller_name, req.method, 'Enviat OK'));
                                }
                                else {
                                    return res.status(500).json(helpers.formatResponse(controller_name,req.method,null,'Is in EV but we couldnt change the status to sent in the db'));
                                }
                            });
                        }
                        else {
                            return res.status(500).json(helpers.formatResponse(controller_name,req.method,"Problem in EV"));
                        }
                    });
               // return res.status(500).json(helpers.formatResponse(controller_name,req.method,"No newsletter found bro"));
            });

        }
        else{
            return res.status(500).json(helpers.formatResponse(controller_name,req.method,null,'Empty'));
        }
    }

};
