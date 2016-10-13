// Concert model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ConcertSchema = new Schema({
  id: String,
  start: { type: Date },
  end: { type: Date },
  soundcheckstart: { type: Date },
  soundcheckend: { type: Date },
  location: String,
  band: { type: Schema.Typers.ObjectId, ref: 'Band' },
});

ConcertSchema.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });

mongoose.model('Concert', ConcertSchema);

