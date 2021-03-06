var models      = require('../app/models/');
var async       = require('async');
var http = require('http');

var API_URL = 'https://apir.campaigncommander.com/smartemail/v1';
var rp = require('request-promise');

var sender = function() {
    return {
        credentials:'',
        token :'',
        message : '',
        init : function(country, account, callback){
            this.credentials  = require('../config/settingsEMV.json')[country][account];
            var options = {
                method: 'POST',
                uri: API_URL+'/authorization',
                body: {"login": this.credentials.EMV_USER, "password": this.credentials.EMV_PWD, "apiKey": this.credentials.EMV_KEY},
                json: true
            };
           // console.log(options);
            var _this = this;
            rp(options)
                .then(function (parsedBody) {
                    var token64 = new Buffer(parsedBody.token+':').toString('base64');
                    _this.token = token64;
                    callback();
                })
                .catch(function (err) {
                    console.log("NO TINC NI TOKEN! FATAL ERROR");
                    //console.log(err);
                });
        },

        createMessage: function (newsletter, callback) {
            var message = {
                "name": newsletter.name,
                "status": "ready",
                "mode": "html",
                "subject": newsletter.subject,
                "fromEmail": this.credentials.FROM,
                "fromLabel": "Test",
                "toLabel": "Test",
                "replyToLabel": newsletter.replyToLabel,
                "replyToEmail": newsletter.replyToEmail,
                "text": newsletter.text,
                "html": newsletter.html

            };
            var postMessage = {
                method: 'POST',
                uri: API_URL+'/messages',
                body: message,
                json: true,
                headers: {
                    Authorization: 'Basic ' + this.token
                }
            };
            _this = this;
            rp(postMessage)
                .then(function (mess) {
                    _this.message = mess;
                    callback();
                }).catch(function(err){
                    console.log("NO S'HA POGUT PUJAR EL MISSATGE");
                    //console.log(err.error.details);
            });

        },
        createMessageMirror: function ( callback) {
            this.message.links.forEach(function(link){
                if (link.url == 'http://__EMV_MIRRORLINK_EMV__') {
                    console.log('HI HA UN LINK MIRROR');
                    link.type = 'mirror';
                    delete link.url;
                }
            });

            var updateMessage = {
                method: 'POST',
                uri: API_URL+'/messages/'+ this.message.id,
                body: {links: this.message.links},
                json: true,
                headers: {
                    Authorization: 'Basic ' + this.token
                }
            };
            _this = this;
            rp(updateMessage)
                .then(function (mess) {
                    _this.message = mess;
                    callback();
                }).catch(function(err){
                console.log("NO S'HA POGUT ACTUALITZAR EL MISSATGE");
                console.log(err.error);
            });
        }
    };
}();

module.exports.pujar = function (newsletter, callback) {
    async.waterfall([
        function(next){
            sender.init(newsletter.country, newsletter.account, function (result){
                next();
            });
        },
        function(next){
            sender.createMessage(newsletter,function (result){
                next();
            });
        },
        function(next){
            sender.createMessageMirror(function (result){
                next();
            });
        }

    ], function (err, result) {
        if (err) {
            console.log('ERROR'.red);
            return callback(false);
        } else {
            console.log('Tot OK pujant el Missatge'.green);
            return callback(true);
        }
    });
};

