const Doctor = require("../models/Doctor.Model");

const getAllDoctors = async (req, res) => {
  try {
    const getAllDoctors = await Doctor.find({});

    if (!getAllDoctors) {
      res.status(400).json({
        success: false,
        message: "No doctors found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Doctors retrieved successfully",
      data: getAllDoctors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "error while fetching all doctors in backend" + error.message,
    });
  }
};

const createDoctor = async (req, res) => {
  try {
    const createDoctor = await Doctor.create(req.body);

    if (!createDoctor) {
      res.status(400).json({
        success: false,
        message: "Failed to add doctor",
      });
    }
    res.status(201).json({
      success: true,
      message: "Doctor added successfully",
      data: createDoctor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "error while adding doctor in backend" + error.message,
    });
  }
};

const getDoctorById = async (req, res) => {
  try {
    const { id } = req.params;
    const getById = await Doctor.findById(id);
    if (!getById) {
      res.status(400).json({
        success: false,
        message: "No doctor found with this id",
      });
    }
    res
      .status(201)
      .json({ message: "doctor found successfully", data: getById });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "error while fetching doctor by id in backend" + error.message,
    });
  }
};

const updateDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const updateDoc = await Doctor.findByIdAndUpdate(id, req.body);

    if (!updateDoc) {
      res.status(400).json({
        success: false,
        message: "No doctor found with this id to update",
      });
    }
    res
      .status(201)
      .json({ message: "doctor updated successfully", data: updateDoc });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "error while updating doctor in backend" + error.message,
    });
  }
};
const deleteDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteDoc = await Doctor.findByIdAndDelete(id);
    if (!deleteDoc) {
      res.status(400).json({
        success: false,
        message: "No doctor found with this id to delete",
      });
    }
    res
      .status(201)
      .json({ message: "doctor deleted successfully", data: deleteDoc });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "error while deleting doctor in backend" + error.message,
    });
  }
};
module.exports = {
  getAllDoctors,
  createDoctor,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
};
