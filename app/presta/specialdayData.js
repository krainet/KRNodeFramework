var path       = require('path');

var settings     = require(__dirname + '/../../config/settings');
var settingsBBDD = require(__dirname + '/../../config/settingsBBDD');
var Sequelize = require('sequelize');


var config = settingsBBDD.getBBDDSettings('mqpshBBDD',settings.appMode);
var sequelizePresta = new Sequelize(config.database, config.username, config.password, config);

//module.exports =
exports.getSpecialdays = function(expectedDate, callbackFunc) {
        console.log(expectedDate);
        var maxDate = new Date(expectedDate).getTime() + 345600000; //4 dies despres
        var minDate = new Date(expectedDate).getTime() - 345600000; //4 dies abans

    sequelizePresta.query(
            "SELECT sp.id_specialday, sp.id_category as category, sp.crosselling_imgpath as img_path, lang.crosselling_title as name " +
            "FROM mq_mqspecialday AS sp " +
            "INNER JOIN mq_mqspecialday_lang AS lang ON sp.id_specialday=lang.id_specialday " +
            "WHERE NOT sp.deleted " +
            "AND (starttime BETWEEN '"+ new Date(minDate).toISOString() +" ' AND '"+ new Date(maxDate).toISOString()+"') " +
            "AND sp.crosselling_imgpath != '' " +
            "group by (id_specialday)"
        ).then(function(result) {
            callbackFunc(result)
        });
        return('');
    };
exports.getProduct = function(idOffer, callbackFunc) {
    sequelizePresta.query(
            "SELECT img.id_image, prod.id_product, prod.id_category_default as category, prod.mq_bill_name " +
            "FROM mq_mqoffer off " +
            "INNER JOIN mq_product prod ON off.id_product=prod.id_product " +
            "INNER JOIN mq_image img ON prod.id_product=img.id_product " +
            "WHERE id_offer=" + idOffer +" " +
            "ORDER BY (img.id_image) DESC " +
            "limit 1;"
        ).then(function(result) {
            callbackFunc(result)
        });
        return('');
};

exports.getIdCustomerFromEmail = function(email,cb) {
    sequelizePresta.query(
        "SELECT c.id_customer " +
        "FROM mq_customer c " +
        "WHERE c.email='" + email +"' " +
        "limit 1;"
    ).spread(function (res, metadata) {
            cb(res,metadata);
    });
    //return('');
};

