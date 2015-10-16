/**
 * Created by ramon on 25/09/15.
 */
"use strict";

module.exports = function(sequelize, DataTypes) {
    var Segment = sequelize.define("Segment", {
        name          : {type:DataTypes.STRING,allowNull:false,defaultValue:'Desconocido'},
        description   : {type:DataTypes.STRING,allowNull:true,defaultValue:'Desconocido'},
        configuration : {type:DataTypes.TEXT,allowNull:true,defaultValue:''},
        deleted       : {type:DataTypes.BOOLEAN,allowNull:false,defaultValue:false}
    },{
        classMethods : {
            associate : function(models){
                Segment.hasMany(models.Devicetoken);
                Segment.belongsToMany(models.Customer,{through:'segment_customer'});
                Segment.belongsToMany(models.Scheduler,{through:'segment_scheduler'});
                Segment.belongsToMany(models.Devicetoken,{through:'segment_devicetoken'});
            }
        }
    });

    return Segment;
};