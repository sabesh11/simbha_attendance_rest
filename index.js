const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose');
const cors =require("cors")
// const scheduleTasks = require('./scheduledTasks');

app.listen(port,()=>{console.log("server is running"+port);})

const MONGODB_URL ="mongodb://127.0.0.1:27017/attendance"

mongoose.connect(MONGODB_URL)
.then(()=>{
    console.log("Connection successful"  + MONGODB_URL);
})
.catch((err)=>{
console.error("error in connecting",err.message);
})

app.use(express.json());


app.use(cors(
    {
        origin:"*"
    }
))

const EmplyoeeRouter = require('./controller/EmplyoeeController')
const AttendanceRouter = require('./controller/AttendenceController')
const ItemController = require("./controller/ItemController")

app.use('/emplyoee',EmplyoeeRouter)
app.use("/attendance",AttendanceRouter)
app.use("/item",ItemController)

// scheduleTasks(); 
