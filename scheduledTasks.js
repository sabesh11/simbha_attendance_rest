// scheduledTasks.js
const cron = require('node-cron');
const Attendance = require('./modal/Attendance');

const scheduleTasks = () => {
    // Schedule job to run at 23:59 every day
    cron.schedule('59 23 * * *', async () => {
        try {
            const today = new Date();
            const startOfDay = new Date(today.setHours(0, 0, 0, 0));
            const endOfDay = new Date(today.setHours(23, 59, 59, 999));

            // Find all attendance records for today without checkout time
            const attendances = await Attendance.find({
                checkIn: { $gte: startOfDay, $lt: endOfDay },
                checkOut: null
            });

            // Update each record to set checkout as "N/A"
            await Promise.all(attendances.map(async (attendance) => {
                attendance.checkOut = 'N/A';
                await attendance.save();
            }));

            console.log('Updated missing checkouts to N/A');
        } catch (error) {
            console.error('Error updating checkouts:', error);
        }
    });
};

module.exports = scheduleTasks;
