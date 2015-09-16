var _       = require('lodash');
var helpers = require('./_helpers');

module.exports = {
    list: function (req, res, next) {
        req.models.user.find().order('-id').all(function (err, users) {
            if (err) return next(err);

            var items = users.map(function (m) {
                return m.serialize();
            });

            res.send({ items: items });
        });
    },
    create: function (req, res, next) {
        var params = _.pick(req.body, 'username', 'email','password');
        req.models.user.create(params, function (err, users) {
            if(err) {
                if(Array.isArray(err)) {
                    return res.send(200, { errors: helpers.formatErrors(err) });
                } else {
                    return next(err);
                }
            }

            return res.send(200, users.serialize());
        });
    },
    get: function (req, res, next) {
        req.models.user.get(req.params.id,function (err, user) {
            if (err) {
                res.json({success:false,errors:err});
                return next(err);
            }
            var items = user.serialize();
            res.json({success:true,data:items});
        });

    },
    put: function(req,res,next) {
        var params = _.pick(req.body, 'username', 'email','password');
        req.models.user.get(req.params.id,function (err, user) {
            if(err){
                res.json({success:false,errors:err});
                return next(err);
            }
            user.save(params);
        });
    },
    delete: function(req,res,next) {
        req.models.user.get(req.params.id,function (err, user) {
            user.remove(function(err){
                if(err){
                    console.log(err);
                }
            })
        });
    }
};
