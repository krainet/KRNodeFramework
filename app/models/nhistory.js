/**
 * Created by ramon on 25/09/15.
 */
//mqu : {color : '#e78808', name:'Tech',      link:'http://tech.mequedouno.com',      logo: 'http://str.yeeday.net/img/cm/es/mqu/logo-mqu.png'},
"use strict";

module.exports = function(sequelize, DataTypes) {
    var Nhistory = sequelize.define("Nhistory", {
        name        : DataTypes.STRING,
        shop        : DataTypes.STRING,
        expectedDate: {type:DataTypes.DATE, defaultValue: null} ,
        sent        : {type:DataTypes.BOOLEAN, allowNull:true,defaultValue:false},
        json        : {type:DataTypes.TEXT,allowNull:true,defaultValue:""},
        html        : {type:DataTypes.TEXT,allowNull:true,defaultValue:""},
        text        : {type:DataTypes.TEXT,allowNull:true,defaultValue:""},
        deleted     : {type:DataTypes.BOOLEAN,allowNull:false,defaultValue:false}
    },{
        classMethods : {
            associate : function(models){

            }
        }
    });
    return Nhistory;
};