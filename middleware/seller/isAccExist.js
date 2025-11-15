const isSigninAccCreated = require("../../functions/isSinginAccCreated");
const doEncrypt = require("../../security/salting/doEncrypt");
const signIn = require("../../zod/sellerZod/signIn");

const isAccExist = async (req,res,next)=>{
    // check the schema first
    const data = signIn.safeParse(req.body);
    if(!data.success){
        return res.status(400).json({
            success: false,
            // errors: data.error.errors,
            });
    }
    // check is account present in the database or not
    const {email,username, phoneNo, password} = data.data;
    // convert the password using built-in module
    const hashPassword = await doEncrypt(password, email);
    const result = await isSigninAccCreated(email, hashPassword, username, phoneNo);
    if(result == 0){
        res.json({
            msg : "Account not created...",
            action : false
        });
        return;
    }
    req.headers.userActionspassword = result[0].password;
    req.headers.userActionsid = result[0]._id;
    next();
}

module.exports = isAccExist;