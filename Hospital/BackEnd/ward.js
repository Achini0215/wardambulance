const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Ward = new Schema( {
  id: {type: String},
  wardName: { type: String },
  building: { type: String },
  floor: { type: String },
  regDate: { type: Date },
  wardNum: { type: Number },
  discharge: { type: String },
  disDate: { type: Date },
  availableRoom: { type: String },
  roomCategory: { type: String },
  roomNum: { type: Number },
  bedNumber: { type: Number },
});

module.exports = mongoose.model ('Ward', Ward);