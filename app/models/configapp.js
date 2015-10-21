/**
 * Created by ramon on 25/09/15.
 * APP CONFIGURATION
 */
"use strict";

module.exports = function(sequelize, DataTypes) {
    var Configapp = sequelize.define("Configapp", {
        config_key   : {type:DataTypes.STRING,allowNull:false,defaultValue:0},
        config_value : {type:DataTypes.STRING,allowNull:false,defaultValue:0},
        deleted      : {type:DataTypes.BOOLEAN,allowNull:false,defaultValue:false}
    },{
        classMethods : {
            associate : function(models){
            }
        }
    });
    return Configapp;
};