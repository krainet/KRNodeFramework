/**
 * Created by ramon on 22/09/15.
 */
var models      = require('../app/models/');
var async       = require('async');
var Curl        = require('node-libcurl').Curl;

var Nhistory = models.Nhistory;

var sender = function() {
    var curl;
    return {
        options : '',
        token :'',
        message :'',
        id :'',
        init : function(country, account, callback){
            console.log('Init...'.yellow);
            this.options = require('../config/settingsEMV.json')[country][account];

            console.info(this.options);

            var url_get_token = 'https://' + this.options.EMV_SERVER + '/apiccmd/services/rest/connect/open/' + this.options.EMV_USER + '/' + this.options.EMV_PWD + '/' + this.options.EMV_KEY;
            console.info('Url token: ' + url_get_token);

            curl = new Curl();
            curl.setOpt('URL', url_get_token);

            var _this = this;

            curl.on('end', function (statusCode, body, headers) {
                console.info(headers);
                var parseString = require('xml2js').parseString;
                parseString(body, {trim: true}, function (err, result) {
                    _this.token = result['response']['result'][0]['_'];
                    console.info('Init done, TOKEN: '.green + result['response']['result'][0]['_'].red);
                });
                curl.close.bind(curl);

                callback();
            });
            curl.on('error', function(err) {
                curl.close.bind(curl)
                console.info('Init Failed');
                callback();
            });
            curl.perform();
        },

        createMessage: function (newsletter, callback) {
            var html= newsletter.html;
            console.log('Creating message..'.yellow);
            var url = 'https://'+ this.options.EMV_SERVER + '/apiccmd/services/rest/message/create/' + this.token;
            var header = ['content-type: text/xml'];
            var data = '<message><type>email</type><body>[EMV HTMLPART]<![CDATA['+ html + ']]> </body> ' +
                '<isBounceback>false</isBounceback> ' +
                '<description>Newsletter para: '+ newsletter.shop +', en '+ newsletter.expectedDate +'</description> <encoding>UTF-8</encoding> ' +
                '<from>'+ this.options.FROM +'</from> <name>'+newsletter.name+'</name> ' +
                '<replyTo>Test</replyTo> <replyToEmail>test@mequedouno.com</replyToEmail> ' +
                '<subject>'+ newsletter.name +'</subject> <to></to> ' +
                '<hotmailUnsubFlg>true</hotmailUnsubFlg> ' +
                '<hotmailUnsubUrl>http://www.smartfocus.com</hotmailUnsubUrl>' +
                '</message>';

            curl = new Curl();
            curl.setOpt('HTTPHEADER',header);
            curl.setOpt('VERBOSE', this.options.__EMV_VERBOSE__);
            curl.setOpt('URL', url);
            curl.setOpt('POST', 1);
            curl.setOpt('POSTFIELDS', data);

            var _this = this;

            console.log('URL: ' + url);
            curl.on('end', function (statusCode, body, headers) {
                console.info(headers);
                var parseString = require('xml2js').parseString;
                parseString(body, {trim: true}, function (err, result) {
                    var id = result['response']['result'][0]['_'];
                    curl.close.bind(curl);
                    console.info('Message sent, ID MESSAGE: '.green + id.red);
                    _this.id = id;
                    callback();
                });

            });
            curl.on('error', function(err) {
                curl.close.bind(curl);
                callback();
            });
            curl.perform();

        },
        getMessage: function (callback) {
            console.log('Getting message..'.yellow);
            var url = 'https://'+ this.options.EMV_SERVER +'/apiccmd/services/rest/message/getMessage/' + this.token +  '/' +this.id;

            curl = new Curl();
            curl.setOpt('VERBOSE', this.options.__EMV_VERBOSE__);
            curl.setOpt('URL', url);
            curl.on('end', function (statusCode, body, headers) {
                console.info(headers);
                //console.info(body);
                var parseString = require('xml2js').parseString;
                parseString(body, {trim: true}, function (err, result) {
                    //   console.log(result['response']['message']);
                    var message = result['response']['message'][0]['body'][0];
                    console.info('#Message recovered OK: '.green);
                    curl.close.bind(curl);
                    callback(message);
                });
            });
            curl.on('error', function(err) {
                curl.close.bind(curl);
                callback('');
            });
            curl.perform();
        },
        trackAllLinks: function (callback) {
            console.log('Tracking All links..'.yellow);
            var url = 'https://'+ this.options.EMV_SERVER + '/apiccmd/services/rest/message/trackAllLinks/' + this.token + '/' +this.id;
            console.log('URL: ' + url);

            curl = new Curl();
            curl.setOpt('VERBOSE', this.options.__EMV_VERBOSE__);
            curl.setOpt('URL', url);

            var _this = this;

            curl.on('end', function (statusCode, body, headers) {
                console.info(headers);
                console.info(body);
                var parseString = require('xml2js').parseString;
                parseString(body, {trim: true}, function (err, result) {
                    var links = result['response']['result'][0]['_'];
                    console.info('#Links trackejats: '.green + links.red);
                    curl.close.bind(curl);
                    callback();
                });
            });
            curl.on('error', function(err) {
                curl.close.bind(curl);
                callback();
            });
            curl.perform();
        },
        createMessageMirror: function (callback) {
            // __EMV_MIRRORLINK_EMV__
            console.log('Creating message mirror..'.yellow);
            var url = 'https://' + this.options.EMV_SERVER + '/apiccmd/services/rest/url/createMirrorUrl/' + this.token + '/' +this.id +'/MirrorLink';
            var header = ['content-type: text/xml'];
            console.log('URL: ' + url);

            curl = new Curl();
            curl.setOpt('VERBOSE', this.options.__EMV_VERBOSE__);
            curl.setOpt('HTTPHEADER',header);
            curl.setOpt('URL', url);

            var _this = this;

            curl.on('end', function (statusCode, body, headers) {
                console.info(headers);
                console.info(body);
                var parseString = require('xml2js').parseString;
                parseString(body, {trim: true}, function (err, result) {
                    var idMirror = result['response']['result'][0]['_'];
                    console.info('#Id Mirror: '.green + idMirror.red);
                    curl.close.bind(curl);
                    _this.getMessage(function(message){
                        _this.updateMessageMirror(message.replace(/__EMV_MIRRORLINK_EMV__/g, '[EMV LINK]' + idMirror +'[EMV /LINK]'), function(call) {
                            callback();
                        });
                    });
                });

            });
            curl.on('error', function(err) {
                curl.close.bind(curl);
                callback();
            });
            curl.perform();

        },
        updateMessageMirror: function (html, callback) {
            console.log('Updating message mirror..'.yellow);
            // console.log(html);
            callback();
            var url = 'https://' + this.options.EMV_SERVER + '/apiccmd/services/rest/message/update/' + this.token;
            var header = ['content-type: text/xml'];
            console.log('URL: ' + url);

            updatedhtml = '[EMV HTMLPART]<![CDATA['+ html.replace("[EMV HTMLPART]",'') + ']]>';
            //console.log(updatedhtml);
            var data = '<message><id>'+ this.id+'</id><type>email</type><body>'+ updatedhtml+'</body></message>';

            curl = new Curl();
            curl.setOpt('HTTPHEADER',header);
            curl.setOpt('VERBOSE', this.options.__EMV_VERBOSE__);
            curl.setOpt('URL', url);
            curl.setOpt('POST', 1);
            curl.setOpt('POSTFIELDS', data);

            var _this = this;

            curl.on('end', function (statusCode, body, headers) {
                console.info(headers);
                console.info(body);

            });
            curl.on('error', function(err) {
                curl.close.bind(curl);
                callback();
            });
            curl.perform();
        }
    };
}();

module.exports.pujar = function (newsletter, callback) {
    async.waterfall([
        function(next){
            sender.init('br', 'hs', function (result){
                next();
            });
        },
        function(next){
            sender.createMessage(newsletter,function (result){
                next();
            });
        },
        function(next){
            sender.trackAllLinks(function (result){
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
            console.log('All Updated OK'.yellow);
            return callback(true);
        }
    });
};

