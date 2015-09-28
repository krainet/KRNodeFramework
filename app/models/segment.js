/**
 * Created by ramon on 25/09/15.
 */
"use strict";

module.exports = function(sequelize, DataTypes) {
    var Segment = sequelize.define("Segment", {
        name          : DataTypes.STRING,
        description   : DataTypes.STRING,
        configuration : DataTypes.TEXT,
        deleted       : DataTypes.BOOLEAN
    },{
        classMethods : {
            associate : function(models){
                Segment.hasMany(models.Devicetoken);
                Segment.belongsToMany(models.Customer,{through:'segment_customer'});
                Segment.belongsToMany(models.Scheduller,{through:'segment_scheduller'});
                Segment.belongsToMany(models.Devicetoken,{through:'segment_devicetoken'});
            }
        }
    });

    return Segment;
};