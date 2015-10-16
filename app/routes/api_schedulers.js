var express = require('express');
var router = express.Router();
var scheduler_controller = require('../controllers/schedulers_controller');
var jwtmiddleware       = require('./jwtmiddleware');

jwtmiddleware(router);

/* GET users listing. */

router.get('/',scheduler_controller.list);
router.get('/:id',scheduler_controller.get);
router.post('/',scheduler_controller.create);
router.put('/:id',scheduler_controller.put);
router.delete('/:id',scheduler_controller.delete);

module.exports = router;
