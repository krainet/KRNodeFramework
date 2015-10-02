var express = require('express');
var router = express.Router();
var pushhistory_controller = require('../controllers/pushhistory_controller');
var jwtmiddleware       = require('./jwtmiddleware');

//jwtmiddleware(router);

/* GET users listing. */

router.get('/',pushhistory_controller.list);
router.get('/:devicetoken',pushhistory_controller.get);
router.post('/',pushhistory_controller.create);
router.put('/:id',pushhistory_controller.put);
router.delete('/:id',pushhistory_controller.delete);

module.exports = router;
