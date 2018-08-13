// !hello
exports.run = (client, message, args) => {
    message.channel.send("Hello! I'm Reybot, a simple Discord bot created to help Reysic learn how to create Discord bots!").catch(console.error);
}
