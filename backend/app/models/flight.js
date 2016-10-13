// Flight model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var FlightSchema = new Schema({
  id: String,
  origin: String,
  destination: String,
  start: { type: Date },
  end: { type: Date }
});

FlightSchema.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });

mongoose.model('Flight', FlightSchema);

