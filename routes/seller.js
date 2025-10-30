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
    // 2nd -> insert the data in the database with hash passwword
    const userDetails = await sellerModel.create({
        username : req.body.username,
        password : hashedPassword,
        email : req.body.email,
        fullName: req.body.fullName,
        phoneNo : req.body.phoneNo,
        recoveryCode : req.body.recoveryCode,
        address : req.body.address
    });
    // 3rd -> create a jwt token based on the email, phoneNo, passoword, username,
    const jwtToken = jwt.sign({
        hashedPassword : hashedPassword, 
        userID : userDetails._id
    },process.env.JWT_TOKEN,{
        expiresIn : "1h"
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
    // check for the zod schema
    // check if the user already exist middleware in database
    // if then => take the user password and compare with the passowrd inside the token
    // if true => then give "user successfully login" msg 
})
// forget password feature route
router.post("/forgetPassword",(req,res)=>{
    
})



module.exports = router;