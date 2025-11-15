const bcrypt = require("bcrypt");

const decryptHash = async (plainPassword, hashPassword)=>{
    const isMatch = await bcrypt.compare(plainPassword, hashPassword);
    return isMatch;
} 

module.exports = decryptHash;