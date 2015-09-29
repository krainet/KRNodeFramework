/**
 * Created by hadock on 15/09/15.
 */
var _               = require('lodash');
var helpers         = require('./_helpers');
var settings        = require('../../config/settings');
var models          = require('../models');



var controller_name = 'pushlauncher';


module.exports = {
    list: function (req, res, next) {
        var gcm = require('node-gcm');
        var message = new gcm.Message({
            collapseKey: 'demo',
            priority: 'high',
            contentAvailable: true,
            delayWhileIdle: true,
            timeToLive: 3,
            //restrictedPackageName: "somePackageName",
            dryRun: false,
            data: {
                key1: 'message1',
                key2: 'message2'
            },
            notification: {
                title: "Hello, World",
                icon: "ic_launcher",
                body: "This is a notification that will be displayed ASAP."
            }
        });

        var regIds = ["APA91bEMIzfC11yYk3sEUbhMgjx63skNcb9INc20mHfehiK09FIAHJEr43pFn4A8bkszkw54hTwwZpfCHut6U6rjxpYDKe6Kv8CiKBVW5NP99uZOw67RXm2kGsbeEBP39POP8thlm7r3"];
        message.addData({
            key1: 'message1',
            key2: 'message2'
        });


        // Set up the sender with you API key
        var sender = new gcm.Sender(settings.push_key_gcm);
        sender.sendNoRetry(message, { registrationIds: regIds }, function(err, result) {
            if(err) {console.error(err)}
            else    {console.log(result);return res.status(200).json(helpers.formatResponse(controller_name, req.method, result));}
        });



/*
        var data = {
            "collapseKey":"applice",
            "delayWhileIdle":true,
            "timeToLive":3,
            "data":{
                "message":"My message","title":"My Title"
            },
            "registration_ids":["APA91bEMIzfC11yYk3sEUbhMgjx63skNcb9INc20mHfehiK09FIAHJEr43pFn4A8bkszkw54hTwwZpfCHut6U6rjxpYDKe6Kv8CiKBVW5NP99uZOw67RXm2kGsbeEBP39POP8thlm7r3"]
        };

        var dataString =  JSON.stringify(data);
        var headers = {
            'Authorization' : 'key='+settings.push_key_gcm,
            'Content-Type' : 'application/json',
            'Content-Length' : dataString.length
        };

        var options = {
            host: 'android.googleapis.com',
            port: 80,
            path: '/gcm/send',
            method: 'POST',
            headers: headers
        };

//Setup the request
        var req2 = http.request(options, function(res2) {
            res2.setEncoding('utf-8');

            var responseString = '';

            res2.on('data', function(data) {
                responseString += data;
            });

            res2.on('end', function() {
                var resultObject = JSON.parse(responseString);
                console.log(responseString);
                console.log(resultObject);
                return res.status(200).json(helpers.formatResponse(controller_name, req.method, helpers.formatResponse(controller_name,req.method,resultObject)));

            });
            console.log('STATUS: ' + res2.statusCode);
            console.log('HEADERS: ' + JSON.stringify(res2.headers));

        });

        req2.on('error', function(e) {
            // TODO: handle error.
            console.log('error : ' + e.message + e.code);
            return res.status(500).json(helpers.formatResponse(controller_name, req.method, helpers.formatErrors(e,controller_name,req.method)));
        });

        req2.write(dataString);
        req2.end();

*/

/*
        // send the message
        gcmObject.send(message, function(err, response) {
            if(err)
                return res.status(500).json(helpers.formatErrors(err,controller_name,req.method));
            else
                return res.status(200).json(helpers.formatResponse(controller_name, req.method, response));
        });
*/
    },
    create: function (req, res, next) {
        var params = _.pick(req.body, 'token');
        return res.status(200).json(helpers.formatResponse(controller_name, req.method, helpers.formatResponse(controller_name,req.method,null,'Empty response')));
    },
    get: function (req, res, next) {
        var searchtoken = req.params.searchtoken?req.params.searchtoken:null;
        return res.status(200).json(helpers.formatResponse(controller_name, req.method, helpers.formatResponse(controller_name,req.method,null,'Empty response')));
    },
    put: function(req,res,next) {
        return res.status(200).json(helpers.formatResponse(controller_name, req.method, helpers.formatResponse(controller_name,req.method,null,'Empty response')));
    },
    delete: function(req,res,next) {
        return res.status(200).json(helpers.formatResponse(controller_name, req.method, helpers.formatResponse(controller_name,req.method,null,'Empty response')));
    }
};
