var http = require('http');

var options = require('../config/settingsEMV.json')['br']['hs'];

var credentials = {
    "login": "api_hansolo_br",
    "password": "hanbr4567@cbn",
    "apiKey": "CdX7CrBH_ViwmUFTQ80jtKWFanYCbdOghUSiFNtUaPDobzmWNJGT8Q"
};

var API_URL = 'https://apie.campaigncommander.com/smartemail/v1';
var API_URL2= 'https://apie.campaigncommander.com/transactional-api-ws';
var rp = require('request-promise');

var options = {
    method: 'POST',
    uri: API_URL+'/authorization',
    body: credentials,
    json: true, // Automatically stringifies the body to JSON+
};


var message = {
    "name": "MISSATGE ENESSIMA PROVA",
    "status": "ready",
    "mode": "html",
    "version": "1",
    "subject": "Acme News",
    "fromEmail": "news@welcome.mequedouno.com.br",
    "fromLabel": "Acme News",
    "toLabel": "",
    "replyToLabel": "Acme Contact",
    "text": "Acme News",
    "html": "<!DOCTYPE html><html><head><title>Acme News</title></head><body>\n<h1>Acme News</h1>\n<p>Our <a href=\"http://acme.com/products\">list of products</a>!</p>\n</body></html>"
};

rp(options)
    .then(function (parsedBody) {
        console.log(parsedBody);
        //  var b = ;
        var s = new Buffer(parsedBody.token).toString('base64');
        console.log(s);

        var postMessage = {
            method: 'POST',
            uri: API_URL+'/messages',
            body: message,
            json: true,
            headers: {
                Authorization: 'Basic ' + new Buffer(parsedBody.token+':').toString('base64')
            }
        };

        var getMessages = {
            method: 'GET',
            uri: API_URL+'/messages',
            json: true,
            headers: {
                Authorization: 'Basic ' + new Buffer(parsedBody.token+':').toString('base64')
            }
        };
        var getMessage = {
            method: 'GET',
            uri: API_URL+'/messages'+'/02e8baa1-0c19-4a8a-9021-684c6075e4a4',
            json: true,
            headers: {
                Authorization: 'Basic ' + new Buffer(parsedBody.token+':').toString('base64')
            }
        };

        rp(getMessage)
            .then(function (parsedBody2) {
                console.log('????????????????????????????????????????????????????????????????????????????');
                console.log(parsedBody2);
            }).catch(function(err){
            console.log('PUTAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa!');
                console.log(err);
        }) ;





    })
    .catch(function (err) {
        console.log(err);
    });

