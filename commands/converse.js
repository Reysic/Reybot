// !converse
const snekfetch = require('snekfetch');

exports.run = converse;

async function converse(client, message, args) {
  if (!args.length) {
    message.channel.send("You must provide an argument with this command.");
    return;
  }

  var header = {
    "Authorization": "Token " + process.env.authorization,
    "Content-Type": "application/json"
  }

  var dt = '{"message": {"content": "' + args.join(" ") + '", "type": "text"}, "conversation_id": "CONVERSATION_ID"}'

  const { body } = await snekfetch.post("https://api.recast.ai/build/v1/dialog", { headers: header, data: dt });
  message.channel.send(body.results.messages[0].content);
}
