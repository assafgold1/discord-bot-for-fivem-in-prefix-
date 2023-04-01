const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js'); // import MessageEmbed, MessageButton, MessageActionRow form 'discord.js'
const db = require('quick.db'); // import db from 'quick.db'
module.exports = {
    name: "sug",
    run: async (client, message, args) => {
        const suggestion = args.join(" "); // מגדיר משתנה שקוראים לו suggestion, שהמשתנה מחזיר את מה שהמשתמש כותב אחרי הפקודה
        if (!suggestion) return message.reply({ content: `בבקשה תרשום הצעה!`});
        const channel = client.channels.cache.get('1074784528419258369'); // מגדיר משתנה בשם channel, שהמשתנה מחזיר את הchannel בdiscord

        const row = new MessageActionRow() // יוצר משתנה בשם row, שהמשתנה מחזיר row של buttons
        .addComponents( // מוסיף כפתורים
   			new MessageButton()
            .setCustomId("v")
          	.setLabel("YES")
            .setStyle("PRIMARY"),
            new MessageButton()
            .setLabel("NO")
            .setCustomId('x')
            .setStyle("DANGER")
        );

        const msg = await channel.send({
            embeds: [new MessageEmbed()
                .setColor('#2baa19') // colour= 
                .setAuthor({ name: 'TheRockets | Suggest System', iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                .addField('User', `${message.author} `)
                .addField('Suggestion', suggestion, true)
                .addField('Suggestion Status', `YES = 0 | NO = 0`, true)
                .setThumbnail('https://cdn.discordapp.com/attachments/1000657358424375316/1089891620599640195/2.gif') // set_thumbnail=
                .setTimestamp() // embed time sende
                .setFooter({ text: `• Made by Lior#6309`, iconURL: `https://cdn.discordapp.com/attachments/1000657358424375316/1089891620599640195/2.gif` }) // set_footer=
            ],
            components: [row]
        });
        db.set(`suggestions_${msg.id}`, suggestion)
        db.set(`suggestions_${msg.id}_authorId`, message.author.id)
        message.delete()
    }
}