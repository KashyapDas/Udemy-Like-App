const express = require("express");
const jwt = require("jsonwebtoken");
const passHash = require("../security/bcrypt/passHash");
const { sellerModel } = require("../database/sellerDb");
const isAccCreated = require("../middleware/seller/isAccCreated");
const doEncrypt = require("../security/salting/doEncrypt");
const isAccExist = require("../middleware/seller/isAccExist");
const cookieParser = require("cookie-parser");
const checkEmailOrPassword = require("../functions/checkEmailOrPassword");
const sendMail = require("../functions/sendMail");

const router = express.Router();

router.use(cookieParser());

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
router.post("/signin",isAccExist,async (req,res)=>{
    // check for the zod schema and then check the account existance in the database using middleware
    // if acc exist then create a jwt token using that password and email/username/phoneNO
    // create a bcrypt password and store it in jwt and send it to the cookies.
    const bcryptPassword = await passHash(req.body.password);
    const createToken = jwt.sign({
        hashedPassword : bcryptPassword, 
        userID : req.headers.userActionsid
    },process.env.JWT_TOKEN,{
        expiresIn : "1h"
    });
    // Also check what user send - email, username, PhoneNo using a function that return an objects 
    res.cookie("token", createToken, {
        httpOnly: true,      // JS cannot read
        secure: true,        // only HTTPS in production
        sameSite: "strict",  // prevent CSRF
        maxAge: 60 * 60 * 1000 // 1 hour
    });
    // Now store that token in the cookie  
    res.json({
        msg : "signIn successfull",
        action : true
    });
    // if true => then give "user successfully login" msg 
})
// forget password feature route
router.post("/otpsent",async (req,res)=>{
        // take the email or phoneNo as the user input
        const userDataComes = checkEmailOrPassword(req.body.email, req.body.phoneNo);
        const findUserByEmail = await sellerModel.find({
            [userDataComes.dataKey] : userDataComes.dataVal
        });

        if(!findUserByEmail)
        {
            return res.json({
                msg : "Account not exists...",
                action : false
            });
        }
        // generate an otp here
        let otp = "";
        for(let i=0; i<=3; i++)
        {
            otp+= Math.round(Math.random()*10);
        }
        // check what user enter -> email or password
        if(userDataComes.dataKey == 'email')
        {
            // send otp to the email
            try{
                await sendMail(userDataComes.dataVal,otp);
            }catch(err)
            {
                return res.json("Something went wrong...Try again later...");
            }
        }
        else if(userDataComes.dataKey == 'phoneNo')
        {
            // send otp to the phone no
        }
        
    res.json({
        msg : "OTP sent successfully...",
        action : true,
        fieldValue : userDataComes.dataVal,  // sent email or phoneNo
        originalOtp : otp,
        userId : findUserByEmail[0]._id   // send the original otp
    });
})

router.post("/verifyotp",(req,res)=>{
    // we need the otp generate in the backend and the otp user enter
    const frontendOTP = req.headers.otp;
    const email = req.body.email;
    const userId = req.body.userId;
    
    // req.headers.orginalOTP  original otp
    if(frontendOTP != req.body.originalOTP)
    {
        return res.json({
            msg : "Invalid otp...",
            action : false
        });
    }

    res.json({
        msg : "otp verify successfully...",
        action : true,
        email : email,
        userId : userId
    });
})

router.post("/updatePassword",async (req,res)=>{
    // take the new password and create one built-in hash and bcrypt hash
    const email = req.body.email;
    const newPassword = req.body.newPassword;
    const userId = req.body.userId;


    const builtHash = await doEncrypt(newPassword, email)
    // we need the email and then update the password to newPassoword
    const updateResult = await sellerModel.updateOne({
        email : email
    },{
        password : builtHash
    });
    if(!updateResult)
    {
        return res.json({
            msg : "Something went wrong...Try again later...",
            action : false
        });
    }
    const hashedPassword = await passHash(newPassword);
    const jwtToken = jwt.sign({
        hashedPassword : hashedPassword, 
        userID : userId
    },process.env.JWT_TOKEN,{
        expiresIn : "1h"
    });
    res.cookie("token", jwtToken, {
        httpOnly: true,      // JS cannot read
        secure: true,        // only HTTPS in production
        sameSite: "strict",  // prevent CSRF
        maxAge: 60 * 60 * 1000 // 1 hour
    });
    
    res.json({
        msg : "Password Update Successfully...",
        action : true
    });
})




module.exports = router;