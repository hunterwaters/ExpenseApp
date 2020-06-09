const express = require('express');
const router = express.Router();
const { signupUser } = require('../controllers/signin');
//const auth = require('../middleware/auth')

router
.route('/')
.post(signupUser)


module.exports = router;
