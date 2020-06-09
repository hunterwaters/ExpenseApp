const express = require('express');
const router = express.Router();
const { logoutUser  } = require('../controllers/logout');


router
.route('/')
.get(logoutUser)


module.exports = router;