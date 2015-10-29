/**
 * Created by hadock on 29/09/15.
 */
var gcm         = require('node-gcm');
var settings    = require('../../config/settings');
var apn         = require('apn');


var push_helper = {
    SendOnePush : function(token,title,message,platform,cb){
        switch(platform){
            case 1:
                var callback = function(errorNum, notification){
                    push_helper.processErrorCodeApn(errorNum);
                }
                settings.apn_options.errorCallback=callback;
                var note = new apn.Notification();
                note.badge = 1;
                note.sound = "notification-beep.wav";
                note.alert = { "body" : "Your turn!", "action-loc-key" : "Play" , "launch-image" : "mysplash.png"};
                note.alert.body=message;
                note.payload = {'messageFrom': 'MeQuedoUno'};
                var apnConnection = new apn.Connection(settings.apn_options);
                apnConnection.pushNotification(note, token);

                /*
                //TODO feedback APN por implementar.
                 function handleFeedback(feedbackData) {
                 feedbackData.forEach(function(feedbackItem) {
                 console.log("Device: " + feedbackItem.device.toString("hex") + " has been unreachable, since: " + feedbackItem.time);
                 });
                 }
                settings.apn_options.interval=10;
                var feedback = new apn.feedback(settings.apn_options);
                feedback.on("feedback", handleFeedback);
                feedback.on("feedbackError", console.error);
                */

                cb(null,note);
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


    },
    processErrorCodeApn : function(err_code){
        switch(err_code){
            case 0:
                console.log('No se encontraron errores');
                break;
            case 1:
                console.log('Error al procesar');
                break;
            case 2:
                console.log('No se encontro el devicetoken');
                break;
            case 3:
                console.log('No se encontro topic');
                break;
            case 4:
                console.log('No se envio payload');
                break;
            case 5:
                console.log('Error longitud token');
                break;
            case 6:
                console.log('Error longitud topic');
                break;
            case 7:
                console.log('Invalid payload size')
                break;
            case 8:
                console.log('Invalid token');
                break;
            case 10:
                console.log('Shutdown');
                break;
            case 255:
                console.log('None unknown');
                break;
            default:
                console.log('Error desconocido');
                break;
        }
    }
}

module.exports = push_helper;