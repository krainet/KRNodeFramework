/**
 * Created by ramon on 25/09/15.
 */
"use strict";

module.exports = function(sequelize, DataTypes) {
    var Platform = sequelize.define("Platform", {
        name   : {type:DataTypes.STRING,allowNull:false,defaultValue:'Unknown'},
        active : {type:DataTypes.BOOLEAN,allowNull:false,defaultValue:true}
    },{
        classMethods : {
            associate : function(models){
                Platform.hasMany(models.Devicetoken,{as: 'Devicetoken'});
            }
        }
    });
    return Platform;
};