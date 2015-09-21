/**
 * Created by ramon on 15/09/15.
 */
var settings = require('../../config/settings');

//API ROUTES
var auth_routes         = require('./api_auth');
var user_routes         = require('./api_users');
var customer_routes     = require('./api_customers');
var devicetoken_routes  = require('./api_devicetokens');

//WEB ROUTES
var home_routes = require('./web_home');



module.exports = function (app) {

    //Api routes
    app.use(settings.api_prefix+'/auth',auth_routes);
    app.use(settings.api_prefix+'/users',user_routes);
    app.use(settings.api_prefix+'/customers',customer_routes);
    app.use(settings.api_prefix+'/devicetokens',devicetoken_routes);

    //Web routes
    app.use('/',home_routes);
}