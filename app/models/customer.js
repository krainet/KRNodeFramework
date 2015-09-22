var moment = require('moment');

module.exports = function (orm, db) {
    var Customer = db.define('customer', {
            email               : { type: 'text', size:254, required:true, unique: 'email' },
            id_customer         : {type: 'number', defaultValue:0, unique: 'id_customer'},
            push_count          : {type: 'number', defaultValue:0},
            device_token_count  : {type: 'number', defaultValue:0},
            deleted             : {type: 'boolean', defaultValue:false},
            date_add            : { type: 'date', required: true, time: false },
            date_upd            : { type: 'date', required: true, time: true }
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
                        email                 : this.email,
                        id_customer           : this.id_customer,
                        device_token_count    : this.device_token_count,
                        deleted               : this.deleted,
                        devicetokens          : this.devicetokens,
                        date_add              : moment(this.date_add).fromNow(),
                        date_upd              : moment(this.date_upd).fromNow()
                    };
                }
            }
        });
};
