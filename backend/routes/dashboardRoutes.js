const express = require('express');
const Attendance = require('../models/attendanceSchema');
const User = require('../models/userSchema');
const router = express.Router();

router.get('/dashboard', async (req, res) => {
  try {
    const present = await Attendance.countDocuments({ status: 'Present' });
    const abscent = await Attendance.countDocuments({ status: 'Abscent' });
    const activeUsers = await User.countDocuments(); // Assuming all users are active

    res.json({
      activeUsers,
      present,
      abscent
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching dashboard data' });
  }
});

module.exports = router;