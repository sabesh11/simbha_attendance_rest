const mongoose = require('mongoose');
const attendanceSchema = new mongoose.Schema({
    employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', unique: true, required: true },
    month:{type:String,required:true},
    checkIn:{type:String,required:true},
    checkOut:{type:String,required:true},

},{ timestamps: true })
module.exports = mongoose.model("Attendance",attendanceSchema)