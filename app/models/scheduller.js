/**
 * Created by ramon on 25/09/15.
 */
"use strict";

module.exports = function(sequelize, DataTypes) {
    var Scheduller = sequelize.define("Scheduller", {
        name     : DataTypes.STRING,
        message  : DataTypes.STRING,
        date_send: DataTypes.DATE,
        is_draft : DataTypes.BOOLEAN,
        processed: DataTypes.BOOLEAN,
        deleted  : DataTypes.BOOLEAN
    },{
        classMethods : {
            associate : function(models){
                Scheduller.belongsToMany(models.Segment,{through:'segment_scheduller'});
            }
        }
    });

    return Scheduller;
};