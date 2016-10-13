// Hotel model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var HotelSchema = new Schema({
  id: String,
  name: String,
  adress: String,
  tel: String
});

HotelSchema.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });

mongoose.model('Hotel', HotelSchema);

