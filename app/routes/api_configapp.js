var express = require('express');
var router = express.Router();
var configapp_controller = require('../controllers/configapp_controller');
var jwtmiddleware       = require('./jwtmiddleware');

jwtmiddleware(router);

/* GET users listing. */

router.get('/',configapp_controller.list);

module.exports = router;
