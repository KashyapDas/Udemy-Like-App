const zod = require("zod");

const addressSchemaZod = zod.object({
    country : zod.string(),
    state : zod.string(),
    city : zod.string(),
    street : zod.string().optional(),  
}); 

const accountSchemaZod = zod.object({
    username : zod.string(),
    email : zod.string(),
    password : zod.string(),
    fullName : zod.string(),
    phoneNo : zod.number(),
    address : addressSchemaZod,
    recoveryCode: zod.number(),
});



module.exports = accountSchemaZod;