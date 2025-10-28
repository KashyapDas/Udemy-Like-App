const mongoose = require("mongoose");
const { Schema } = require("zod");

// designing the schema 
const sellerAccSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    fullName : {
        type : String,
        required: true
    },
    phoneNo : {
        type : Number,
        required : true
    },
    recoveryCode : {
        type : Number,
        required : true
    },
    address : {
        type : addressSchemaSeller,
        required : true
    }
})
// desing of sub-schema Address
const addressSchemaSeller = new mongoose.Schema({
    country : {
        type : String,
        required : true
    },
    sate : {
        type : String,
        required : true
    },
    city : {
        type : String,
        required : true
    },
    street : {
        type : String, // value is "optional" 
    }
})

const courseSchema = new mongoose.Schema({
    c_name : {
        type : String,
        required : true
    },
    c_desc : {
        type : String,
        required : true
    },
    c_img : {
        type : c_imgSchema,
        required : true
    },
    c_price : {
        type : String,
        required : true
    },
    c_duration : {
        type : String,
        required : true
    },
    c_validity : {
        type : String,
        required : true
    }
})
// schema for images
const c_imgSchema = new mongoose.Schema({
    filename : String,
    mimetype : String,
    data : Buffer
});

// design the model
const sellerModel = new mongoose.model("sellertable",sellerAccSchema);
const courseModel = new mongoose.model("coursetable",courseSchema);

module.exports = {
    sellerModel,
    courseModel
};