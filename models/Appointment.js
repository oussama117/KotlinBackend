const mongoose = require("mongoose");

const AppointmentsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    default: "",
  },
  notificationTime: {
    type: String,
    default: "",
  },
});
AppointmentsSchema.pre("save", function (next) {
  this.lastUpdated = Date.now();
  next();
});

module.exports = mongoose.model("Appointments", AppointmentsSchema);
