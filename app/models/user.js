/**
 * Created by ramon on 25/09/15.
 */
"use strict";

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        username : DataTypes.STRING,
        password : DataTypes.STRING,
        email    : DataTypes.STRING,
        deleted  : {type:DataTypes.BOOLEAN,allowNull:false,defaultValue:false},
        level    : DataTypes.INTEGER
    },{
        classMethods : {
            associate : function(models){

            }
        }
    });
    return User;
};