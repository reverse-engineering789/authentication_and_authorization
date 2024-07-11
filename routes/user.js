
const express = require("express");

const router = express.Router();
const User = require('../models/User');

const {login, signup} = require("../controllers/Auth");
const {auth, isStudent, isAdmin} = require("../middlewares/auth");
 
// router.post("/login", login);
router.post("/login", login);
router.post("/signup", signup);



// testing protected routes for single middleware

router.get("/test", auth, (req, res) => {
    res.json({
        success: true,
        message: 'Welcome to the protected route for tests'
    });
});


// protected route 
router.get("/student", auth, isStudent, (req, res) => {
    res.json({
        success: true,
        message: 'Welcome to the protected route for students',
    });
});

router.get("/admin", auth, isAdmin, (req, res) => {
    res.json({
        success: true,
        message: "welcome to the protected route for admin"
    });
});

router.get("/getEmail", auth, async (req, res) => {
    try{
        const id = req.user.id;
        console.log("ID:" , id);
        const user = await User.findOne({id});

        res.status(200).json({
            success: true,
            user: user, 
            message: "Welcome to the email route",
        })
    }catch(error){
        res.status(500).json({
            success: false,
            error: error.message,
            message: 'The code is not working',
        })
    }
});


module.exports = router;