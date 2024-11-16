const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  date: { type: Date, default: () => new Date().setHours(0, 0, 0, 0) },
  checkInTime: { type: Date },
  checkOutTime: { type: Date },
  status: { type: String, enum: ["Present", "Absent"], default: "Absent" },
});

const Attendance = mongoose.model("Attendance", attendanceSchema);
module.exports = Attendance;
