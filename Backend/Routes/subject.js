const express = require('express')
const router = express.Router()
const authRole = require("../middleware/authRole")
const ROLE = require('../Models/Role')
const fetchuser = require("../middleware/fetchUser")
const Subject = require("../Models/Subject")


//Subjects
router.post('/', fetchuser, authRole(ROLE.ADMIN), async (req, res) => {
    try {
        const { sem, branchCode, subjectCode,name, teacherName, teacherCode } = req.body;
        const newSub = new Subject({sem,branchCode,subjectCode,name,teacherCode,teacherName});
        await newSub.save();
        res.status(200).json("success");

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error });
    }
})

router.get('/:sem/:branchcode', async (req, res) => {
    try {
        var allSubjects = await Subject.find({ branchCode: req.params.branchcode, sem: req.params.sem });
        res.json(allSubjects);
    } catch (error) {
        return res.status(500).json({ error: error });
    }
})


router.get('/:subjectCode', async (req, res) => {
    try {
        var subject = await Subject.findOne({ subjectCode : req.params.subjectCode });
        res.json(subject);
    } catch (error) {
        return res.status(500).json({ error: error });
    }
})


module.exports = router;  