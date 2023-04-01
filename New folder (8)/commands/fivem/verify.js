const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js'); // import MessageEmbed, MessageButton, MessageActionRow from discord.js
module.exports = {
    name: 'verify',
    run: async (client, message, args) => {
        if (!message.member.permissions.has("ADMINISTRATOR")) return;

        const row = new MessageActionRow() // יוצר משתנה בשם row, שהמשתנה מחזיר row של buttons
            .addComponents( // מוסיף כפתורים
                new MessageButton() // יוצר כפתור
                    .setCustomId('verify') // עושה id לכפתור
                    .setLabel('Verify')
                    .setStyle('SECONDARY') // עושה צבע לכפתור
            );
        message.delete()
        message.channel.send({
            embeds: [new MessageEmbed()
                .setColor('#2baa19')
                .setTitle("לחצו על הכפתור למטה על מנת לראות את חדרי השרת!")

            ], components: [row]
        })
    }
}