var express = require('express');
var router = express.Router();
var devicetoken_controller = require('../controllers/devicetokens_controller');
var jwtmiddleware       = require('./jwtmiddleware');

jwtmiddleware(router);

/* GET users listing. */

router.get('/',devicetoken_controller.list);
router.get('/:id',devicetoken_controller.get);
router.post('/',devicetoken_controller.create);
router.put('/:id',devicetoken_controller.put);
router.delete('/:id',devicetoken_controller.delete);

module.exports = router;
