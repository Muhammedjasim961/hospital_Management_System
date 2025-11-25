const express = require("express");
const router = express.Router();
const DoctorController = require("../controllers/Doctor.Controllers");
const PatientController = require("../controllers/Patient.Controller");
const AppointmentController = require("../controllers/Appointment.Controller");
const AuthController = require("../controllers/Auth.Controllers");

//Auth Routes
router.post("/register", AuthController.registerUser);
router.post("/login", AuthController.loginUser);

//Doctor Routes
router.get("/doctors", DoctorController.getAllDoctors);
router.post("/insertDoctor", DoctorController.createDoctor);
router.get("/doctorId/:id", DoctorController.getDoctorById);
router.put("/updateDoctor/:id", DoctorController.updateDoctor);
router.delete("/deleteDoctor/:id", DoctorController.deleteDoctor);

//Patient Routes
router.get("/patients", PatientController.getAllPatient);
router.post("/insertPatient", PatientController.createPatient);
router.get("/patientId/:id", PatientController.getPatientById);
router.put("/updatePatient/:id", PatientController.updatePatient);
router.delete("/deletePatient/:id", PatientController.deletePatient);

//Appointment Routes
router.get("/appointments", AppointmentController.getAllAppointments);
router.post("/insertAppointment", AppointmentController.createAppointment);
router.get("/appointmentId/:id", AppointmentController.getAppointmentById);
router.put("/updateAppointment/:id", AppointmentController.updateAppointment);
router.delete(
  "/deleteAppointment/:id",
  AppointmentController.deleteAppointment
);
module.exports = router;
