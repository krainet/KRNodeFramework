/**
 * Created by ramon on 15/09/15.
 */
var settings = require('../../config/settings');

//API ROUTES PUSH
var auth_routes         = require('./api_auth');
var user_routes         = require('./api_users');
var platform_routes     = require('./api_platforms');
var customer_routes     = require('./api_customers');
var devicetoken_routes  = require('./api_devicetokens');
var segment_routes      = require('./api_segments');
var scheduler_routes    = require('./api_schedulers');
var campaigns_routes    = require('./api_campaigns');
var pushlauncher_routes = require('./api_pushlauncher');
var pushhistory_routes  = require('./api_pushhistory');
var mqpsh_routes        = require('./api_mqpsh');

//API GET CONFIG FOR APPS
var configapp_routes    = require('./api_configapp');

// NEWSLETTER
var nshops_routes = require('./api_nshops');
var ncomponents_routes = require('./api_ncomponents');
var nhistory_routes = require('./api_nhistory');
var nspecialday_routes = require('./api_nspecialday');
var nsend_routes = require('./api_nsend');

//WEB ROUTES
var home_routes = require('./web_home');

module.exports = function (app) {

    //Api routes
    app.use(settings.api_prefix+'/auth',auth_routes);
    app.use(settings.api_prefix+'/users',user_routes);
    app.use(settings.api_prefix+'/customers',customer_routes);
    app.use(settings.api_prefix+'/devicetokens',devicetoken_routes);
    app.use(settings.api_prefix+'/segments',segment_routes);
    app.use(settings.api_prefix+'/schedulers',scheduler_routes);
    app.use(settings.api_prefix+'/campaigns',campaigns_routes);
    app.use(settings.api_prefix+'/platforms',platform_routes);
    app.use(settings.api_prefix+'/pushlauncher',pushlauncher_routes);
    app.use(settings.api_prefix+'/pushhistory',pushhistory_routes);
    app.use(settings.api_prefix+'/nshops',nshops_routes);
    app.use(settings.api_prefix+'/ncomponents',ncomponents_routes);
    app.use(settings.api_prefix+'/nhistory',nhistory_routes);
    app.use(settings.api_prefix+'/nspecialday',nspecialday_routes);
    app.use(settings.api_prefix+'/nsend',nsend_routes);
    app.use(settings.api_prefix+'/configapp',configapp_routes);
    app.use(settings.api_prefix+'/mqpsh',mqpsh_routes);
    //Web routes
    app.use('/',home_routes);
};