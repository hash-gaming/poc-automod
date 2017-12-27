const request = require('request-promise');

async function createGroup(token, name) {
  return request({
    url: 'https://slack.com/api/groups.create',
    method: 'POST',
    form: { token, name },
    json: true
  });
}

async function unarchiveGroup(token, channel) {
  return request({
    url: 'https://slack.com/api/groups.unarchive',
    method: 'POST',
    form: { token, channel },
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

async function listGroups(token) {
  return request({
    url: 'https://slack.com/api/groups.list',
    method: 'POST',
    form: { token },
    json: true
  });
}

async function inviteUser(token, channel, user) {
  return request({
    url: 'https://slack.com/api/groups.invite',
    method: 'POST',
    form: { token, channel, user },
    json: true
  });
}

async function createOrUnarchiveGroup(token, channelName) {
  const createResponse = await createGroup(token, channelName);
  const channelList = await listGroups(token);
  const channel = channelList.groups.filter(g => g.name === channelName)[0];

  if (!createResponse.ok && createResponse.error === 'name_taken') {
    await unarchiveGroup(token, channel.id);
  }

  return channel;
}

module.exports = {
  createGroup,
  unarchiveGroup,
  describeGroup,
  listGroups,
  inviteUser,
  createOrUnarchiveGroup
};
