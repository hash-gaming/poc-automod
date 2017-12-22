const request = require('request-promise');

async function authorize(code) {
  const { SLACK_CLIENT_ID, SLACK_CLIENT_SECRET } = process.env;

  return request({
    url: 'https://slack.com/api/oauth.access',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: {
      client_id: SLACK_CLIENT_ID,
      client_secret: SLACK_CLIENT_SECRET,
      code: code
    }
  });
}

module.exports = {
  authorize
};
