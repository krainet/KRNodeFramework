/**
 * Created by ramon on 15/09/15.
 */
var settings = require('../../config/settings');

//API ROUTES
var user_routes = require('./api_users');
var customer_routes = require('./api_customers');

//WEB ROUTES
var home_routes = require('./web_home');



module.exports = function (app) {

    //Api routes
    var api_prefix = settings.api_prefix

    app.use(settings.api_prefix+'/users',user_routes);
    app.use(settings.api_prefix+'/customers',customer_routes);

    //Web routes
    app.use(settings.api_prefix+'/',home_routes);
}