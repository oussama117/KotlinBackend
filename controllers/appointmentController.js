const Appointment = require("../models/Appointment");

const staticUserId = "64fef678e1b2ec4f112d4f89";

const addAppointment = async (req, res) => {
  const { userId, name, description, notificationTime } = req.body;

  try {
    const newAppointment = new Appointment({
      userId: staticUserId,
      name,
      description,
      notificationTime,
    });
    await newAppointment.save();
    res.status(201).json(newAppointment);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add appointment", error: error.message });
  }
};

const getAppointmentsByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const appointment = await Appointment.find({ userId });

    if (!appointment.length) {
      return res
        .status(404)
        .json({ message: "No appointments found for this user" });
    }

    res.json(appointment);
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve appointment",
      error: error.message,
    });
  }
};

const getAppointmentByNameAndUserId = async (req, res) => {
  const { userId, name } = req.params;

  try {
    const appointment = await Appointment.findOne({ userId, name });
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.json(appointment);
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve appointment",
      error: error.message,
    });
  }
};

const updateAppointmentByUserId = async (req, res) => {
  const { userId, name } = req.params;
  const { description, notificationTime } = req.body;

  try {
    const updatedAppointment = await Appointment.findOneAndUpdate(
      { userId, name },
      { description, notificationTime, lastUpdated: Date.now() },
      { new: true }
    );

    if (!updatedAppointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.json(updatedAppointment);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update appointment", error: error.message });
  }
};

const deleteAppointmentByUserId = async (req, res) => {
  const { userId, name } = req.params;
  try {
    const appointment = await Appointment.findOneAndDelete({ userId, name });

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.json({ message: "Appointment deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete appointment", error: error.message });
  }
};

module.exports = {
  addAppointment,
  getAppointmentsByUserId,
  getAppointmentByNameAndUserId,
  updateAppointmentByUserId,
  deleteAppointmentByUserId,
};
