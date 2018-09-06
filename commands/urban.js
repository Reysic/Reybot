// !urban
const snekfetch = require('snekfetch');

exports.run = urban;

async function urban(client, message, args) {
    if (!args.length) {
        return message.channel.send('You need to supply a search term.');
    }

    const { body } = await snekfetch.get('https://api.urbandictionary.com/v0/define').query({ term: args.join(' ') });

    if (!body.list.length) {
        return message.channel.send(`No results found for **${args.join(' ')}**.`);
    }

    const [answer] = body.list;

    const embed = new Discord.RichEmbed()
        .setColor('#EFFF00')
        .setTitle(answer.word)
        .setURL(answer.permalink)
        .addField('Definition', trim(answer.definition, 1024))
        .addField('Example', trim(answer.example, 1024))
        .addField('Rating', `${answer.thumbs_up} thumbs up. ${answer.thumbs_down} thumbs down.`);

    message.channel.send(embed);
}