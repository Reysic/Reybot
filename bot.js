/**
 * A simple Discord bot created to help Reysic learn how to create Discord bots!
 */

// Import the discord.js module
const Discord = require('discord.js');

// Create an instance of a Discord client
const client = new Discord.Client();

// Import config.js (holds token and command prefix)
// const config = require('./config.json');

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

// This loop reads the /events/ folder and attaches each event file to the appropriate event.
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    let eventFunction = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    // super-secret recipe to call events with all their proper arguments *after* the `client` var.
    client.on(eventName, (...args) => eventFunction.run(client, ...args));
  });
});

client.on('message', message => {
  // Return early is command prefix is not present or the message author is another bot (prevent botception)
  // if (!message.content.startsWith(config.prefix) || message.author.bot) return;
  if (!message.content.startsWith(process.env.prefix) || message.author.bot) return;

  // const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const args = message.content.slice(process.env.prefix.length).trim().split(/ +/g);
  // shift() removes one element from the array and returns it
  const command = args.shift().toLowerCase();

  try {
    let commandFile = require(`./commands/${command}.js`);
    commandFile.run(client, message, args);
  } catch (err) {
    console.error(err);
  }
});

// Log our bot in using the token from https://discordapp.com/developers/applications/me
// client.login(config.token);
client.login(process.env.token);
