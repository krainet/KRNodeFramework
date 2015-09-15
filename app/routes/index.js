/**
 * Created by ramon on 15/09/15.
 */
var user_routes = require('./users');
var customer_routes = require('./customers');

module.exports = function (app) {
    app.use('/users',user_routes);
    app.use('/customers',customer_routes);
}