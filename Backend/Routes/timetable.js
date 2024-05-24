const express = require('express')
const router = express.Router()
const authRole = require("../middleware/authRole")
const ROLE = require('../Models/Role')
const fetchuser = require("../middleware/fetchUser")
const Calendar = require("../Models/Calendar")
const Subject = require("../Models/Subject")
const Teacher = require("../Models/Teacher")


router.get("/:sem/:branchCode", async (req, res) => {
    const { sem, branchCode } = req.params
    try {
        const data = await Calendar.findOne({ sem, branchCode });
        if(!data){
            const newdata = new Calendar({
                sem,branchCode
            })
            await newdata.save()
            res.status(200).json(newdata.timetable)
        }else{
            res.json(data.timetable)
        }
    }
    catch (err) {
        res.json(err)
    }
})

//only admin can change these all routes
router.put("/",fetchuser,authRole(ROLE.ADMIN), async (req, res) => {
    const { sem, branchCode, day, time, subjectCode } = req.body
    try {
        const data = await Calendar.findOne({ sem, branchCode })
        if (data === null) {
            throw "!Not Found"
        } else {
            var tt = data.timetable
            tt[day][time].subjectCode = subjectCode;
            var sub = await Subject.findOneAndUpdate({sem,branchCode,subjectCode},{$inc: {assignedcount: 1}})
            const teacher = await Teacher.findOne({teacherCode:sub.teacherCode})
            teacher.timetable[day][time] = 1;
            await Teacher.findOneAndUpdate({teacherCode:sub.teacherCode},teacher)
            await Calendar.updateOne({ sem, branchCode }, { timetable: tt })
            res.status(200).json("success");
        }
    }
    catch (err) {
        console.error((err));
        res.status(500).json(err)
    }
})

module.exports = router;  