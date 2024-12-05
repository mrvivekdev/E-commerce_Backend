const express = require('express');
const route = express.Router();

const {HandelSingup, HandelLogin, HandelOtp, HandelUserUpdate} = require('../controllers/userControllers');

route.post('/singup', HandelSingup);
route.post('/login', HandelLogin);
route.post('/otp', HandelOtp);
route.post('/update', HandelUserUpdate)

module.exports = route;