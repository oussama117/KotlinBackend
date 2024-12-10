const express = require("express");

const {
  addAppointment,
  getAppointmentsByUserId,
  getAppointmentByNameAndUserId,
  updateAppointmentByUserId,
  deleteAppointmentByUserId,
} = require("../controllers/appointmentController");

const router = express.Router();

router.post("/", addAppointment);
router.put("/user/:userId/name/:name", updateAppointmentByUserId);
router.get("/user/:userId", getAppointmentsByUserId);
router.get("/user/:userId/name/:name", getAppointmentByNameAndUserId);
router.delete("/user/:userId/name/:name", deleteAppointmentByUserId);

module.exports = router;
