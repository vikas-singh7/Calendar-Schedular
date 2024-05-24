const express = require('express')
const app = express()
const cors = require('cors');
const db_connect = require('./database/db_connect')
const schedule = require('node-schedule')
const LiveWeek = require("./Models/LiveWeek");
const Calendar = require('./Models/Calendar');

require('dotenv').config()

app.use(express.json());
app.use(cors())

//Connection with DB
db_connect()

//ALL ROUTES
app.use("/api/auth", require("./Routes/auth"))
app.use("/api/branch", require("./Routes/branch"))
app.use("/api/teacher", require("./Routes/teacher"))
app.use("/api/subject", require("./Routes/subject"))
app.use("/api/timetable", require("./Routes/timetable"))
app.use("/api/liveweek", require("./Routes/liveweek"))


// Sunday Job Scheduling


// const job = schedule.scheduleJob('1 * * * * *',async function(){
//     await LiveWeek.deleteMany({})
//     const allCalendarData = await Calendar.find({})
//     await LiveWeek.insertMany(allCalendarData)
//     console.log("called");
//   });
const change = async () => {

    await LiveWeek.deleteMany({})
    const allCalendarData = await Calendar.find({})
    await LiveWeek.insertMany(allCalendarData)
    console.log("called");
}
// change()
//SERVER CONFIG
app.get("/", (req, res) => {
    res.send("Hello");
})

app.listen(process.env.PORT || 3000, () => {
    console.log(`Backend Server is Up and Running at PORT${process.env.PORT || 3000}`);
})