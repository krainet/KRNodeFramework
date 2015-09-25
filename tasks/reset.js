var Sequelize   = require('sequelize');
var models      = require('../app/models/');
var async       = require('async');
var colors      = require('colors');
var crypto      = require('crypto');


models.sequelize.sync({force:true}).then(function() {

    var user_data = [
        {username: 'krainet1', password: 'Basura1', email: 'krainet1@gmail.com'},
        {username: 'krainet2', password: 'Basura2', email: 'krainet2@gmail.com'},
        {username: 'krainet3', password: 'Basura3', email: 'krainet3@gmail.com'}
    ];

    var customer_data = [
        {email: 'krainet1@gmail.com', id_customer: 1},
        {email: 'krainet2@gmail.com', id_customer: 2},
        {email: 'krainet3@gmail.com', id_customer: 3},
        {email: 'krainet4@gmail.com', id_customer: 4},
        {email: 'krainet5@gmail.com', id_customer: 5}
    ];


    var devicetoken_data = [
        {token: crypto.createHash('md5').update('krainet1@gmail.com').digest("hex")},
        {token: crypto.createHash('md5').update('krainet2@gmail.com').digest("hex")},
        {token: crypto.createHash('md5').update('krainet3@gmail.com').digest("hex")},
        {token: crypto.createHash('md5').update('krainet4@gmail.com').digest("hex")},
        {token: crypto.createHash('md5').update('krainet5@gmail.com').digest("hex")}
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
            msg_text: 'Compra en MeQuedoUno cupon SOLOAPP',
            is_draft: 1,
            processed: 0,
            date_to_send: new Date(),
            owner_id: 1,
            segment_id: 1
        },
        {
            name: 'Campaña 2',
            msg_text: 'Compra en MeQuedoUno cupon SOLOAPP2',
            is_draft: 0,
            processed: 1,
            date_to_send: new Date(),
            owner_id: 2,
            segment_id: 2
        }
    ];

    var platforms_data = [
        {name: 'iOS', active: true},
        {name: 'Android', active: true},
        {name: 'WPhone', active: false}

    ];

    async.waterfall([
        function (next) {
            console.log('Creating dummy user data...'.green);
            models.Devicetoken.bulkCreate(devicetoken_data)
                .then(function () {
                    console.log('done');
                    next();
                }
            );
        },
        function (next) {
            console.log('Creating dummy user data...'.green);
            models.Platform.bulkCreate(platforms_data)
                .then(function () {
                    console.log('done');
                    next();
                }
            );
        }
    ], function (err, result) {
        if (err) {
            console.log('ERROR'.red);
            return err;
        } else {
            console.log('TOT BEEE'.yellow)
            return result;
        }
    });

});