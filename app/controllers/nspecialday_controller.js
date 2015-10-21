var _               = require('lodash');
var helpers         = require('./../helpers/responseHelper');
var specialDay      = require('../presta/specialdayData');

var controller_name = 'nspecialday';

module.exports = {
    list: function (req, res, next) {

    },

    create: function (req, res, next) {

    },
    get: function (req, res, next) {
        var getId = req.params.id ? req.params.id : 0;
        var expectedDate = req.params.expectedDate ? req.params.expectedDate : 0;
        var idOffer = req.params.idOffer ? req.params.idOffer : 0;

        console.log(getId + " DATE " + expectedDate + " OFFER " + idOffer);

        var searchShop = function(inf) {
            switch(inf.category) {
                case 11: inf.shop_name = 'tech';    inf.shop = 'MQU';   break;
                case 12: inf.shop_name = 'vino';    inf.shop = 'MQV';   break;
                case 13: inf.shop_name = 'hogar';   inf.shop = 'MQH';   break;
                case 14: inf.shop_name = 'kids';    inf.shop = 'MQK';   break;
                case 15: inf.shop_name = 'chic';    inf.shop = 'MQC';   break;
                case 16: inf.shop_name = 'deporte'; inf.shop = 'MQD';   break;
                case 17: inf.shop_name = 'super';   inf.shop = 'MQS';   break;
                case 18: inf.shop_name = 'www';     inf.shop = 'MQW';   break;
            }
            console.log(inf);
            return inf;
        };


        if(parseInt(getId) === 0 && parseInt(expectedDate) === 0 && idOffer>0) {
            specialDay.getProduct(idOffer, function(result) {
                var inf = searchShop(result[0][0]);
                return res.status(200).json(helpers.formatResponse(controller_name,req.method, inf));
            });
        }

        else if( parseInt(getId) === 0 && expectedDate){
            specialDay.getSpecialdays(expectedDate, function(result) {

                var info = result[0];
                info.forEach(function(inf){
                    inf = searchShop(inf);
                });
                //console.log(info);
                return res.status(200).json(helpers.formatResponse(controller_name,req.method, info));
            });
        }
        else{
            return res.status(500).json(helpers.formatResponse(controller_name,req.method,null,'Empty'));
        }

    },
    put: function(req,res,next) {

    },
    delete: function(req,res,next) {

    }
};
