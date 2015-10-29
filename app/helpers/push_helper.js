/**
 * Created by hadock on 29/09/15.
 */
var gcm         = require('node-gcm');
var settings    = require('../../config/settings');
var apn         = require('apn');


var push_helper = {
    Android : {

    },
    Apple : {

    },
    SendOnePush : function(token,title,message,platform,cb){

        switch(platform){
            case 1:
                var callback = function(errorNum, notification){
                    console.log('Error is: %s', errorNum);
                    console.log("Note " + notification);
                }
                settings.apn_options.callback=callback;
                var note = new apn.Notification();
                note.badge = 1;
                note.sound = "notification-beep.wav";
                note.alert = { "body" : "Your turn!", "action-loc-key" : "Play" , "launch-image" : "mysplash.png"};
                note.alert.body=message;
                note.payload = {'messageFrom': 'MeQuedoUno'};
                var apnConnection = new apn.Connection(settings.apn_options);
                apnConnection.pushNotification(note, token);
                break;
            case 2:
                //ANDROID
                var message = new gcm.Message({
                    collapseKey: "demo",
                    priority: "high",
                    contentAvailable: true,
                    delayWhileIdle: true,
                    timeToLive: 3,
                    //restrictedPackageName: "somePackageName",
                    dryRun: false,
                    data: {
                        "Nick": "Krainet",
                        "From": "MQ1"
                    },
                    notification: {
                        body: message,
                        title: title,
                        msg: message,
                        icon: "ic_launcher"
                    },
                    msg: 'Test123'
                });

                var regIds = [];
                regIds.push(token);

                message.addData({
                    key1: 'message1',
                    key2: 'message2'
                });

                // Set up the sender with you API key
                var sender = new gcm.Sender(settings.push_key_gcm);
                sender.sendNoRetry(message, { registrationIds: regIds }, function(err, result) {
                    return cb(err,result);
                });
                break;
            default:
                return cb('Error in selected platform',null);
                break;
        }


    }
}

module.exports = push_helper;