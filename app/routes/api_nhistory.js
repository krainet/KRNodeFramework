var express             = require('express');
var router              = express.Router();
var nhistory_controller    = require('../controllers/nhistory_controller');
var jwtmiddleware       = require('./jwtmiddleware');



jwtmiddleware(router);

/* GET Newsletter history listing. */
router.get('/',nhistory_controller.list);
router.get('/:id',nhistory_controller.get);
router.get('/:id/:searchname',nhistory_controller.get);

router.post('/',nhistory_controller.create);

router.put('/:id',nhistory_controller.put);
router.put('/:id/:searchname',nhistory_controller.put);

router.delete('/:id',nhistory_controller.delete);
router.delete('/:id/:searchname',nhistory_controller.delete);

module.exports = router;
