const mongoose = require("mongoose");
const AppointmentSchema = new mongoose.Schema({
  patient: { type: String, required: true },
  doctor: { type: String, required: true },
  date: { type: String, required: true },
  timeSlot: { type: String, required: true },
});
module.exports = mongoose.model("Appointment", AppointmentSchema);
