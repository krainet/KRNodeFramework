var Sequelize   = require('sequelize');
var models      = require('../app/models/');
var async       = require('async');
var colors      = require('colors');
var crypto      = require('crypto');


models.sequelize.sync({force:true,omitNull:true}).then(function() {

    var user_data = [
        {username: 'krainet1', password: 'Basura1', email: 'krainet1@gmail.com',level:10},
        {username: 'krainet2', password: 'Basura2', email: 'krainet2@gmail.com',level:5},
        {username: 'krainet3', password: 'Basura3', email: 'krainet3@gmail.com',level:2},
        {username: 'krainet4', password: 'Basura4', email: 'krainet4@gmail.com',level:3},
        {username: 'krainet5', password: 'Basura5', email: 'krainet5@gmail.com',level:4},
        {username: 'krainet6', password: 'Basura6', email: 'krainet6@gmail.com',level:10},
        {username: 'krainet7', password: 'Basura7', email: 'krainet7@gmail.com',level:5},
        {username: 'krainet8', password: 'Basura8', email: 'krainet8@gmail.com',level:2},
        {username: 'krainet9', password: 'Basura9', email: 'krainet9@gmail.com',level:3},
        {username: 'krainet10', password: 'Basura10', email: 'krainet10@gmail.com',level:8}
    ];

    var customer_data = [
        {email: 'krainet1@gmail.com', id_customer: 1},
        {email: 'krainet2@gmail.com', id_customer: 2},
        {email: 'krainet3@gmail.com', id_customer: 3},
        {email: 'krainet4@gmail.com', id_customer: 4},
        {email: 'krainet5@gmail.com', id_customer: 5},
        {email: 'krainet6@gmail.com', id_customer: 6},
        {email: 'krainet7@gmail.com', id_customer: 7},
        {email: 'krainet8@gmail.com', id_customer: 8},
        {email: 'krainet9@gmail.com', id_customer: 9},
        {email: 'krainet10@gmail.com', id_customer: 10}
    ];


    var devicetoken_data = [
        {token: 'APA91bEMIzfC11yYk3sEUbhMgjx63skNcb9INc20mHfehiK09FIAHJEr43pFn4A8bkszkw54hTwwZpfCHut6U6rjxpYDKe6Kv8CiKBVW5NP99uZOw67RXm2kGsbeEBP39POP8thlm7r3',PlatformId:1,CustomerId:1},
        {token: crypto.createHash('md5').update('krainet2@gmail.com').digest("hex"),PlatformId:1,CustomerId:1},
        {token: crypto.createHash('md5').update('krainet3@gmail.com').digest("hex"),PlatformId:2,CustomerId:3},
        {token: crypto.createHash('md5').update('krainet4@gmail.com').digest("hex"),PlatformId:2,CustomerId:4},
        {token: crypto.createHash('md5').update('krainet5@gmail.com').digest("hex"),PlatformId:1,CustomerId:5},
        {token: crypto.createHash('md5').update('krainet6@gmail.com').digest("hex"),PlatformId:2,CustomerId:6},
        {token: crypto.createHash('md5').update('krainet7@gmail.com').digest("hex"),PlatformId:1,CustomerId:7},
        {token: crypto.createHash('md5').update('krainet8@gmail.com').digest("hex"),PlatformId:1,CustomerId:8},
        {token: crypto.createHash('md5').update('krainet9@gmail.com').digest("hex"),PlatformId:1,CustomerId:9},
        {token: crypto.createHash('md5').update('krainet10@gmail.com').digest("hex"),PlatformId:2,CustomerId:10}
    ];

    var segment1 = {id_customer: {'<': 1}},segment2 = {id_customer: {'<': 2}},segment3 = {id_customer: {'<': 3}};
    var segment_data = [
        {name: 'Test segment 1', description: 'Segmento de pruebas n.1', configuration: JSON.stringify(segment1)},
        {name: 'Test segment 2', description: 'Segmento de pruebas n.2', configuration: JSON.stringify(segment2)},
        {name: 'Test segment 3', description: 'Segmento de pruebas n.3', configuration: JSON.stringify(segment3)},
        {name: 'Test segment 4', description: 'Segmento de pruebas n.4', configuration: JSON.stringify(segment1)},
        {name: 'Test segment 5', description: 'Segmento de pruebas n.5', configuration: JSON.stringify(segment2)},
        {name: 'Test segment 6', description: 'Segmento de pruebas n.6', configuration: JSON.stringify(segment3)},
        {name: 'Test segment 7', description: 'Segmento de pruebas n.7', configuration: JSON.stringify(segment1)},
        {name: 'Test segment 8', description: 'Segmento de pruebas n.8', configuration: JSON.stringify(segment2)},
        {name: 'Test segment 9', description: 'Segmento de pruebas n.9', configuration: JSON.stringify(segment3)},
        {name: 'Test segment 10', description: 'Segmento de pruebas n.10', configuration: JSON.stringify(segment3)},
    ];

    var scheduller_data = [
        {
            name: 'Campaña 1',
            message: 'Compra en MeQuedoUno cupon SOLOAPP',
            is_draft: true,
            processed: false,
            date_send: new Date(),
            SegmentId: 1
        },
        {
            name: 'Campaña 2',
            message: 'Compra en MeQuedoUno cupon SOLOAPP2',
            is_draft: false,
            processed: true,
            date_send: new Date(),
            SegmentId: 2
        },
        {
            name: 'Campaña 3',
            message: 'Ahora en MeQuedoUno cupon SOLOAPP',
            is_draft: true,
            processed: false,
            date_send: new Date(),
            SegmentId: 1
        },
        {
            name: 'Campaña 4',
            message: 'Solo en MeQuedoUno cupon SOLOAPP2',
            is_draft: false,
            processed: true,
            date_send: new Date(),
            SegmentId: 2
        },
        {
            name: 'Campaña 5',
            message: 'Cuando en MeQuedoUno cupon SOLOAPP',
            is_draft: 1,
            processed: 0,
            date_send: new Date(),
            SegmentId: 1
        },
        {
            name: 'Campaña 6',
            message: 'Yeppa en MeQuedoUno cupon SOLOAPP2',
            is_draft: 0,
            processed: 1,
            date_send: new Date(),
            SegmentId: 2
        }
    ];

    var platforms_data = [
        {name: 'iOS', active: true},
        {name: 'Android', active: true},
        {name: 'WPhone', active: false}
    ];

    async.waterfall([
        function (next) {
            models.Platform.bulkCreate(platforms_data)
                .then(function () {
                    next();
                }
            );
        },
        function (next) {
            models.Customer.bulkCreate(customer_data)
                .then(function () {
                    next();
                }
            );
        },
        function (next) {
            models.Segment.bulkCreate(segment_data)
                .then(function () {
                    next();
                }
            );
        },
        function (next) {
            models.Devicetoken.bulkCreate(devicetoken_data)
                .then(function (insertedObjects) {
                    models.Segment.findByPrimary(1)
                        .then(function(segment){
                            segment.addDevicetoken([1,2,3,4,5]);
                            next();
                        });

                });
        },
        function(next){
            models.Segment.findByPrimary(2)
                .then(function(segment){
                    segment.addDevicetokens([3,4]);
                    next();
                });
        },
        function (next) {
            models.Scheduller.bulkCreate(scheduller_data)
                .then(function (result) {
                    models.Segment.findByPrimary(1)
                        .then(function(segment){
                            segment.addScheduller([1]);
                            models.Segment.findByPrimary(1)
                                .then(function(segment2){
                                    segment2.addScheduller([2,1]).then(function(){next()});
                                });
                        });


                }
            );
        },
        function(next){
            models.Scheduller.bulkCreate(user_data)
                .then(function(result){
                    console.log(result);
                    next();
                })
        }
    ], function (err, result) {
        if (err) {
            console.log('ERROR'.red);
            return err;
        } else {
            console.log('All inserted OK'.yellow);
            return result;
        }
    });

});