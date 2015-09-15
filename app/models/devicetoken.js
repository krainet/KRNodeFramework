var moment = require('moment');

module.exports = function (orm, db) {
    var Devicetoken = db.define('devicetoken', {
            token               : { type: 'text', size:254 },
            push_count          : {type: 'number', defaultValue:0},
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
                        token                 : this.token,
                        push_count            : this.push_count,
                        deleted               : this.deleted,
                        date_add              : moment(this.date_add).fromNow(),
                        date_upd              : moment(this.date_upd).fromNow()
                    };
                }
            }
        });
    Devicetoken.hasOne('owner', db.models.customer, { required: true, reverse: 'customer', autoFetch: true });
};
