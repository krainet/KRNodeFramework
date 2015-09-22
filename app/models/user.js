var moment = require('moment');

module.exports = function (orm, db) {
    var User = db.define('user', {
            username     : { type: 'text', size:50, required: true, unique: 'username' },
            password     : { type: 'text', required: true , defaultValue:'mq1234'},
            email        : { type: 'text', size:255 ,required: true, unique: 'email' },
            date_add     : { type: 'date', required: true, time: true },
            date_upd     : { type: 'date', required: true, time: true }
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
                        id            : this.id,
                        username      : this.username,
                        password      : this.password,
                        email         : this.email,
                        date_add      : moment(this.date_add).fromNow(),
                        date_upd      : moment(this.date_upd).fromNow()
                    };
                }
            }
        });
};
