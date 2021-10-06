const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Ambulance = new Schema( {
  id: {type: String},
  plate: { type: String },
  driver: { type: String },
  dob: { type: Date },
  phone: { type: String },
  available: { type: String },
  travelTime: { type: Number },
});

module.exports = mongoose.model ('Ambulance', Ambulance);