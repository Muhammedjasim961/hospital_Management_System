const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  specialty: {
    type: String,
  },
});
module.exports = mongoose.model("Doctor", doctorSchema);
