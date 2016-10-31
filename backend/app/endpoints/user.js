var express = require('express'),
  cors = require('cors'),
  passport = require('passport'),
  mongoose = require('mongoose'),
  restify = require('express-restify-mongoose'),
  User = mongoose.model('User'),
  router = express.Router();

module.exports = function (app) {
  app.use(cors());
  app.use(passport.authenticate('jwt', { session: false }));
  app.use('/', router);

  console.log(restify.serve(router, User, {version: '', prefix: '', lowercase: true}));
};

