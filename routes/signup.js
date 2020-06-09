const express = require('express');
const router = express.Router();
const { addUser } = require('../controllers/signup');
//const auth = require('../middleware/auth')

router
.route('/')
.post(addUser)


module.exports = router;
