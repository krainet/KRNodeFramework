var Sequelize   = require('sequelize');
var models      = require('../app/models/');
var async       = require('async');
var colors      = require('colors');
var crypto      = require('crypto');


models.sequelize.sync({force:true,omitNull:true}).then(function() {

    var user_data = [
        {username: 'krainet1', password: 'Basura1', email: 'krainet1@gmail.com',level:10},
        {username: 'krainet2', password: 'Basura2', email: 'krainet2@gmail.com',level:5},
        {username: 'krainet3', password: 'Basura3', email: 'krainet3@gmail.com',level:0}
    ];

    var customer_data = [
        {email: 'krainet1@gmail.com', id_customer: 1},
        {email: 'krainet2@gmail.com', id_customer: 2},
        {email: 'krainet3@gmail.com', id_customer: 3},
        {email: 'krainet4@gmail.com', id_customer: 4},
        {email: 'krainet5@gmail.com', id_customer: 5}
    ];


    var devicetoken_data = [
        {token: crypto.createHash('md5').update('krainet1@gmail.com').digest("hex"),PlatformId:1,CustomerId:1},
        {token: crypto.createHash('md5').update('krainet2@gmail.com').digest("hex"),PlatformId:1,CustomerId:1},
        {token: crypto.createHash('md5').update('krainet3@gmail.com').digest("hex"),PlatformId:2,CustomerId:3},
        {token: crypto.createHash('md5').update('krainet4@gmail.com').digest("hex"),PlatformId:2,CustomerId:4},
        {token: crypto.createHash('md5').update('krainet5@gmail.com').digest("hex"),PlatformId:1,CustomerId:5}
    ];

    var segment1 = {id_customer: {'<': 3}};
    var segment2 = {id_customer: {'<': 2}};
    var segment_data = [
        {name: 'Test segment 1', description: 'Segmento de pruebas n.1', configuration: JSON.stringify(segment1)},
        {name: 'Test segment 2', description: 'Segmento de pruebas n.2', configuration: JSON.stringify(segment2)}
    ];

    var scheduller_data = [
        {
            name: 'Campaña 1',
            message: 'Compra en MeQuedoUno cupon SOLOAPP',
            is_draft: 1,
            processed: 0,
            date_send: new Date(),
            SegmentId: 1
        },
        {
            name: 'Campaña 2',
            message: 'Compra en MeQuedoUno cupon SOLOAPP2',
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