var express             = require('express');
var router              = express.Router();
var nspecialday_controller    = require('../controllers/nspecialday_controller');
var jwtmiddleware       = require('./jwtmiddleware');



jwtmiddleware(router);

/* GET Newsletter history listing. */
//router.get('/',nspecialday_controller.list);
router.get('/:id/:expectedDate',nspecialday_controller.get);
router.get('/:id/:expectedDate/:idOffer',nspecialday_controller.get);
/*
router.post('/',nspecialday_controller.create);
router.put('/:id',nspecialday_controller.put);

router.delete('/:id',nspecialday_controller.delete);*/

module.exports = router;
