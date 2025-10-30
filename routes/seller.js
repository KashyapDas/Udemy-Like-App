const express = require("express");
const jwt = require("jsonwebtoken");
const passHash = require("../security/bcrypt/passHash");
const { sellerModel } = require("../database/sellerDb");
const isAccCreated = require("../middleware/seller/isAccCreated");
const doEncrypt = require("../security/salting/doEncrypt");
const signIn = require("../zod/sellerZod/signIn");
const isAccExist = require("../middleware/seller/isAccExist");

const router = express.Router();

// account created if the user isn't exist 
router.post("/signup",isAccCreated,async (req,res)=>{
    // means data is valid and acc not present in database
    const {email, phoneNo, username, password, fullName, recoveryCode} = req.body;
    // 1st -> Use Bcrypt and hash the passoword
    const hashedPassword = await passHash(password);
    // 2nd => call the built-in salting module and hash the password that I want to store
    const builtSaltiHash = await doEncrypt(password, email);
    // 3rd -> insert the data in the database with hash passwword
    const userDetails = await sellerModel.create({
        username : username,
        password : builtSaltiHash,
        email : email,
        fullName: fullName,
        phoneNo : phoneNo,
        recoveryCode : recoveryCode,
        address : req.body.address
    });
    // 4th -> create a jwt token based on the email, phoneNo, passoword, username,
    const jwtToken = jwt.sign({
        hashedPassword : hashedPassword, 
        userID : userDetails._id
    },process.env.JWT_TOKEN,{
        expiresIn : "1h"
    });
    // 5th -> set the jwt token in the cokkie 
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
router.post("/signin",isAccExist,(req,res)=>{
    // if then => take the user password and compare with the passowrd inside the token
    // get the token from the cookie and then decrypt the token and get the password and then create the hashPassword of the DB using the built-in module 
    // const token = req.cookies.token;
    // console.log(decodedPassword);
    res.json({
        msg : "Hello from signIn"
    })
    // if true => then give "user successfully login" msg 
})
// forget password feature route
router.post("/forgetPassword",(req,res)=>{
    
})



module.exports = router;