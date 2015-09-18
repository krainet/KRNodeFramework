/**
 * Created by ramon on 18/09/15.
 */

var settings = require('../../config/settings');

//API ROUTES
var user_routes = require('./api_users');
var customer_routes = require('./api_customers');


module.exports = function (app) {

    //Api routes
    app.use(settings.api_prefix+'/users',user_routes);
    app.use(settings.api_prefix+'/customers',customer_routes);

}