var path       = require('path');
var appSettings  = require('./appSettings.dist.json');

var settings = {
    appMode    : 'test',
    path       : path.normalize(path.join(__dirname, '..')),
    port       : process.env.NODE_PORT || 3000,
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
        },
        "nshops" : {
            allow    : ["get"]
        },
        "ncomponents" : {
            allow    : ["post","get","put","delete"]
        },
        "nhistory" : {
            allow    : ["post","get","put","delete"]
        },
        "nspecialday" : {
            allow    : ["get"]
        },
        "nsend" : {
            allow    : ["get"]
        },
    },
    api_prefix  : '/api',
    push_key_gcm: 'AIzaSyB6ecfFxTGLxl3zefruWWLDLS8q4p_EG1Y',
    push_key_ios: 'ck.pem',
    push_key_passphrase: 'your_key',
    options : {
        gateaway: 'gateway.push.apple.com',
        production: true,
        errorCallback: callback,
        cert: 'cert_prod.pem',
        key:  'key_prod.pem',
        passphrase: 'your_key',
        port: 2195,
        enhanced: true,
        cacheLength: 100
    },
    use_env_variable : false,
    app_extra_settings : '',
    csrftoken : 'X-Origin-Provider'
};
module.exports = settings;
