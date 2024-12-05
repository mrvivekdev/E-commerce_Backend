const express = require('express');
const route = express.Router();

const productImg = require('../services/productImgStorage');
const {HandelProductAdd} = require('../controllers/productControllers');

route.post('/add', productImg.single('ProductImage'), HandelProductAdd);

module.exports = route;