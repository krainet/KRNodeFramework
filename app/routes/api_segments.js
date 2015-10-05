var express = require('express');
var router = express.Router();
var segments_controller = require('../controllers/segments_controller');
var jwtmiddleware       = require('./jwtmiddleware');

jwtmiddleware(router);

/* GET users listing. */

router.get('/',segments_controller.list);
router.get('/:id',segments_controller.get);
router.post('/',segments_controller.create);
router.put('/:id',segments_controller.put);
router.delete('/:id',segments_controller.delete);

module.exports = router;
