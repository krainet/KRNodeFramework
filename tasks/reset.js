var models      = require('../app/models/');
var async       = require('async');
var colors      = require('colors');
var crypto      = require('crypto');

models(function (err, db) {
    if (err) throw err;

    db.drop(function (err) {
        if (err) throw err;

        db.sync(function (err) {
            if (err) throw err;

            var user_data = [
                {username: 'krainet', password:'Basura1', email:'krainet1@gmail.com'},
                {username: 'krainet2', password:'Basura2', email:'krainet2@gmail.com'},
                {username: 'krainet3', password:'Basura3', email:'krainet3@gmail.com'}
            ];

            var customer_data = [
                {email:'krainet1@gmail.com',id_customer:1},
                {email:'krainet2@gmail.com',id_customer:2},
                {email:'krainet3@gmail.com',id_customer:3}
            ];

            var devicetoken_data = [
                {token:crypto.createHash('md5').update('krainet1@gmail.com').digest("hex"),owner_id:1},
                {token:crypto.createHash('md5').update('krainet2@gmail.com').digest("hex"),owner_id:2},
                {token:crypto.createHash('md5').update('krainet3@gmail.com').digest("hex"),owner_id:3},
                {token:crypto.createHash('md5').update('krainet4@gmail.com').digest("hex")}
            ];



            async.waterfall([
                function(next){
                    console.log('Creating dummy user data...'.blue);
                    db.models.user.create(user_data, function (err, user) {
                        if (err) throw err;
                        console.log('DONE...'.green);
                        next();
                    });
                },
                function(next){
                    console.log('Creating dummy customer data...'.blue);
                    db.models.customer.create(customer_data, function (err, customer) {
                        if (err) throw err;
                        console.log('DONE...'.green);
                        next();
                    });
                },
                function(next){
                    console.log('Creating dummy devicetoken data...'.blue);
                    db.models.devicetoken.create(devicetoken_data, function (err, devicetokens) {
                        if (err) throw err;
                        console.log('DONE...'.green);
                        next();
                    });
                },
                function(next){
                    db.close();
                }
            ],function(err,result){
                if(err) return err;
                else return result;
            });

        });
    });
});
