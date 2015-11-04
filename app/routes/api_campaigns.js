var express = require('express');
var router = express.Router();
var campaigns_controller = require('../controllers/campaigns_controller');
var jwtmiddleware       = require('./jwtmiddleware');

jwtmiddleware(router);

/* GET users listing. */

router.get('/',campaigns_controller.list);
router.get('/:id',campaigns_controller.get);
router.post('/',campaigns_controller.create);
router.put('/:id',campaigns_controller.put);
router.delete('/:id',campaigns_controller.delete);

module.exports = router;
