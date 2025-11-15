const { sellerModel } = require("../database/sellerDb");

const getData = (email,username, phoneNo)=>{
    let getValue;
    let getDatas;
    if(email.length!=0){
        getDatas = email;
        getValue = "email";
    }
    else if(username.length != 0){
        getValue = "username";
        getDatas = username;
    }
    else{
        getDatas = phoneNo;
        getValue = "phoneNo";
    }
    return {getDatas, getValue};
}

const isSigninAccCreated = async (email, password, username, phoneNo)=>{
    const {getValue, getDatas} = getData(email, username, phoneNo);
    const result = await sellerModel.find({
        [getValue] : getDatas,
        password
    });
    if(result.length == 0){
        return 0;
    }
    return result;
    
}


module.exports = isSigninAccCreated;