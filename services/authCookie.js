const jwt = require('jsonwebtoken');

function jwtSign(user){
    if(!user){
        return null;
    }

    const payload = {
        _id: user._id,
        fullname: user.Fullname,
        email: user.Email,
        phonenumber: user.Phonenumber,
        address: user.Address,
        pincodeNumber: user.Pincode,
        city: user.City,
        landmark: user.Landmark,
        houseNumber: user.HomeNumber,
        street: user.Street    
    }

    try {
        const cookieSign = jwt.sign(payload, process.env.JWT_KEY);
        if(!cookieSign){
            return null;
        }
        return cookieSign;

    } catch (error) {
        console.log('JWT Sign error: ', error);
        const errorMsg = "jwtSignError"
        return errorMsg;
    }
}

function jwtVerify(token){
    if(!token){
        return null;
    }

    try {
        const cookieVerify = jwt.verify(token, process.env.JWT_KEY);
        if(!cookieVerify){
            return null;
        }
        return cookieVerify;

    } catch (error) {
        console.log('JWT Verify error: ', error);
        const errorMsg = "jwtVerifyError"
        return errorMsg;
    }
}

module.exports = {
    jwtSign,
    jwtVerify
}