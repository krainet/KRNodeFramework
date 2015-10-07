/**
 * Created by ramon on 25/09/15.
 */
//mqu : {color : '#e78808', name:'Tech',      link:'http://tech.mequedouno.com',      logo: 'http://str.yeeday.net/img/cm/es/mqu/logo-mqu.png'},
"use strict";

module.exports = function(sequelize, DataTypes) {
    var Nshop = sequelize.define("Nshop", {
        shop_name   : DataTypes.STRING,
        value       : DataTypes.STRING,
        deleted     : {type:DataTypes.BOOLEAN,allowNull:false,defaultValue:false}
    },{
        classMethods : {
            associate : function(models){

            }
        }
    });
    return Nshop;
};