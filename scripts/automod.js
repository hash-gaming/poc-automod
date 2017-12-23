require('dotenv').config();

const wrap = require('../support/wrapAsync');
const verifyIncomingWebhook = require('../support/verifyWebhook');

module.exports = (robot) => {
  robot.respond(/hi|hello|howdy/i, (res) => {
    res.send('Good day to ya!');
  });

  robot.router.post('/automod/discuss', verifyIncomingWebhook, wrap((req, res) => {
    console.log(req.body);

    res.send('Creating private room to discuss.');
  }));
};
