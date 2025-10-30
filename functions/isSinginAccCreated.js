const { sellerModel } = require("../database/sellerDb");

const getData = (email,username, phoneNo)=>{
    let getValue;
    let getData;
    if(email.length!=0){
        getData = email;
        getValue = "email";
    }
    else if(username.length != 0){
        getValue = "username";
        getData = username;
    }
    else{
        getData = phoneNo;
        getValue = "phoneNo";
    }
    return {getData, getValue};
}

const isSigninAccCreated = async (email, password, username, phoneNo)=>{
    const {getValue, getDatas} = getData(email, username, phoneNo);
    const result = await sellerModel.find({
        getValue : getDatas,
        password
    });
    if(result.length == 0){
        return 0;
    }
    return 1;

    
}


module.exports = isSigninAccCreated;