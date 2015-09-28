/**
 * Created by ramon on 25/09/15.
 */
"use strict";

module.exports = function(sequelize, DataTypes) {
    var Platform = sequelize.define("Platform", {
        name   : DataTypes.STRING,
        active : DataTypes.BOOLEAN
    },{
        classMethods : {
            associate : function(models){
                Platform.hasMany(models.Devicetoken);
            }
        }
    });
    return Platform;
};