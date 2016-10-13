// Room model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var RoomSchema = new Schema({
  id: String,
  roomnumber: String,
  start: { type: Date },
  end: { type: Date },
  hotel: { type: Schema.Types.ObjectId, ref: 'Hotel' }
});

RoomSchema.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });

mongoose.model('Room', RoomSchema);

