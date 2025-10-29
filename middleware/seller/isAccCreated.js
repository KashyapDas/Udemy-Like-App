const isSignupAccCreated = require("../../functions/isSignupAccCreated");
const accountSchemaZod = require("../../zod/sellerZod/accountSchema");

const isAccCreated = async (req,res,next)=>{
    // 1st check the schema 
    const zodResult = accountSchemaZod.safeParse(req.body);
    if(!zodResult.success){
        console.log(zodResult.error);
        res.status(401).json({
            action : false,
            msg : "Invalild Input"
        });
        return;
    }
    // 2nd check the acc on the database
    const isUserExist = await isSignupAccCreated(zodResult.data);
    if(isUserExist === 0){
        res.json({
            action : false,
            msg : "Account already exist...."
        });
        return;
    }
    // means data are valid and acc not created -> call next()
    next();
}


module.exports = isAccCreated;