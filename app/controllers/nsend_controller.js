var _               = require('lodash');
var helpers         = require('./_helpers');
var models          = require('../models');

var controller_name = 'nsend';
var Nhistory = models.Nhistory;

var pujarEmailvision = function(id, name, shop, expectedDate, callbackFunc) {
    console.log("Pujant " + id + ", " + name + " per a enviar el dia " + expectedDate);
    var func =function (result) {callbackFunc(result)};
    func(true);
    //return true;
};


module.exports = {

    get: function (req, res, next) {
        var getId = req.params.id ? req.params.id : 0;

        if(getId){
            Nhistory.findOne({
                where: {id: getId, deleted : 0}
            }).then(function(newsletter) {
                console.log(newsletter.id);
                    pujarEmailvision(newsletter.id, newsletter.name, newsletter.shop, newsletter.expectedDate,  function(result) {
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

    },

};
