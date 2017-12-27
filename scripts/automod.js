require('dotenv').config();

const {
  describeGroup,
  inviteUser,
  createOrUnarchiveGroup
} = require('../support/slack');

const wrap = require('../support/wrapAsync');
const { verifyIncomingWebhook, isAdminCheck } = require('../middleware');

module.exports = (robot) => {
  robot.respond(/hi|hello|howdy/i, (res) => {
    res.send('Good day to ya!');
  });

  // this async function doesn't have a try/catch, which you would need otherwise
  // because we use the wrap function to forward errors to the client.
  robot.router.post('/automod/discuss', verifyIncomingWebhook, wrap(isAdminCheck), wrap(async (req, res) => {
    console.log(req.body);
    const userName = req.body.text.replace('@', '');
    const channelName = `discuss_${userName}`;
    const { SLACK_API_TOKEN } = process.env;

    const describeResponse = await describeGroup(SLACK_API_TOKEN, req.body.channel_id);

    if (!describeResponse.ok && describeResponse.error === 'channel_not_found') {
      const discussionGroup = await createOrUnarchiveGroup(SLACK_API_TOKEN, channelName);

      describeResponse.group.members.map(m => inviteUser(SLACK_API_TOKEN, discussionGroup.id, m));
      res.send('This is a public channel, just invite yo!');
    }
    else {
      res.send('Creating private group to discuss.');
    }
  }));
};
