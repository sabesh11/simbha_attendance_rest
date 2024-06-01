const express = require('express');
const router = express.Router();
const Employee = require('../modal/Emplyoee');

// Create a new employee
router.post('/addEmployee', async (req, res) => {
  try {
    const employee = new Employee({
        username:req.body.username,
        password:req.body.password
    });
    await employee.save();
    res.status(201).json(employee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
