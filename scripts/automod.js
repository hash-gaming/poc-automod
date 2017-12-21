require('dotenv').config();

function verifyIncomingWebhook(req, res, next) {
  const verificationToken = process.env.SLACK_VERIFICATION_TOKEN;

  if (req.body.token === verificationToken) {
    next();
  }
  else {
    res.sendStatus(403);
  }
}

module.exports = (robot) => {
  robot.respond(/hi|hello|howdy/i, (res) => {
    res.send('Good day to ya!');
  });

  robot.router.post('/automod/discuss', verifyIncomingWebhook, (req, res) => {
    console.log(req.body);

    res.send('Creating private room to discuss.');
  });
};
