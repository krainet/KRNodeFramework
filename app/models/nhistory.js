/**
 * Created by ramon on 25/09/15.
 */
//mqu : {color : '#e78808', name:'Tech',      link:'http://tech.mequedouno.com',      logo: 'http://str.yeeday.net/img/cm/es/mqu/logo-mqu.png'},
"use strict";

module.exports = function(sequelize, DataTypes) {
    var Nhistory = sequelize.define("Nhistory", {
        status      : {type: DataTypes.STRING,  allowNull: false, defaultValue: "draft"},
        name        : {type: DataTypes.STRING,  allowNull: false, defaultValue: "new Newsletter"},
        shop        : {type: DataTypes.STRING,  allowNull: false, defaultValue: "mqu"},
        account     : {type: DataTypes.STRING,  allowNull: false, defaultValue: "mqu"},
        country     : {type: DataTypes.STRING,  allowNull: false, defaultValue: "spain"},
        expectedDate: {type: DataTypes.DATE,                      defaultValue: null},
        subject     : {type: DataTypes.STRING,    allowNull: false, defaultValue: "Test subject"},
        replyToEmail: {type: DataTypes.STRING,  allowNull: false, defaultValue: "test@mequedouno.com"},
        replyToLabel: {type: DataTypes.STRING,  allowNull: false, defaultValue: "Test"},
        sent        : {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
        json        : {type: DataTypes.TEXT,    allowNull: true,  defaultValue: ""},
        html        : {type: DataTypes.TEXT,    allowNull: true,  defaultValue: ""},
        text        : {type: DataTypes.TEXT,    allowNull: true,  defaultValue: ""},
        deleted     : {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false}
    },{
        classMethods : {
            associate : function(models){

            }
        }
    });
    return Nhistory;
};
