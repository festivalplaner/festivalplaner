// Band model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var BandSchema = new Schema({
  id: String,
  name: String,
  contact: String,
  raider: { type: Schema.Types.ObjectId, ref: 'Raider' }
});

BandSchema.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });

mongoose.model('Band', BandSchema);

