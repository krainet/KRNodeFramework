/**
 * Created by ramon on 9/11/15.
 */

var express = require('express');
var router = express.Router();
var mqpsh_controller = require('../controllers/mqpsh_controller');
var jwtmiddleware       = require('./jwtmiddleware');

jwtmiddleware(router);

/* GET users listing. */

router.get('/',mqpsh_controller.list);
router.get('/:email',mqpsh_controller.get);
router.post('/',mqpsh_controller.create);
router.put('/:id',mqpsh_controller.put);
router.delete('/:id',mqpsh_controller.delete);

module.exports = router;