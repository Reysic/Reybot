// !user
exports.run = (client, message, args) => {
  let member = message.mentions.members.first();
  message.channel.send(`.displayName: ${member.displayName}, .id: ${member.id}, .nickname: ${member.nickname}, .joinedAt: ${member.joinedAt}`);
}
