var express = require('express');
var router = express.Router();
var pushlauncher_controller = require('../controllers/pushlauncher_controller');
var jwtmiddleware       = require('./jwtmiddleware');

//jwtmiddleware(router);

/* GET users listing. */

router.get('/',pushlauncher_controller.list);
router.get('/:id',pushlauncher_controller.get);
router.post('/',pushlauncher_controller.create);
router.put('/:id',pushlauncher_controller.put);
router.delete('/:id',pushlauncher_controller.delete);

module.exports = router;
