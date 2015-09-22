var models      = require('../app/models/');
var async       = require('async');
var colors      = require('colors');
var crypto      = require('crypto');

models(function (err, db) {
    if (err) throw err;

    var Devicetoken = db.models.devicetoken;

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
                {token:crypto.createHash('md5').update('krainet4@gmail.com').digest("hex")},
                {token:crypto.createHash('md5').update('krainet5@gmail.com').digest("hex")}
            ];

            var segment1 = {id_customer:{'<':3}};
            var segment2 = {id_customer:{'<':2}};
            var segment_data = [
                {name:'Test segment 1', description:'Segmento de pruebas n.1',configuration:JSON.stringify(segment1)},
                {name:'Test segment 2', description:'Segmento de pruebas n.2',configuration:JSON.stringify(segment2)}
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
                    console.log('Creating dummy segment data...'.blue);
                    db.models.segment.create(segment_data,function(err,segments){
                        if(err) throw err;
                        console.log('DONE...'.green);
                        next();
                    });
                },
                function(next){
                    db.models.segment.get(1,function(err,segment){
                        console.log('Setting up segments...');
                        if(err) throw err;
                        db.models.devicetoken.find().order('-id').run(function (err, devicetokens) {
                            segment.addDevicetokens(devicetokens,function(err,result){
                                if(err) throw err;
                                console.log('DONE...'.green);
                                next();
                            });
                        });

                    })
                },
                function(next){
                    db.models.segment.get(1,function(err,segment){
                        console.log('Setting up segments...');
                        if(err) throw err;
                        db.models.customer.find().order('-id').run(function (err, customers) {
                            segment.addCustomers(customers,function(err,result){
                                if(err) throw err;
                                console.log('DONE...'.green);
                                next();
                            });
                        });

                    })
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
