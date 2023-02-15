const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userDetails')
router.post('/user/signup',userController.postSignUp)
router.post('/user/login',userController.postLogin)
module.exports=router;