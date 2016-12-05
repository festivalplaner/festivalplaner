var passport = require('passport'),
  mustBe = require('mustbe'),
  mongoose = require('mongoose'),
  JwtStrategy = require('passport-jwt').Strategy,
  GitHubStrategy = require('passport-github2').Strategy,
  ObjectId = require('mongoose').Types.ObjectId,
  User = mongoose.model('User');

module.exports = function(app, config) {

  // Authentication
  passport.use(new JwtStrategy(config.jwt, function(jwt_payload, done) {
    User.findOne({_id: new ObjectId(jwt_payload.substr(1).slice(0, -1))}, function(err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  }));

  for (var confName in config.github) {
    passport.use('github-'+confName, new GitHubStrategy({
        clientID: config.github[confName].clientId,
        clientSecret: config.github[confName].clientSecret
      }, function (accessToken, refreshToken, profile, next) {
        User.findOne({'github.id': profile.id}, function (err, user) {
          if (err) {
            return next(err, false);
          }
          if (user) {
            return user.updateFromGithub(profile, next);
          } else {
            return User.createFromGithub(profile, next);
          }
        });
      }
    ));
  }

  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  app.use(passport.initialize());

  // Authorization
  mustBe.configure(function(config) {
    config.routeHelpers(function(rh) {
      // get the current user from the request object
      rh.getUser(function(req, cb){
        // @todo return cb(err); if there is an error
        cb(null, req.user);
      });

      // what do we do when the user is not authorized?
      rh.notAuthorized(function(req, res, next){
        res.status(401);
      });

      
    });

    config.userIdentity(function(id) {
      // determine if this user is authenticated or not
      id.isAuthenticated(function(user, cb){
        // note that the "user" in this case, is the user
        // that was supplied by the routeHelpers.getUser function
        cb(null, user !== null);
      });
    });

    config.activities(function(activities){
      // configure an activity with an authorization check
      activities.can("login", function(identity, params, cb) {
        cb(null, identity.user.active);
      });
      activities.can("update own data", function(identity, params, cb) {
        params.record.then(function(data) {
          cb(null, identity.user.isAdmin() || identity.user._id + '' == data.user);
        }, function() {
          cb(null, identity.user.isAdmin());
        });
      });
      activities.can("admin", function(identity, params, cb) {
        cb(null, identity.user.isAdmin());
      });
    });
  });
};
