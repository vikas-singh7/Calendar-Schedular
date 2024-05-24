const User = require("../Models/User");

const authRole = (role)=>{
    return async(req,res,next)=>{
        const uid = req.user.id;
        const user = await User.findById(uid)
        if(!user){
            res.status(401)
            return res.send("Please Login Again")
        }
        if(user.role!==role){
            res.status(401)
            return res.send("Role Not Matched")
        }
        next()
    }
    
}

module.exports = authRole