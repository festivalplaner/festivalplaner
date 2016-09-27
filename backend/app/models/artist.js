// Artist model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ArtistSchema = new Schema({
  id: String,
  name: String,
  url: String,
  text: String
});

ArtistSchema.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });

mongoose.model('Artist', ArtistSchema);

