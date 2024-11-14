// routes/attendance.js
const express = require('express');
const jwt = require('jsonwebtoken');
const Attendance = require('../models/attendanceSchema');
const router = express.Router();

const JWT_SECRET = "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";

// Helper function for JWT verification
const verifyToken = (req) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return null;

  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};

// Route: Check-In
router.post('/checkin', async (req, res) => {
  const decoded = verifyToken(req);
  if (!decoded) return res.status(401).json({ message: 'Unauthorized' });

  const employeeId = decoded.id;
  try {
    const today = new Date().setHours(0, 0, 0, 0);
    let attendance = await Attendance.findOne({ employeeId, date: today });

    if (!attendance) {
      attendance = new Attendance({ employeeId });
    }

    if (attendance.checkInTime) {
      return res.status(400).json({ message: 'Already checked in for today.' });
    }

    attendance.checkInTime = new Date();
    attendance.status = 'Present';
    await attendance.save();

    res.json({ message: 'Check-in successful', checkInTime: attendance.checkInTime });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Route: Check-Out
router.post('/checkout', async (req, res) => {
  const decoded = verifyToken(req);
  if (!decoded) return res.status(401).json({ message: 'Unauthorized' });

  const employeeId = decoded.id;
  try {
    const today = new Date().setHours(0, 0, 0, 0);
    const attendance = await Attendance.findOne({ employeeId, date: today });

    if (!attendance || !attendance.checkInTime) {
      return res.status(400).json({ message: 'Check-in required before check-out.' });
    }

    if (attendance.checkOutTime) {
      return res.status(400).json({ message: 'Already checked out for today.' });
    }

    attendance.checkOutTime = new Date();
    await attendance.save();

    res.json({ message: 'Check-out successful', checkOutTime: attendance.checkOutTime });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Route: View Attendance History
router.get('/history/:employeeId', async (req, res) => {
  const decoded = verifyToken(req);
  if (!decoded) return res.status(401).json({ message: 'Unauthorized' });

  const { employeeId } = req.params;
  try {
    const history = await Attendance.find({ employeeId }).sort({ date: -1 });
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
