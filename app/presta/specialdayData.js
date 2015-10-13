var path       = require('path');
var config    = require('../../config/config.json')['presta'];
var Sequelize = require('sequelize');

var sequelizePresta = new Sequelize(config.database, config.username, config.password, config);

var specialdayData = {
    getData : function(expectedDate, callbackFunc) {
        console.log(expectedDate);
        var maxDate = new Date(expectedDate).getTime() + 345600000;
        var minDate = new Date(expectedDate).getTime() - 345600000;

        sequelizePresta.query(
            "SELECT sp.id_specialday, sp.crosselling_imgpath as img_path, lang.crosselling_title as name " +
            "FROM mq_mqspecialday AS sp " +
            "INNER JOIN mq_mqspecialday_lang AS lang ON sp.id_specialday=lang.id_specialday " +
            "WHERE (starttime BETWEEN '"+ new Date(minDate).toISOString() +" ' AND '"+ new Date(maxDate).toISOString()+"') " +
            "AND sp.crosselling_imgpath != '' " +
            "group by (id_specialday)"
        ).then(function(result) {
            callbackFunc(result)
        });
        return('');
    }
};

module.exports = specialdayData;