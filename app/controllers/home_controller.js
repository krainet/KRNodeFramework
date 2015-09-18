var settings = require('../../config/settings');

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
  get: function (req, res, next) {
    req.models.user.get(req.params.id,function (err, user) {
      if (err) {
        res.json({success:false,errors:err});
        return next(err);
      }
      var items = user.serialize();
      return res.status(200).json(helpers.formatResponse(controller_name,req.method,items));
    });

  }
};

