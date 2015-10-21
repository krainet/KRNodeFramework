var http = require('http');

var options = require('../config/settingsEMV.json')['br']['hs'];

var credentials = {
    "login": "api_hansolo_br",
    "password": "hanbr4567@cbn",
    "apiKey": "CdX7CrBH_ViwmUFTQ80jtKWFanYCbdOghUSiFNtUaPDobzmWNJGT8Q"
};

var API_URL = 'https://apie.campaigncommander.com/transactional-api-ws';
var API_URL2= 'https://apie.campaigncommander.com/transactional-api-ws';
var rp = require('request-promise');

var options = {
    method: 'POST',
    uri: API_URL+'/authorization',
    body: credentials,
    json: true, // Automatically stringifies the body to JSON+
};


var message = {

    "name":"test",
    "subject":"testsubject",
    "from":"PUTA",
    "sender":"news@welcome.mequedouno.com.br",
    "to":"to",
    "encoding":"UTF-8",
    "body":"[EMV HTMLPART]<html><body>test</body></html>",
    "replyToEmail":"test@mequedouno.com"
};

rp(options)
    .then(function (parsedBody) {
        console.log(parsedBody);
        //  var b = ;
        var s = new Buffer(parsedBody.token).toString('base64');
        console.log(s);
        /*var options2 = {
            method: 'POST',
            uri: API_URL2+'/transactionalMessages',
            body: message,
            json: true,
            headers: {
                Authorization: 'Basic ' + new Buffer(parsedBody.token+':').toString('base64')
            }
        };

        rp(options2)
            .then(function (parsedBody2) {
                console.log('????????????????????????????????????????????????????????????????????????????');
                console.log(parsedBody2);
            }).catch(function(err){
            console.log('PUTAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa!');
                console.log(err);
        }) ;*/





    })
    .catch(function (err) {
        console.log(err);
    });

