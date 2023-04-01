const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'embed',
    run: async (client, message, args) => {
        if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply({
            content: `**You do not have permission to do this!**`
        });

        const channel = message.mentions.channels.first();
        const text = channel ? args.slice(1).join(' ') : args.join(' ');
        if (!text || !text.length) return message.reply({
            content: `**Please provide text!**`
        });

        const color = text.includes('--color') ? text.split('--color')[1].split('--')[0].trim() : '#2baa19';
        const image = text.includes('--image') ? text.split('--image')[1].split('--')[0].trim() : null;
        const thumbnail = text.includes('--thumbnail') ? text.split('--thumbnail')[1].split('--')[0].trim() : null;
        const title = text.includes('--title') ? text.split('--title')[1].split('--')[0].trim() : null;
        const description = text.includes('--description') ? text.split('--description')[1].split('--')[0].trim() : null;
        const timestamp = text.includes('--timestamp');

        const embed = new MessageEmbed();
        if (color) embed.setColor(color);
        if (image) embed.setImage(image);
        if (thumbnail) embed.setThumbnail(thumbnail);
        if (title) embed.setTitle(title);
        if (description) embed.setDescription(description);
        if (timestamp) embed.setTimestamp();

        if (isEmptyEmbed(embed)) return message.reply({
            content: 'You must enter a message to say!'
        });

        const success = channel
            ? await channel.send({
                embeds: [embed]
            })
            : await message.channel.send({
                embeds: [embed]
            });

        return success
            ? message.reply(channel ? `Successfully sent message to ${channel}!` : 'Successfully sent message!')
            : message.reply('Failed to send message!');
    }
};

function isEmptyEmbed(embed) {
    return (
        !embed.title &&
        !embed.description &&
        !embed.url &&
        !embed.color &&
        !embed.timestamp &&
        !embed.fields.length &&
        !embed.thumbnail &&
        !embed.image &&
        !embed.author &&
        !embed.footer
    );
}
