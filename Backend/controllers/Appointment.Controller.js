const express = require("express");
const Appointment = require("../models/Appointment.Model");

const createAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.create(req.body);
    res.status(201).json(appointment);
    if (!appointment) {
      return res.status(400).json({ message: "Failed to create appointment" });
    }
  } catch (error) {
    res.status(500).json({
      message: "error while taking appointment from backend" + error.message,
    });
  }
};
const getAllAppointments = async (req, res) => {
  try {
    const getAppointment = await Appointment.find({});
    if (!getAppointment) {
      return res.status(400).json({ message: "No Appointments found" });
    }
    res.status(200).json(getAppointment);
  } catch (error) {
    res.status(500).json({
      message:
        "error while fetching all Appointments from backend" + error.message,
    });
  }
};

const getAppointmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const appointmentId = await Appointment.findById(id);
    if (!appointmentId) {
      return res.status(400).json({ message: "No Appointments Id found" });
    }
    res.status(201).json(appointmentId);
  } catch (error) {
    res.status(500).json({
      message:
        "error while finding ID of Appointment, from backend" + error.message,
    });
  }
};
const updateAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const update = await Appointment.findByIdAndUpdate(id, req.body);
    if (!update) {
      res
        .status(401)
        .json({ message: "Appointment cannot be updated from backend" });
    }
    res
      .status(201)
      .json({ message: "Appointment updated successfully", data: update });
  } catch (error) {
    res.status(500).json({
      message: "error while updating Appointment from backend" + error.message,
    });
  }
};

const deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteItem = await Appointment.findByIdAndDelete(id);
    if (!deleteItem) {
      res
        .status(401)
        .json({ message: "Appointment cannot be deleted form backend" });
    }
    res.status(201).json({ message: "Appointment Deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting from backend" }, error.message);
  }
};
module.exports = {
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
};
