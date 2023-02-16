const cron = require('node-cron');

const moveOldPrivateMessages = require('../Controllers/chatDetails').moveOldPrivateMessages;
const moveOldGroupMessages = require('../Controllers/groupsDetails').moveOldGroupMessages;

const moveOldGroupMesseges = require()
function setupCronJobs() {
  // run the moveOldMessages function every day at 11:59 PM
  cron.schedule('59 23 * * *', async () => {
    await moveOldPrivateMessages();
    await moveOldGroupMessages();
  });
}

module.exports = setupCronJobs;