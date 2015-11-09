var express = require('express');
var router = express.Router();
var customer_controller = require('../controllers/customers_controller');
var jwtmiddleware       = require('./jwtmiddleware');

jwtmiddleware(router);

/* GET users listing. */

router.get('/',customer_controller.list);
router.get('/:id',customer_controller.get);
router.get('/:id/:id_customer/',customer_controller.get);
router.post('/',customer_controller.create);
router.put('/:id',customer_controller.put);
router.delete('/:id',customer_controller.delete);

module.exports = router;
