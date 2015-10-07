var express             = require('express');
var router              = express.Router();
var ncomponents_controller    = require('../controllers/ncomponents_controller');
var jwtmiddleware       = require('./jwtmiddleware');



jwtmiddleware(router);

/* GET Newsletter Templates listing. */
router.get('/',ncomponents_controller.list);

router.get('/:id',ncomponents_controller.get);
router.get('/:id/:searchtype/:searchname',ncomponents_controller.get);
router.get('/:id/:searchtype',ncomponents_controller.get);

router.post('/',ncomponents_controller.create);

router.put('/:id',ncomponents_controller.put);
router.put('/:id/:searchtype',ncomponents_controller.put);

router.delete('/:id',ncomponents_controller.delete);
router.delete('/:id/:searchtype',ncomponents_controller.delete);

module.exports = router;
