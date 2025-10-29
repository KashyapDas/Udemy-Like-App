const express = require("express");
const jwt = require("jsonwebtoken");
const passHash = require("../security/bcrypt/passHash");
const { sellerModel } = require("../database/sellerDb");
const isAccCreated = require("../middleware/seller/isAccCreated");

const router = express.Router();

// account created if the user isn't exist 
router.post("/signup",isAccCreated,async (req,res)=>{
    // means data is valid and acc not present in database
    const {email, phoneNo, username, password, } = req.body;
    // 1st -> Use Bcrypt and hash the passoword
    const hashedPassword = await passHash(password);
    // 2nd -> create a jwt token based on the email, phoneNo, passoword, username,
    const jwtIdentifier = email || username || phoneNo;
    const jwtToken = jwt.sign({
        hashedPassword, 
        jwtIdentifier
    },process.env.JWT_TOKEN,{
        expiresIn : "1h"
    });
    // 3rd -> insert the data in the database with hash passwword
    await sellerModel.create({
    username : req.body.username,
    password : "kashyap123@",
    email : "kashyapdas2234@gmail.com",
    fullName: "Kashyap Jyoti Das",
    phoneNo : 8876829466,
    recoveryCode : 8172,
    address : {
        country : "India",
        state : "Assam",
        city : "Guwahati",
        street : "AEC Road"  
    }
});
    // 4th -> set the jwt token in the cokkie 
    res.cookie("token", jwtToken, {
        httpOnly: true,      // JS cannot read
        secure: true,        // only HTTPS in production
        sameSite: "strict",  // prevent CSRF
        maxAge: 60 * 60 * 1000 // 1 hour
    });
    // send the final response to the client 
    res.json({
        action : true,
        msg : "Account created successfully..."
    });
})
// account get the permission if it is already created
router.post("/signin",(req,res)=>{

})
// forget password feature route
router.post("/forgetPassword",(req,res)=>{
    
})



module.exports = router;