const request = require('request-promise');

async function describeGroup(token, channel) {
  return request({
    url: 'https://slack.com/api/groups.info',
    method: 'POST',
    form: { token, channel },
    json: true
  });
}

module.exports = {
  describeGroup
};
