/**
 * A simple Discord bot created to help Reysic learn how to create Discord bots!
 */

// Import the discord.js module
const Discord = require('discord.js');

// Create an instance of a Discord client
const client = new Discord.Client();

// Import config.js (holds token and command prefix)
const config = require('./config.json');

// Import the fs native module
const fs = require('fs');

/**
 * The ready event is vital, it means that only _after_ this will your bot start reacting to information
 * received from Discord
 */
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// Create an event listener for new guild members
client.on('guildMemberAdd', member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.find(ch => ch.name === 'general');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(`Welcome to the server, ${member}!`);
});

client.on('message', message => {
  // Return early is command prefix is not present or the message author is another bot (prevent botception)
  if (!message.content.startsWith(config.prefix) || message.author.bot) return;
  // if (!message.content.startsWith(process.env.prefix) || message.author.bot) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  // const args = message.content.slice(process.env.prefix.length).trim().split(/ +/g);
  // shift() removes one element from the array and returns it
  const command = args.shift().toLowerCase();

  // !hello
  if (command === "hello") {
    message.channel.send("Hello! I'm Reybot, a simple Discord bot created to help Reysic learn how to create Discord bots!");
  }

  // Prefix-changing command
  if (command === "prefix") {
    // Protected, must be owner to execute
    // if (message.author.id != config.ownerID) {
    if (message.author.id != process.env.ownerID) {
      message.channel.send("Sorry, you're not permitted to run that command.");
      return;
    } else {
      // Gets the prefix from the command (e.g. "!prefix +" will have the "+" taken from it)
      let newPrefix = message.content.split(" ".slice(1, 2)[0]);
      // Change the configuration in memory
      // config.prefix = newPrefix;
      process.env.prefix = newPrefix;
      // Save the configuration to the file
      // fs.writeFile("./config.json", JSON.stringify(config), (err) => console.error);
      // Notify the user
      // message.channel.send("Command prefix succesfully changed to: " + config.prefix)
      message.channel.send("Command prefix succesfully changed to: " + process.env.prefix);
    }
  }

  // !user
  if (command === "user") {
    let member = message.mentions.member.first();
    message.channel.send('.displayName: ${member.displayName}, .id: ${member.id}, .nickname: ${member.nickname}, .joinedAt: ${member.joinedAt}');
  }
});

// Log our bot in using the token from https://discordapp.com/developers/applications/me
client.login(config.token);
// client.login(process.env.token);
