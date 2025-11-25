const mongoose = require("mongoose");
const PatientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    age: {
      type: Number,
    },
    gender: {
      type: String,
    },
    address: {
      type: String,
    },
    phone: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Patient", PatientSchema);
