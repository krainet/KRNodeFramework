/**
 * Created by ramon on 25/09/15.
 */
"use strict";

module.exports = function(sequelize, DataTypes) {
    var Devicetoken = sequelize.define("Devicetoken", {
        token : DataTypes.STRING,
        active      : DataTypes.BOOLEAN
    }, {
        classMethods: {
            associate: function(models) {
                Devicetoken.hasOne(models.Platform)
            }
        }
    });

    return Devicetoken;
};