const Patient = require("../models/Patient.Model");

const getAllPatient = async (req, res) => {
  try {
    const getAllPatient = await Patient.find({});

    if (!getAllPatient) {
      res.status(400).json({
        success: false,
        message: "No Patients found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Patients retrieved successfully",
      total: getAllPatient.length,
      data: getAllPatient,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "error while fetching all Patients in backend" + error.message,
    });
  }
};

const createPatient = async (req, res) => {
  try {
    const patient = await Patient.create(req.body);

    if (!patient) {
      res.status(400).json({
        success: false,
        message: "Failed to add patient",
      });
    }
    return res.status(201).json({
      success: true,
      message: "patient added successfully",
      data: patient,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "error while adding patient in backend" + error.message,
    });
  }
};

const getPatientById = async (req, res) => {
  try {
    const { id } = req.params;
    const getById = await Patient.findById(id);
    if (!getById) {
      res.status(400).json({
        success: false,
        message: "No patient found with this id",
      });
    }
    res
      .status(201)
      .json({ message: "patient found successfully", data: getById });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "error while fetching patient by id in backend" + error.message,
    });
  }
};

const updatePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const patient = await Patient.findByIdAndUpdate(id, req.body);

    if (!patient) {
      res.status(400).json({
        success: false,
        message: "No patient found with this id to update",
      });
    }
    res
      .status(201)
      .json({ message: "patient updated successfully", data: patient });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "error while updating patient in backend" + error.message,
    });
  }
};
const deletePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const patient = await Patient.findByIdAndDelete(id);
    if (!patient) {
      res.status(400).json({
        success: false,
        message: "No patient found with this id to delete",
      });
    }
    res
      .status(201)
      .json({ message: "patient deleted successfully", data: patient });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "error while deleting patient in backend" + error.message,
    });
  }
};
module.exports = {
  getAllPatient,
  createPatient,
  getPatientById,
  updatePatient,
  deletePatient,
};
