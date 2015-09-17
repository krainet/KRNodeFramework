var path            = require('path');
var express         = require('express');
var settings        = require('./settings');
var models          = require('../app/models/');
var bodyParser      = require('body-parser');
var logger          = require('morgan');
var methodOverride  = require('method-override');
var apiRouter       = require('../app/routes');
var fs              = require('fs');
var favicon         = require('serve-favicon');

module.exports = function (app) {

    app.use(express.static(path.join(settings.path, 'public')));

    var accessLogStream = fs.createWriteStream(settings.logsdir, {flags: 'a'});
    app.use(logger('dev', {stream: accessLogStream}));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(favicon(__dirname + '/../public/favicon.ico'));

    app.use(methodOverride());

    app.use(function (req, res, next) {
        models(function (err, db) {
            if (err) {
                res.status(500).json({success:false,message:'Unable to connect to DB'});
                return next(err);
            }

            req.models = db.models;
            req.db     = db;

            return next();
        });
    });

    //Set routing system
    apiRouter(app);

};
