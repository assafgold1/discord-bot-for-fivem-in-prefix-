const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js'); // import MessageEmbed, MessageButton, MessageActionRow from discord.js
module.exports = {
    name: 'ip',
    run: async (client, message, args) => {
        const linkrow = new MessageActionRow() // יוצר משתנה בשם row, שהמשתנה מחזיר row של buttons
            .addComponents( // מוסיף כפתורים
                new MessageButton() // יוצר כפתור
                    .setURL("fivem://connect/212.2.237.215")
                    .setLabel("Connect")
                    .setStyle('LINK') // עושה צבע לכפתור
            );
            
        message.channel.send({
            embeds: [new MessageEmbed()
                .setDescription(`
            \`📊\` **__Status:__** \`Online\`
            \`🐌\` **__FiveM:__** \`connect 212.2.237.215\`
            \`🎥\` **__Mumble:__** \`Voice Chat ON\``)
                .setColor('#2baa19')
                .setTimestamp()
                .setFooter({ text: 'TheRockets', iconURL: 'https://cdn.discordapp.com/attachments/1000657358424375316/1089891620599640195/2.gif' })
                .setAuthor({ name: 'TheRockets', iconURL: 'https://cdn.discordapp.com/attachments/1000657358424375316/1089891620599640195/2.gif', })
                .setThumbnail('https://cdn.discordapp.com/attachments/1000657358424375316/1089891620599640195/2.gif')
            ],
            components: [linkrow]
        })
    }
}

