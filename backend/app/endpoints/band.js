var express = require('express'),
  cors = require('cors'),
  passport = require('passport'),
  mongoose = require('mongoose'),
  restify = require('express-restify-mongoose'),
  mustbe = require("mustbe").routeHelpers(),
  router = express.Router(),
  Band = mongoose.model('Band');

module.exports = function (app) {
  app.use(cors());
  app.use(passport.authenticate('jwt', { session: false }));
  app.use('/', router);

  okAuth = function(req, res, next) {
    next();
  };
  noAuth = function(req, res, next) {
    res.send(401, 'Authorization failed');
  };

  restify.serve(router, Band, {
    version: '',
    prefix: '',
    lowercase: true,
    preCreate: [
      mustbe.authorized('admin', okAuth, noAuth),
      function(req, res, next) {
        if (new Date(req.body.start) > new Date(req.body.end)) {
          res.send(400, 'End must be after Start');
        } else {
          next();
        }
      }
    ],
    preUpdate: [
      mustbe.authorized('admin', okAuth, noAuth)
    ],
    preDelete: mustbe.authorized('admin', okAuth, noAuth)
  });
};
