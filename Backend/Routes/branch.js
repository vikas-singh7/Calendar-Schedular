const express = require('express')
const router = express.Router()
const authRole = require("../middleware/authRole")
const ROLE = require('../Models/Role')
const fetchuser = require("../middleware/fetchUser")
const Branch = require("../Models/Branch")


//Branches

//Add new Branch : Login with admin required
router.post('/',fetchuser,authRole(ROLE.ADMIN),async(req,res)=>{
    try {
        const { name ,branchCode} = req.body;
        const branch = new Branch({
            name,branchCode
        });
        const savedBranch = await branch.save();
        res.json(savedBranch);
    } catch (error) {
        return res.status(500).json({ error: error });
    }
})

//No Login Required-=> Fetching all branches
router.get('/',async(req,res)=>{
    try {
        const allBranches = await Branch.find({});
        res.json(allBranches);
    } catch (error) {
        return res.status(500).json({ error: error });
    }
})


module.exports = router;  