const mongoose = require("mongoose");

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
        type : String,
    }
})

// design the model
const sellerModel = new mongoose.model("sellertable",sellerAccSchema);

module.exports = sellerModel;