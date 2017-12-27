require('dotenv').config();

const {
  describeGroup,
  inviteUser,
  createOrUnarchiveGroup
} = require('../support/slack');

const wrap = require('../support/wrapAsync');
const verifyIncomingWebhook = require('../support/verifyWebhook');

module.exports = (robot) => {
  robot.respond(/hi|hello|howdy/i, (res) => {
    res.send('Good day to ya!');
  });

  robot.router.post('/automod/discuss', verifyIncomingWebhook, wrap(async (req, res) => {
    const userName = req.body.text.replace('@', '');
    const channelName = `discuss_${userName}`;
    const { SLACK_API_TOKEN } = process.env;

    const discussionGroup = await createOrUnarchiveGroup(SLACK_API_TOKEN, channelName);
    const describeResponse = await describeGroup(SLACK_API_TOKEN, req.body.channel_id);

    describeResponse.group.members.map(m => inviteUser(SLACK_API_TOKEN, discussionGroup.id, m));

    if (!describeResponse.ok && describeResponse.error === 'channel_not_found') {
      res.send('This is a public channel, just invite yo!');
    }
    else {
      res.send('Creating private group to discuss.');
    }
  }));
};
