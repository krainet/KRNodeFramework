var express = require('express');
var router = express.Router();
var platform_controller = require('../controllers/platforms_controller');
var jwtmiddleware       = require('./jwtmiddleware');

jwtmiddleware(router);

/* GET users listing. */

router.get('/',platform_controller.list);
router.get('/:id',platform_controller.get);
router.get('/:id/:searchtoken',platform_controller.get);
router.post('/',platform_controller.create);
router.put('/:id',platform_controller.put);
router.delete('/:id',platform_controller.delete);

module.exports = router;
