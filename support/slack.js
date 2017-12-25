const request = require('request-promise');

async function createGroup(token, name) {
  return request({
    url: 'https://slack.com/api/groups.create',
    method: 'POST',
    form: { token, name },
    json: true
  });
}

async function describeGroup(token, channel) {
  return request({
    url: 'https://slack.com/api/groups.info',
    method: 'POST',
    form: { token, channel },
    json: true
  });
}

module.exports = {
  createGroup,
  describeGroup
};
