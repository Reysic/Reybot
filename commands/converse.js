// !converse
const snekfetch = require('snekfetch');

exports.run = (client, message, args) => {
  if (!args.length) {
    message.channel.send("You must provide an argument with this command.").catch(console.error);
  }

  var header = {
    "Authorization": process.env.authorization,
    "Content-Type": "application/json"
  }

  var dt = {"message": {"content": args, "type": "text"}, "conversation_id": "CONVERSATION_ID"}

  const { body } = await snekfetch.post("https://api.recast.ai/build/v1/dialog", { headers: header, data: dt });
  message.channel.send(body);
}
