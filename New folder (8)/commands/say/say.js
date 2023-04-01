const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'say', // command name
    run: async (client, message, args) => {
        if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply({
            content: `**You do not have permission to do this!**`
        })

        const channel = message.mentions.channels.first();
        const text = channel ? args.slice(1).join(' ') : args.join(' ');
        if (!text || !text.length) return message.reply({
            content: `**Please provide text!**`
        });

        message.delete().catch(() => { });

        const success = channel
            ? await channel.send({
                content: text
            })
            : await message.channel.send({
                content: text
            });

        return success
            ? message.reply({
                content: channel ? `Successfully sent message to ${channel}!` : 'Successfully sent message!'
            })
            : message.reply({
                content: 'Failed to send message!'
            });
    }
};