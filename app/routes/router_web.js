/**
 * Created by ramon on 18/09/15.
 */

//WEB ROUTES
var home_routes = require('./web_home');

module.exports = function (app) {
    //Web routes
    app.use('/',home_routes);
}