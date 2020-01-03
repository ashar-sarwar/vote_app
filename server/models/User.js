const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },
  password: {
    type: String,
    required: true
  },
  polls: [
    {
      type: Schema.Types.ObjectId,
      ref: "polls"
    }
  ]
});

UserSchema.pre("save", async function(next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    const hashed = await bcrypt.hash(this.password, 10);
    this.password = hashed;
  } catch (err) {
    return next(err);
  }
});

UserSchema.methods.comparePassword = async function(attempt, next) {
  try {
    return await bcrypt.compare(attempt, this.password);
  } catch (err) {
    next(err);
  }
};

module.exports = mongoose.model("users", UserSchema);
