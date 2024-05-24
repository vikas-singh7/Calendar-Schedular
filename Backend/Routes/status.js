// const express = require('express')
// const router = express.Router()
// const authRole = require("../middleware/authRole")
// const ROLE = require('../Models/Role')
// const fetchuser = require("../middleware/fetchUser")
// const Status = require("../Models/Status")
// const Calendar = require("../Models/Calendar")

// const addDataFromMainCalendar = async(sem,branchCode)=>{
//     const d = new Date()
//         const date = new Date(d.getFullYear(), d.getMonth(), d.getDate())
//     const t = await Calendar.findOne({sem,branchCode})
//     const timetable = t.timetable[d.getDay().toString()]
//     console.log(timetable);
//     const st = new Status({sem,branchCode,date,timetable})
//     st.save()
//     return st
// }

// //rescheduling a class : Login using Faculty/Cr required
// router.put("/",fetchuser, async (req, res) => {
//     const { sem, branchCode, time, subjectCode } = req.body
//     try {
//         const d = new Date()
//         const date = new Date(d.getFullYear(), d.getMonth(), d.getDate())
//         const data = await Status.findOne({ sem, branchCode,d })
//         if (data === null) {
//             data = addDataFromMainCalendar(sem,branchCode,date)
//         } 
//             var tt = data.timetable
//             tt[time].rSubjectCode = subjectCode;
//             await Status.updateOne({ date,sem, branchCode }, { timetable: tt })
//             res.status(200).json("success");
//     }
//     catch (err) {
//         console.log((err));
//         res.status(500).json(err)
//     }
// })

// //Cancel a Class


// //No Login Required-=> Fetching Status
// router.get('/',async(req,res)=>{
//     try {
//         const d = new Date()
//         const date = new Date(d.getFullYear(), d.getMonth(), d.getDate())
//         const {sem,branchCode} = req.body
//         const status = await Status.find({sem,branchCode,date});
//         res.json(status);
//     } catch (error) {
//         return res.status(500).json({ error: error });
//     }
// })


// module.exports = router;  