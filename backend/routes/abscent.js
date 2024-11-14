
const Attendance = require("../models/attendanceSchema");

const markAbsentees = async () => {
  const cutoffTime = new Date();
  cutoffTime.setHours(10, 0, 0, 0); // Set to 10:00 AM

  const today = new Date().setHours(0, 0, 0, 0);

  try {
    const absentees = await Attendance.updateMany(
      { date: today, checkInTime: null },
      { $set: { status: 'Absent' } }
    );
    console.log(`${absentees.modifiedCount} employees marked as absent.`);
  } catch (error) {
    console.error('Error marking absentees:', error);
  }
};

module.exports = markAbsentees;
