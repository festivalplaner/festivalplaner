// User model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var UserSchema = new Schema({
  id: String,
  active: { type: Boolean, default: true },
  admin: { type: Boolean, default: false },
  github: {
    id: Number,
    username: String,
    url: String
  }
});

UserSchema.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });


UserSchema.statics.createFromGithub = function (profile, next) {
  var newUser = new this({
    github: {
      id: profile.id,
      username: profile.username,
      url: profile.profileUrl
    }
  });
  newUser.save(function(err, doc) {
    return next(false, doc);
  });
};

UserSchema.methods.updateFromGithub = function (profile, next) {
  var user = this;
  user.github.username = profile.username;
  user.github.url = profile.profileUrl;
  user.save(function(err, doc) {
    return next(false, user);
  });
};

UserSchema.methods.isAdmin = function() {
  return this.admin;
};

mongoose.model('User', UserSchema);

