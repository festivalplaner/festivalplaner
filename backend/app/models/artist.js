// Artist model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ArtistSchema = new Schema({
  id: String,
  name: String,
  passportnr: String,
  mail: String,
  band: { type: Schema.Types.ObjectId, ref: 'Band' },
  room: { type: Schema.Types.ObjectId, ref: 'Room' },
  flight:{ type: Schema.Types.ObjectId, ref: 'Flight' }
});

ArtistSchema.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });

mongoose.model('Artist', ArtistSchema);

