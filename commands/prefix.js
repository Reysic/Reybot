// Prefix-changing command
exports.run = (client, message, args) => {
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
