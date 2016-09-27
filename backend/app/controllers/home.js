var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Artist = mongoose.model('Artist');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {
  Artist.find(function (err, artists) {
    if (err) return next(err);
    res.render('index', {
      title: 'Festival Planer',
      artists: artists
    });
  });
});
