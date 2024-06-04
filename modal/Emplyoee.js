const mongoose = require('mongoose');
const employeeSchema = new mongoose.Schema({
    username: { type: String,  required: true },
    password: { type: String, required: true },
    attendance: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Attendance' }]

}, { timestamps: true });

module.exports = mongoose.model('Employee', employeeSchema);
