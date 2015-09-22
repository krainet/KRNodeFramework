var moment = require('moment');

module.exports = function (orm, db) {
    var Scheduller = db.define('scheduller', {
            name                 : {type: 'text', size:254, required:true},
            msg_text             : {type: 'text', size:254, required:true},
            is_draft             : {type: 'boolean', defaultValue:true},
            processed            : {type: 'boolean', defaultValue:false},
            deleted              : {type: 'boolean', defaultValue:false},
            date_to_send         : {type: 'date', required: true, time: true},
            date_sent            : {type: 'date', required: false, time: true},
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
                        msg_text              : this.msg_text,
                        is_draft              : this.is_draft,
                        deleted               : this.deleted,
                        date_to_send          : this.date_to_send,
                        date_sent             : this.date_sent,
                        date_add              : moment(this.date_add).fromNow(),
                        date_upd              : moment(this.date_upd).fromNow()
                    };
                }
            }
        });
    Scheduller.hasOne('owner', db.models.user, { required: true, reverse: 'scheduller', autoFetch: true });
    Scheduller.hasOne('segment', db.models.segment, { required: true, reverse: 'scheduller', autoFetch: true });
};
