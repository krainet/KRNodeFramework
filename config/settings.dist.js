var path       = require('path');

var settings = {
    path       : path.normalize(path.join(__dirname, '..')),
    port       : process.env.NODE_PORT || 3000,
    database   : {
        protocol : "mysql",
        query    : { pool: true },
        host     : "127.0.0.1",
        database : "your_database",
        user     : "db_user",
        password : "db_password",
        query    : {
            pool : false, //CACHE querys
            debug: true
        }
    },
    logsdir     : __dirname + '/../logs/access.log',
    secret_jwt  : "crypt_key123",
    protected   : {
        "users" : ["get","put","delete"] //Protected , auth methods
    }
};
module.exports = settings;
