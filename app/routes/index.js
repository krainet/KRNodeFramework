/**
 * Created by ramon on 15/09/15.
 */
var settings = require('../../config/settings');

//API ROUTES
var auth_routes         = require('./api_auth');
var user_routes         = require('./api_users');
var platform_routes     = require('./api_platforms');
var customer_routes     = require('./api_customers');
var devicetoken_routes  = require('./api_devicetokens');
var segment_routes      = require('./api_segments');
var scheduller_routes   = require('./api_schedullers');

//WEB ROUTES
var home_routes = require('./web_home');



module.exports = function (app) {

    //Api routes
    app.use(settings.api_prefix+'/auth',auth_routes);
    app.use(settings.api_prefix+'/users',user_routes);
    app.use(settings.api_prefix+'/customers',customer_routes);
    app.use(settings.api_prefix+'/devicetokens',devicetoken_routes);
    app.use(settings.api_prefix+'/segments',segment_routes);
    app.use(settings.api_prefix+'/schedullers',scheduller_routes);
    app.use(settings.api_prefix+'/platforms',platform_routes);


    //Web routes
    app.use('/',home_routes);
}