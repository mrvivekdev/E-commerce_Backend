const bcrypt = require('bcrypt');
const SaltRoundHash = 10;

const UserModel = require('../models/userModel');
const OtpSender = require('../services/otpMailSender');
const {jwtSign} = require('../services/authCookie');

function generateOTP() {
    const otp = Math.floor(1000 + Math.random() * 9000); 
    return otp;
}

let otpNumber = "";

async function HandelSingup(req, res){
    const {fullname, email, password, phonenumber} = req.body;
    if(!fullname || !email || !password || !phonenumber){ 
        return console.log('Filed Missing') 
    }

    try {
        const hashPassword = await bcrypt.hash(password, SaltRoundHash);
        if(!hashPassword){
            return console.log('Password Hasing problem');
        }

        await UserModel.create({
            Fullname: fullname,
            Email: email,
            Password: hashPassword,
            Phonenumber: phonenumber
        });

        const frontPayload = {
            transport: 'LoginPage',
        };
        return res.json(frontPayload);

    } catch (error) {
        const frontPayload = {
            error: 'ServerError',
            errorMsg: error,
        };
        console.log('Error Singup Handler:', error);
        return res.json(frontPayload);
    }
}

async function HandelLogin(req, res){
    const {email, password} = req.body;
    if(!email || !password){ 
        return console.log('Filed Missing') 
    }

    try {
        const checkEmail = await UserModel.findOne({ Email: email });
        if(!checkEmail){
            return console.log('Email is WRONG!'); 
        }
        
        const checkHashPassword = await bcrypt.compare(password, checkEmail.Password);
        if(!checkHashPassword){
            return console.log('Password is WRONG!'); 
        }

        const otpCode = generateOTP();
        otpNumber = otpCode;
        console.log(otpNumber);
        const token = jwtSign(checkEmail);
        OtpSender(otpNumber, checkEmail.Email);

        const frontPayload = {
            transport: 'OtpPage',
            cookie: token,
        };
        return res.json(frontPayload);

    } catch (error) {
        const frontPayload = {
            error: 'ServerError',
            errorMsg: error,
        };
        console.log('Error Login Handler:', error);
        return res.json(frontPayload);
    }
}

async function HandelOtp(req, res){ 
    const {otp} = req.body;
    if(!otp){
        return console.log('Otp not filed'); 
    }

    try {
        const frontPayload = {
            transport: 'HomePage',
            user: req.user,   
        }

        if(otp==otpNumber){
            return res.json(frontPayload);
        }

    } catch (error) {
        const frontPayload = {
            error: 'ServerError',
            errorMsg: error,
        };
        console.log('Error Otp Handler:', error);
        return res.json(frontPayload);
    }
}

async function HandelUserUpdate(req, res){
    const { 
            fullname, 
            phonenumber, 
            address, 
            pincodeNumber, 
            city, 
            landmark, 
            houseNumber, 
            street
        } = req.body;

    if(fullname){   
        await UserModel.findByIdAndUpdate(req.user._id, { $set: { Fullname: fullname}})
    }
    if(phonenumber){
        await UserModel.findByIdAndUpdate(req.user._id, { $set: { Phonenumber: phonenumber }})
    }   

    // Delivery info data update
    if(address){
        await UserModel.findByIdAndUpdate(req.user._id, { $set: { Address: address }})
    }
    if(pincodeNumber){
        await UserModel.findByIdAndUpdate(req.user._id, { $set: { Pincode: pincodeNumber }})
    }
    if(city){
        await UserModel.findByIdAndUpdate(req.user._id, { $set: { City: city }})
    }
    if(street){
        await UserModel.findByIdAndUpdate(req.user._id, { $set: { Street: street }})
    }
    if(houseNumber){
        await UserModel.findByIdAndUpdate(req.user._id, { $set: { HomeNumber: houseNumber }})
    }
    if(landmark){
        await UserModel.findByIdAndUpdate(req.user._id, { $set: { Landmark: landmark }})
    }

    const findUser = await UserModel.findOne({_id: req.user._id});
    const token = jwtSign(findUser);

    const payload = {
        user: req.user,
        cookie: token,
        message: "success",
    }

    return res.json(payload);
}

module.exports = {
    HandelSingup,
    HandelLogin,
    HandelOtp,
    HandelUserUpdate
}