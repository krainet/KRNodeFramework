var express             = require('express');
var router              = express.Router();
var nshops_controller    = require('../controllers/nshops_controller');
var jwtmiddleware       = require('./jwtmiddleware');



jwtmiddleware(router);

/* GET Newsletter Shops listing. */
router.get('/',nshops_controller.list);
router.get('/:id',nshops_controller.get);
router.get('/:id/:searchname',nshops_controller.get);
router.post('/',nshops_controller.create);
router.put('/:id',nshops_controller.put);
router.delete('/:id',nshops_controller.delete);

module.exports = router;
