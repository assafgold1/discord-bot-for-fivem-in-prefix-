const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js')

module.exports = {
  name: "reset-tickets",
  run: async (client, message, args) => {
    if (!message.member.permissions.has("ADMINISTRATOR")) return;

    db.delete(`helps`, { table: 'tickets' });

    return message.channel.send(`Successfully reset the tickets!`)
  }
}