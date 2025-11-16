const checkEmailOrPassword = (email, phoneNo)=>{
    if(email!=undefined){
        return {dataVal : email , dataKey : "email"};
    }
    return {dataVal : phoneNo , dataKey : "phoneNo"};
}

module.exports = checkEmailOrPassword;