const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator');  //for validation
const bcrypt = require("bcryptjs")
const User = require("../Models/User");
const jwt = require('jsonwebtoken')

const authRole = require("../middleware/authRole")
const ROLE = require('../Models/Role')
const fetchuser = require("../middleware/fetchUser")

const JWT_SECRET = "Samkitjain";

//Route 1:Creating a user at /api/auth/createuser : No Login required

router.post("/createuser", [
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Password Must be atleast 5 Characters").isLength({ min: 5 })
], async (req, res) => {

    const errors = validationResult(req); //from express-validator 
    let success=false;
    // if there are erros return bad request 400
    if (!errors.isEmpty()) {
        return res.status(400).json({ success,errors: errors.array() });
    }

    try {
        //Check Whether the user with that email already exists
        let user = await User.findOne({ email: req.body.email });

        if (user) {
            return res.status(400).json({success, error: "User Exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const securePwd = await bcrypt.hash(req.body.password, salt);

        // Create User
        user = await User.create({
            email: req.body.email,
            password: securePwd
        })

        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({success,authToken,role:user.role});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error!");
    }

})

//Route 2: Authentication of a user at /api/auth/login  No Login required
router.post("/login", [
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Password Cannot be empty").exists(),
], async (req, res) => {
    let success = false;
    const errors = validationResult(req); //from express-validator
    // if there are erros return bad request 400
    if (!errors.isEmpty()) {
        return res.status(400).json({ success,errors: errors.array() });
    }
    //validation Completed

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success,"error": "Please login with correct credentials" });
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ success,"error": "Please login with correct credentials" });
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({success, authToken ,role:user.role })

    } catch (error) {
        console.error(error.message);
        res.status(500).json({success,"msg":"Internal Server Error!"});
    }

})

//Assign Roles for other user  : Login requird with admin role
router.put("/assignrole",fetchuser,authRole(ROLE.ADMIN),async(req,res)=>{
    var success = "false"
    const {userId,role} = req.body
    console.log(req.body)
    try{
    await User.findByIdAndUpdate(userId,{role : role})
    success = true
    res.status(200).json({success,"msg" : `${role} Role assigned to ${userId}`})
    }
    catch(err){
        res.status(500).send(err)
    }
})

//Fetch all Users : Login requird with admin role

// add fetchuser,authRole(ROLE.ADMIN) to enable logged in 
router.get("/getusers",async(req,res)=>{
    try{
        const allusers = await User.find().select("-password")
        success = true
        res.status(200).json(allusers)
        }
        catch(err){
            res.status(500).send(err)
        }
})

//Route 3: get loggedin user Details using  /api/auth/getuser : Login required

router.get("/getuser",fetchuser, async (req, res) => {
    try {
        const userid = req.user.id;
        const user = await User.findById(userid).select("-password");
        res.json(user);
    } catch (error) {
        return res.status(500).send("internal server error!");
    }
})
module.exports = router;