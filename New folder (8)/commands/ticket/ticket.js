const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js')

module.exports = {
    name: "ticket-setup",
    run: async (client, message, args) => {
        if (!message.member.permissions.has("ADMINISTRATOR")) return;

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('1')
                    .setLabel('📨')
                    .setStyle('SECONDARY'),
            );

        message.channel.send({
            components: [row], embeds: [new MessageEmbed()
                .setColor("#2baa19")
                .setDescription("**לפתיחת טיקט יש ללחוץ על הכפתור 📨**")
                .setAuthor({ name: 'TheRockets | Ticket System', iconURL: 'https://cdn.discordapp.com/attachments/1000657358424375316/1089891620599640195/2.gif' })
            ]
        })
    }
}