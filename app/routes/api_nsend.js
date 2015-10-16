var express             = require('express');
var router              = express.Router();
var nsend_controller    = require('../controllers/nsend_controller');
var jwtmiddleware       = require('./jwtmiddleware');



jwtmiddleware(router);

/* GET Newsletter Shops listing. */
//router.get('/',nsend_controller.list);
router.get('/:id',nsend_controller.get);
/*router.get('/:id/:searchname',nsend_controller.get);*/
/*router.post('/',nsend_controller.create);
router.put('/:id',nsend_controller.put);
router.delete('/:id',nsend_controller.delete);*/

module.exports = router;
