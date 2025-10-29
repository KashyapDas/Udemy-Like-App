const { sellerModel } = require("../database/sellerDb")
const passHash = require("../security/bcrypt/passHash");

const isSignupAccCreated = async (data)=>{;
    // Search on the database
    const result = await sellerModel.find({
        email : data.email,
        phoneNo : data.phoneNo,
        username : data.username
    });
    if(result.length == 0){
        return 1;
    }
    return 0;
}

module.exports = isSignupAccCreated;