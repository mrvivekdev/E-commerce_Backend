const express = require('express');
const route = express.Router();

const { HandelSearchProduct } = require('../controllers/searchControllers');

route.post("/item", HandelSearchProduct);

module.exports = route;