const messageController = require('../Controller/Messages');
const userAuthentication = require('../Middilware/authentication')
const express = require('express')

const router = express.Router();

router.post('/users/message', userAuthentication.authenticate, messageController.UserMessage);

module.exports = router;
