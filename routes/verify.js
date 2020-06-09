const express = require('express');
const router = express.Router();
const { verifyUser  } = require('../controllers/verify');


router
.route('/')
.get(verifyUser)


module.exports = router;