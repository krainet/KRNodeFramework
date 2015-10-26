var http = require('http');

var options = require('../config/settingsEMV.json')['br']['hs'];

var credentials = {
    "login": "api_hansolo_br",
    "password": "hanbr4567@cbn",
    "apiKey": "CdX7CrBH_ViwmUFTQ80jtKWFanYCbdOghUSiFNtUaPDobzmWNJGT8Q"
};

var credentials2 = {
    "login": "mequedouno_HS",
    "password": "han15bc@qsiop12",
    "apiKey": "CdX7CrxL6ECalERSRcwghLK0EjQLYs68hkftS5iSdgJkrkWy"
};

var API_URL = 'https://apir.campaigncommander.com/smartemail/v1';
var API_URL2= 'https://apie.campaigncommander.com/transactional-api-ws';
var rp = require('request-promise');

var options = {
    method: 'POST',
    uri: API_URL+'/authorization',
    body: credentials2,
    json: true // Automatically stringifies the body to JSON+
};

var draftMessage = {
    "name": "Acme News",
    "status": "draft",
    "mode": "html",
    "text": "Acme News",
    "html": "<!DOCTYPE html><html><head><title>Acme News</title></head><body>\n<h1>Acme News</h1>\n<p>Our <a href=\"http://acme.com/products\">list of products</a>!</p>\n</body></html>"
}


var message = {
    "name": "MISSATGE PROVA",
    "status": "ready",
    "mode": "html",
    "subject": "Acme News",
    "fromEmail": "news@welcome.mequedouno.com",
    "fromLabel": "Acme News",
    "toLabel": "",
    "replyToLabel": "Acme Contact",
    "text": "Acme News",
    "html": "<!DOCTYPE html><html><head><title>Acme News</title></head><body>\n<h1>Acme News</h1>\n<p>Our <a href=\"http://acme.com/products\">list of products</a>!</p>\n</body></html>"
};

rp(options)
    .then(function (parsedBody) {
        console.log('TOKEN=> ' + parsedBody.token);
        //  var b = ;
        var token64Buffer = new Buffer(parsedBody.token+':');
        var token64 = token64Buffer.toString('base64');
        console.log ('TOKEN BASE 64 => ' + token64);

        var postMessage = {
            method: 'POST',
            uri: API_URL+'/messages',
            body: message,
            json: true,
            headers: {
                Authorization: 'Basic ' + token64
            }
        };

        var getMessages = {
            method: 'GET',
            uri: API_URL+'/messages?version=2',
            json: true,
            headers: {
                Authorization: 'Basic ' + token64
            }
        };
        var getMessage = {
            method: 'GET',
            uri: API_URL+'/messages'+'/02e8baa1-0c19-4a8a-9021-684c6075e4a4',
            json: true,
            headers: {
                Authorization: 'Basic ' + token64
            }
        };

        rp(postMessage)
            .then(function (parsedBody2) {
                console.log('????????????????????????????????????????????????????????????????????????????');
                console.log(parsedBody2);
            }).catch(function(err){
            console.log('PUTAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa!');
            console.log(err);
        }) ;





    })
    .catch(function (err) {
        console.log("NO TINC NI TOKEN! FATAL ERROR");
        console.log(err);
    });

