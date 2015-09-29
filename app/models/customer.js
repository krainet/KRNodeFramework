/**
 * Created by ramon on 25/09/15.
 */
"use strict";

module.exports = function(sequelize, DataTypes) {
    var Customer = sequelize.define("Customer", {
        id_customer : {type:DataTypes.STRING,allowNull:true,defaultValue:0},
        deleted     : {type:DataTypes.BOOLEAN,allowNull:false,defaultValue:false}
    },{
        classMethods : {
            associate : function(models){
                Customer.belongsToMany(models.Segment,{through:'segment_customer'});
                Customer.hasMany(models.Devicetoken,{as: 'Devicetoken'});
            }
        }
    });
    return Customer;
};