/**
 * Created by ramon on 22/09/15.
 */
var models      = require('../app/models/');
var async       = require('async');
var colors      = require('colors');
var crypto      = require('crypto');

models(function (err, db) {
    if (err) throw err;

    async.waterfall([
        function(next){
            console.log('Processing scheduller ...'.blue);
            db.models.scheduller.find({}, function (err, result) {
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
