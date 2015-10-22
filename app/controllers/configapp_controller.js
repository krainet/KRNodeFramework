/**
 * Created by ramon on 21/10/15.
 * APP CONFIG & VERSIONING
 */

var _               = require('lodash');
var helpers         = require('./../helpers/responseHelper');
var settings        = require('../../config/settings');
var models          = require('../models');

var controller_name = 'configapp';

module.exports = {
    list: function (req, res, next) {
        var json=JSON.parse('{ "config_open_app":false, "config_clean_all_cache":false, "config_open_app_android":false, "config_open_app_ios":false, "config_closed_app_msg_key_android":"txt_closed_app_msg", "config_closed_app_msg_key_ios":"txt_closed_app_msg", "config_closed_app_title_key_android":"txt_closed_app_title", "config_closed_app_title_key_ios":"txt_closed_app_title", "config_closed_btn_txt_key_android":"txt_closed_app_btn", "config_closed_btn_txt_key_ios":"txt_closed_app_btn", "config_closed_update_android":false, "config_closed_update_ios":false, "config_closed_version_base_android":"4", "config_closed_version_base_ios":"4", "config_closed_version_arg_android":"<", "config_closed_version_arg_ios":"<", "config_closed_version_arg_samples":"<,>,=,<=,>=", "config_url_base":"http://msell.com.es/MQ1/", "config_url_i18n":"statics_texts.php", "config_url_localized_config":"config.php", "config_analytics_account_id":"UA-11055945-16", "config_analytics_store_name":"MQ1", "config_analytics_dispatch_period":10, "config_push_app_id":11, "config_push_domain":"msell.com.es/apns", "config_push_discount_code":"", "config_check_payment_interval":1, "config_check_payment_attempts":20, "config_page_size":20, "url_paypal":"http://msell.com.es/zacaris/paypal-dev/sec.php", "config_default_lang":"es", "config_available_langs": { "es": { "Name":"Español", "URL":"http://msell.com.es/zacaris/flags/es.png" } } }');
            return res.status(200).json(json);
    },
    create: function (req, res, next) {
        return res.status(200).json(helpers.formatResponse(controller_name,req.method,null,'Empty'));
    },
    get: function (req, res, next) {
        return res.status(200).json(helpers.formatResponse(controller_name,req.method,null,'Empty'));
    },
    put: function(req,res,next) {
        return res.status(200).json(helpers.formatResponse(controller_name,req.method,null,'Empty'));
    },
    delete: function(req,res,next) {
        return res.status(200).json(helpers.formatResponse(controller_name,req.method,null,'Empty'));
    }
};

