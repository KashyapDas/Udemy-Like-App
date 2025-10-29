const zod = require("zod");

const courseSchemaZod = zod.object({
    c_name : zod.string(),
    c_desc : zod.string(),
    c_img : imageSchemaZod,
    c_price : zod.string(),
    c_duration : zod.string(),
    c_validity : zod.string(),
})


const imageSchemaZod = zod.object({
    filename : zod.string(),
    mimetype : zod.string(),
    data : zod.instanceof(Buffer)
});


module.exports = courseSchemaZod;