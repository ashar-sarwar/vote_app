const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const optionSchema = new Schema({
  option:String,
  votes:{
      type:Number,
      default:0
  }
});

const PollSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  question: String,
  options: [optionSchema],
  voted: [
    {
      type: Schema.Types.ObjectId,
      ref: "users"
    }
  ]
});

module.exports = mongoose.model("polls", PollSchema);
