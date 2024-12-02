const express = require('express');
const route = express.Router();

const {HandelSingup, HandelLogin, HandelOtp} = require('../controllers/userControllers');

route.post('/singup', HandelSingup);
route.post('/login', HandelLogin);
route.post('/otp', HandelOtp);

module.exports = route;