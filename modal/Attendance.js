const mongoose = require('mongoose');
const attendanceSchema = new mongoose.Schema({
    employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee',  required: true },
    month: { type: String, required: true },
    date:{type:String,required:true},
    checkIn: { type: String, required: true },
    checkOut: { type: String,default: null },
}, { timestamps: true });

attendanceSchema.index({ employee: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('Attendance', attendanceSchema);
