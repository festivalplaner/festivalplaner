var express = require('express'),
  cors = require('cors'),
  passport = require('passport'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  jws = require('jws'),
  config = require('./../../config/config'),
  User = mongoose.model('User'),
  router = express.Router();

module.exports = function (app) {
  app.use('/auth', router);
};

var corsOptions = {
  origin: config.cors.origin,
  credentials: true
};

router.options('/github', cors(corsOptions));

router.post('/github', 
  cors(corsOptions),
  function(req, res, next) {
    req.query = req.body;
    passport.authenticate(function() {
      for (var confName in config.github) {
        if (config.github[confName].clientId === req.query.clientId) {
          return 'github-'+confName;
        }
      }
    }(), 
      function(err, user, info) {
        if (err) return next(err);
        res.json({"token": jws.sign({
          header: { alg: 'HS256' },
          payload: user._id,
          secret: config.jwt.secretOrKey
        })});
        next();
      })(req, res, next);
  });
