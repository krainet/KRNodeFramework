var moment = require('moment');

module.exports = function (orm, db) {
    var Platform = db.define('platform', {
            name                : {type: 'text', size:50, required:true},
            active             :  {type: 'boolean', defaultValue:true},
            deleted             : {type: 'boolean', defaultValue:false},
            date_add            : {type: 'date', required: true, time: true },
            date_upd            : {type: 'date', required: true, time: true }
        },
        {
            hooks: {
                beforeValidation: function () {
                    this.date_add = new Date();
                    this.date_upd = new Date();
                }
            },
            validations: {

            },
            methods: {
                serialize: function () {

                    return {
                        id                    : this.id,
                        name                  : this.name,
                        active                : this.active,
                        deleted               : this.deleted,
                        devicetokens          : this.devicetokens,
                        date_add              : moment(this.date_add).fromNow(),
                        date_upd              : moment(this.date_upd).fromNow()
                    };
                }
            }
        });
};
