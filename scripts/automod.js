require('dotenv').config();

const { describeGroup, createGroup } = require('../support/slack');

const wrap = require('../support/wrapAsync');
const verifyIncomingWebhook = require('../support/verifyWebhook');

module.exports = (robot) => {
  robot.respond(/hi|hello|howdy/i, (res) => {
    res.send('Good day to ya!');
  });

  robot.router.post('/automod/discuss', verifyIncomingWebhook, wrap(async (req, res) => {
    const { SLACK_API_TOKEN } = process.env;
    console.log(req.body);

    const createResponse = await createGroup(SLACK_API_TOKEN, `discuss_${req.body.text}`);
    console.log(createResponse);

    const currentChannel = await describeGroup(SLACK_API_TOKEN, req.body.channel_id);
    console.log(currentChannel);

    res.send('Creating private room to discuss.');
  }));
};
