const express = require('express')
const router = express.Router()
const authRole = require("../middleware/authRole")
const ROLE = require('../Models/Role')
const fetchuser = require("../middleware/fetchUser")
const Teacher = require("../Models/Teacher")

//Teachers
router.post('/',fetchuser,authRole(ROLE.ADMIN),async(req,res)=>{
    try {
        const { name,teacherCode } = req.body;
        const teacher = new Teacher({
            name,teacherCode
        });
        const savedTeacher = await teacher.save();
        res.status(200).json(savedTeacher);
    } catch (error) {
        return res.status(500).json({ error: error });
    }
})

router.get('/',async(req,res)=>{
    try {
        const allTeachers = await Teacher.find({});
        res.json(allTeachers);
    } catch (error) {
        return res.status(500).json({ error: error });
    }
})

router.get('/isclass/:teacherCode/:day/:time',async(req,res)=>{
    const {teacherCode,day,time} = req.params;
    try {
        const teacher = await Teacher.findOne({teacherCode});
        res.status(200).json({isClass : teacher.timetable[day][time]})
    } catch (error) {
        return res.status(500).json({ error: error });
    }
})




module.exports = router;  