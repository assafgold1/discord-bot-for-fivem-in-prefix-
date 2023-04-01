const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js'); // import MessageEmbed, MessageButton, MessageActionRow from discord.js
module.exports = {
    name: 'roles',
    run: async (client, message, args) => {
        if (!message.member.permissions.has("ADMINISTRATOR")) return;

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('Announcements-add')
                    .setLabel('הוסף רול')
                    .setStyle('SUCCESS'),
                new MessageButton()
                    .setCustomId('Announcements-remove')
                    .setLabel('הסר רול')
                    .setStyle('DANGER'),
            );

        message.delete();

        const embed = new MessageEmbed()
            .setColor('#2baa19')
            .setDescription(`**לחץ על הכפתור על מנת לקבל את רול עדכונים 
Click the button to take the Updates role**`)

        return await message.channel.send({
            embeds: [embed],
            components: [row]
        })
    }
}



