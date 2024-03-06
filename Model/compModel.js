const mongoose = require("mongoose");

const compSchema = new mongoose.Schema({
  cardName: {
    type: String,
    required: true,
    unique: true
  },
  compGuide: {
    type:String
  },
  floorGuide: {
    type: String
  },

});

const Comp = mongoose.model("Comp", compSchema);

module.exports = Comp;
