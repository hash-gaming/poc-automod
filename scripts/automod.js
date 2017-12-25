require('dotenv').config();

const { describeGroup } = require('../support/slack');

const wrap = require('../support/wrapAsync');
const verifyIncomingWebhook = require('../support/verifyWebhook');

module.exports = (robot) => {
  robot.respond(/hi|hello|howdy/i, (res) => {
    res.send('Good day to ya!');
  });

  robot.router.post('/automod/discuss', verifyIncomingWebhook, wrap(async (req, res) => {
    console.log(req.body);

    const response = await describeGroup(process.env.SLACK_API_TOKEN, req.body.channel_id);
    console.log(response);

    res.send('Creating private room to discuss.');
  }));
};
