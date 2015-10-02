/**
 * Created by ramon on 25/09/15.
 */
"use strict";

module.exports = function(sequelize, DataTypes) {
    var Pushhistory = sequelize.define("Pushhistory", {
        dateSent  : DataTypes.DATE,
        open      : DataTypes.BOOLEAN,
        click     : DataTypes.BOOLEAN
    },{
        classMethods : {
            associate : function(models){
                Pushhistory.belongsTo(models.Devicetoken);
            }
        }
    });
    return Pushhistory;
};