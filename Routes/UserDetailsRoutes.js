const UserContoller = require('../Controller/UserController');
const User = require('../Models/UserDetails')

const express = require('express');
const { Router } = require('express');

router = express.Router();

router.post('/users/register',UserContoller.registerUser);
router.post('/users/Login', UserContoller.LoginUser)

module.exports = router;

