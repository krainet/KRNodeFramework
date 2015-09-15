/**
 * Created by hadock on 15/09/15.
 */
var _       = require('lodash');
var helpers = require('./_helpers');

module.exports = {
    list: function (req, res, next) {
        console.log(req.baseUrl);
        req.models.customer.find().order('-id').all(function (err, customers) {
            if (err) return next(err);

            var items = customers.map(function (m) {
                return m.serialize();
            });

            res.send({ items: items });
        });
    },
    create: function (req, res, next) {
        var params = _.pick(req.body, 'username', 'email','password');
        req.models.customer.create(params, function (err, customers) {
            if(err) {
                if(Array.isArray(err)) {
                    return res.send(200, { errors: helpers.formatErrors(err) });
                } else {
                    return next(err);
                }
            }

            return res.send(200, customers.serialize());
        });
    },
    get: function (req, res, next) {
        req.models.customer.get(req.params.id,function (err, user) {
            if(err) helpers.returnError(err,res,next);
            var items = user.serialize();
            res.json({success:true,data:items});
        });

    },
    put: function(req,res,next) {
        var params = _.pick(req.body, 'username', 'email','password');
        req.models.customer.get(req.params.id,function (err, user) {
            if(err) helpers.returnError(err,res,next);
            user.save(params);
        });
    },
    delete: function(req,res,next) {
        req.models.customer.get(req.params.id,function (err, user) {
            user.remove(function(err){
                if(err) helpers.returnError(err,res,next);
            })
        });
    }
};
