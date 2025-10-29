const bcrypt = require("bcrypt");

const passHash = async (password)=>{
    const saltround = 10;
    const hashedPassword = bcrypt.hash(password,saltround);
    return hashedPassword;
}


module.exports = passHash;

