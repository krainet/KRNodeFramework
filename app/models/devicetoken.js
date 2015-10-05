/**
 * Created by ramon on 25/09/15.
 */
"use strict";

module.exports = function(sequelize, DataTypes) {
    var Devicetoken = sequelize.define("Devicetoken", {
        token : {type: DataTypes.STRING,allowNull:false},
        active      : {type: DataTypes.BOOLEAN,defaultValue:true}
    },{
        classMethods : {
            associate : function(models){
                Devicetoken.belongsTo(models.Customer);
                Devicetoken.belongsTo(models.Platform);
                Devicetoken.belongsToMany(models.Segment,{through:'segment_devicetoken'});
                Devicetoken.hasMany(models.Pushhistory,{as: 'Pushhistory'});
            }
        }
    });

    return Devicetoken;
};