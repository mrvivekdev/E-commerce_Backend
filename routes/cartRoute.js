const express = require('express');
const route = express.Router();

const {HandelCartAdding} = require('../controllers/cartControllers');

route.post('/cartadd', HandelCartAdding);

module.exports = route;