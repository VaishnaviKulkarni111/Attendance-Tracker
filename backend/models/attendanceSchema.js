// models/Attendance.js
const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: Date,
    default: () => new Date().setHours(0, 0, 0, 0), // Default to midnight of the current day
    required: true,
  },
  checkInTime: {
    type: Date,
    default: null,
  },
  checkOutTime: {
    type: Date,
    default: null,
  },
  status: {
    type: String,
    enum: ['Present', 'Absent'],
    default: 'Absent', // Default to "Absent" initially, will change to "Present" upon check-in
  },
});

const Attendance = mongoose.model('Attendance', attendanceSchema);
module.exports = Attendance;
