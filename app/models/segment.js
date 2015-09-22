/**
 * Created by ramon on 22/09/15.
 */
var moment = require('moment');

module.exports = function (orm, db) {
    var Segment = db.define('segment', {
            name                 : {type: 'text', size:254, required:true},
            description          : {type: 'text', size:254, required:true},
            configuration        : {type: 'text', big:true},
            orphan_tokens        : {type: 'boolean', defaultValue:false},
            deleted              : {type: 'boolean', defaultValue:false},
            date_add             : {type: 'date', required: true, time: true},
            date_upd             : {type: 'date', required: true, time: true}
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
                        description           : this.description,
                        configuration         : JSON.parse(this.configuration),
                        orphan_tokens         : this.orphan_tokens,
                        devicetokens          : this.devicetokens,
                        customers             : this.customers,
                        deleted               : this.deleted,
                        date_add              : moment(this.date_add).fromNow(),
                        date_upd              : moment(this.date_upd).fromNow()
                    };
                }
            }
        });
    Segment.hasMany('devicetokens', db.models.devicetoken, { why: String }, { reverse: 'segments', key: true, autoFetch: true })
    Segment.hasMany('customers', db.models.customer, { why: String }, { reverse: 'segments', key: true, autoFetch: true })
};
