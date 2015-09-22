var moment = require('moment');

module.exports = function (orm, db) {
    var Devicetoken = db.define('devicetoken', {
            token               : { type: 'text', size:254,unique: 'token' },
            push_count          : {type: 'number', defaultValue:0},
            deleted             : {type: 'boolean', defaultValue:false},
            date_add            : { type: 'date', required: false, time: false },
            date_upd            : { type: 'date', required: false, time: true }
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
                        owner                 : this.owner,
                        date_add              : moment(this.date_add).fromNow(),
                        date_upd              : moment(this.date_upd).fromNow()
                    };
                }
            }
        });
    Devicetoken.hasOne('owner', db.models.customer, { required: false, reverse: 'devicetoken', autoFetch: true });
};
