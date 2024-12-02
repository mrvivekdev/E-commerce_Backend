const express = require('express');
const route = express.Router();

const {HandelServeHomepage} = require('../controllers/homepageControllers');

route.post('/serve', HandelServeHomepage);

module.exports = route;