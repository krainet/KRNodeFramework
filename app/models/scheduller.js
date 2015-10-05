/**
 * Created by ramon on 25/09/15.
 */
"use strict";

module.exports = function(sequelize, DataTypes) {
    var Scheduller = sequelize.define("Scheduller", {
        name     : {type:DataTypes.STRING,allowNull:false,defaultValue:'Desconocido'},
        message  : {type:DataTypes.STRING,allowNull:false,defaultValue:'Desconocido'},
        date_send: {type:DataTypes.DATE,allowNull:false,defaultValue:sequelize.NOW},
        is_draft : {type:DataTypes.BOOLEAN,allowNull:false,defaultValue:true},
        processed: {type:DataTypes.BOOLEAN,allowNull:false,defaultValue:false},
        deleted  : {type:DataTypes.BOOLEAN,allowNull:false,defaultValue:false}
    },{
        classMethods : {
            associate : function(models){
                Scheduller.belongsToMany(models.Segment,{through:'segment_scheduller'});
            }
        }
    });

    return Scheduller;
};