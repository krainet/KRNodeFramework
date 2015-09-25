var express = require('express');
var router = express.Router();
var scheduller_controller = require('../controllers/schedullers_controller');
var jwtmiddleware       = require('./jwtmiddleware');

jwtmiddleware(router);

/* GET users listing. */

router.get('/',scheduller_controller.list);
router.get('/:id',scheduller_controller.get);
router.post('/',scheduller_controller.create);
router.put('/:id',scheduller_controller.put);
router.delete('/:id',scheduller_controller.delete);

module.exports = router;
