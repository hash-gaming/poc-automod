require('dotenv').config();

const {
  describeGroup,
  createOrUnarchiveGroup
} = require('../support/slack');

const wrap = require('../support/wrapAsync');
const verifyIncomingWebhook = require('../support/verifyWebhook');

module.exports = (robot) => {
  robot.respond(/hi|hello|howdy/i, (res) => {
    res.send('Good day to ya!');
  });

  robot.router.post('/automod/discuss', verifyIncomingWebhook, wrap(async (req, res) => {
    const channelName = `discuss_${req.body.text}`;
    const { SLACK_API_TOKEN } = process.env;
    console.log(req.body);

    const discussionGroup = await createOrUnarchiveGroup(SLACK_API_TOKEN, channelName);
    console.log(discussionGroup);

    const describeResponse = await describeGroup(SLACK_API_TOKEN, req.body.channel_id);
    console.log(describeResponse);

    if (!describeResponse.ok && describeResponse.error === 'channel_not_found') {
      res.send('This is a public channel, just invite yo!');
    }
    else {
      res.send('Creating private group to discuss.');
    }
  }));
};
