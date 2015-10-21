var path       = require('path');

var settings = {
    appMode    : 'test',
    path       : path.normalize(path.join(__dirname, '..')),
    port       : process.env.NODE_PORT || 3000,
    database   : {
        protocol : "mysql",
        host     : "127.0.0.1",
        database : "your_database",
        user     : "your_user",
        password : "your_password",
        query    : {
            pool : false, //CACHE querys
            debug: true
        }
    },
    logsdir     : __dirname + '/../logs/access.log',
    secret_jwt  : "crypt_key123",

    //JSON web tokens permissions
    auth_perms  : {
        "users" : {
            allow    : ["post","get","put","delete"]
        },
        "customers" : {
            allow    : ["post","get","put","delete"]
        },
        "devicetokens" : {
            allow    : ["post","get","put","delete"]
        },
        "auth" : {
            allow    : ["post","get","put","delete"]
        },
        "segments" : {
            allow    : ["post","get","put","delete"]
        },
        "schedullers" : {
            allow    : ["post","get","put","delete"]
        },
        "platforms" : {
            allow    : ["post","get","put","delete"]
        },
        "pushlauncher" : {
            allow    : ["post","get","put","delete"]
        },
        "configapp" : {
            allow    : ["post","get","put","delete"]
        }
    },
    api_prefix  : '/api',
    push_key_gcm: 'AIzaSyB6ecfFxTGLxl3zefruWWLDLS8q4p_EG1Y',
    push_key_ios: 'certificate.cer',
    use_env_variable : false
};
module.exports = settings;
