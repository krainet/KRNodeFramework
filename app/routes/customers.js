var express = require('express');
var router = express.Router();
var customer_controller = require('../controllers/users_controller');

/* GET users listing. */
router.get('/',customer_controller.list);
router.get('/:id',customer_controller.get);
router.post('/',customer_controller.create);

module.exports = router;
