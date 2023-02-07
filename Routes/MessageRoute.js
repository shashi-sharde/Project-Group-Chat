const messageController = require('../Controller/Messages');
const userAuthentication = require('../Middilware/authentication')
const express = require('express')

const router = express.Router();

router.post('/users/Sentmessage', userAuthentication.authenticate, messageController.SendingUserMessage);
router.get(`/users/getmessage:lastMessage`,userAuthentication.authenticate,messageController.GettingUserMessages);

module.exports = router;
