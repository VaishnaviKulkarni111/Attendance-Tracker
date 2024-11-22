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
    const decoded =  jwt.verify(token, JWT_SECRET);
    console.log("decoded in verifytoken", decoded)
    return decoded
  } catch (error) {
    return null;
  }
};

// Route: Check-In
router.post('/checkin', async (req, res) => {
  const decoded = verifyToken(req);  // Decode the JWT token to get user info
  if (!decoded) return res.status(401).json({ message: 'Unauthorized' });

  const employeeId = decoded.id; 
  try {
    const today = new Date().setHours(0, 0, 0, 0);  // Reset to midnight to compare dates
    let attendance = await Attendance.findOne({ employeeId, date: today });

    if (!attendance) {
      attendance = new Attendance({ employeeId, date: today }); // Ensure employeeId is saved
    }

    if (attendance.checkInTime) {
      return res.status(400).json({ message: 'Already checked in for today.' });
    }

    attendance.checkInTime = new Date();  // Set the check-in time
    attendance.status = 'Present';  // Set status
    await attendance.save();

    res.json({
      message: 'Check-in successful',
      checkInTime: attendance.checkInTime,  // Return checkInTime to frontend
    });
  } catch (error) {
    console.error("Error in check-in:", error);  // Log the error for debugging
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

router.get('/manager/:employeeId', async (req, res) => {
  const decoded = verifyToken(req);
  console.log("decoded in manager route",decoded)
  if (!decoded || decoded.userType !== 'manager') {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { employeeId } = req.params;
  console.log("employee ID searched by manager",employeeId)
  try {
    const attendanceData = await Attendance.find({ employeeId }).sort({ date: -1 });
    res.json(attendanceData);
  } catch (error) {
    console.error("Error fetching attendance data:", error);
    res.status(500).json({ error: 'Server error' });
  }
});


router.get('/employee/:id', async (req, res) => {
  // Decode the token to identify the employee
  const decoded = verifyToken(req);
  console.log("Decoded token for employee:", decoded);

  if (!decoded || decoded.userType !== 'employee') {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const employeeId = decoded.id; // Use 'id' instead of '_id'
  console.log("Employee ID from token:", employeeId);

  try {
    const attendanceData = await Attendance.find({ employeeId }).sort({ date: -1 });
    if (!attendanceData || attendanceData.length === 0) {
      return res.status(404).json({ message: 'No attendance records found' });
    }
    res.status(200).json({ attendance: attendanceData });
  } catch (error) {
    console.error("Error fetching employee attendance data:", error);
    res.status(500).json({ error: 'Server error' });
  }
});




module.exports = router;