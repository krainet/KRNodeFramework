var _               = require('lodash');
var helpers         = require('./_helpers');

var controller_name = 'users';

module.exports = {
    list: function (req, res, next) {
        req.models.user.find().order('-id').all(function (err, users) {
            if (err) return next(err);

            var items = users.map(function (m) {
                return m.serialize();
            });

            res.status(200).json(helpers.formatResponse(controller_name,req.method,items));
        });
    },
    create: function (req, res, next) {
        var params = _.pick(req.body, 'username', 'email','password');
        req.models.user.create(params, function (err, users) {
            if(err) {
                if(Array.isArray(err)) {
                    res.status(500).json(helpers.formatErrors(err,controller_name,req.method));
                } else {
                    return next(err);
                }
            }

            res.status(200).json(helpers.formatResponse(controller_name,req.method,users.serialize()));
        });
    },
    get: function (req, res, next) {

        req.models.user.get(req.params.id,function (err, user) {
            if (err) {
                res.status(500).json(helpers.formatErrors(err,controller_name,req.method));
                return next(err);
            }
            var items = user.serialize();
            res.status(200).json(helpers.formatResponse(controller_name,req.method,items));
        });

    },
    put: function(req,res,next) {
        var params = _.pick(req.body, 'username', 'email','password');
        req.models.user.get(req.params.id,function (err, user) {
            if(err){
                res.status(500).json(helpers.formatErrors(err,controller_name,req.method));
                return next(err);
            }
            user.save(params);
        });
    },
    delete: function(req,res,next) {
        req.models.user.get(req.params.id,function (err, user) {
            user.remove(function(err){
                if(err){
                    res.status(500).json(helpers.formatErrors(err,controller_name,req.method));
                }
                res.status(200).json(helpers.formatResponse(controller_name,req.method,null,'item deleted'));
            })
        });
    }
};
