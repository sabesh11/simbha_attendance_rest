const express = require("express")
const router = express.Router();
const Attendance = require('../modal/Attendance');
const Employee = require('../modal/Emplyoee');

router.post("addAttendance", async (req, res) => {
    try {
        const { employeeId, month, checkIn, checkOut } = req.body;

        // Check if the employee exists
        const employee = await Employee.findById(employeeId);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        // Check if an attendance record already exists for this employee
        const existingAttendance = await Attendance.findOne({ employee: employeeId });
        if (existingAttendance) {
            return res.status(400).json({ message: 'Attendance record already exists for this employee' });
        }

        // Create a new attendance record
        const newAttendance = new Attendance({
            employee: employeeId,
            month,
            checkIn,
            checkOut,
        });

        await newAttendance.save();
        res.status(201).json({ message: 'Attendance record created', data: newAttendance });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Fetch an attendance record by employee ID
router.get('/getAttendanceByEmployee/:employeeId', async (req, res) => {
    try {
        const { employeeId } = req.params;

        const attendance = await Attendance.findOne({ employee: employeeId }).populate('employee');
        if (!attendance) {
            return res.status(404).json({ message: 'Attendance record not found' });
        }

        res.status(200).json({ data: attendance });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

router.post("/addCheckout/:attendanceId",  async (req, res) => {
    try {
        const { attendanceId } = req.params;
        const { checkOut } = req.body;

        // Find the attendance record by ID
        const attendance = await Attendance.findById(attendanceId);
        if (!attendance) {
            return res.status(404).json({ message: 'Attendance record not found' });
        }

        // Update the checkout time
        attendance.checkOut = checkOut;
        await attendance.save();

        res.status(200).json({ message: 'Checkout time updated', data: attendance });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router


