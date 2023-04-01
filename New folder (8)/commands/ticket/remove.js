const Discord = require("discord.js");
const ticketteam = '1089878792916434954'
const highstaff = '1089878784565575730'
const dev = '1089878797584707684'
const admin = "1089878792916434954"
module.exports = {
  name: "remove",
  description: "",
  category: "ticket",
  /**
   *
   * @param {Discord.Client} client
   * @param {Discord.Message} message
   * @param {*} args
   * @returns
   */
   run: async (client, message, args) => {
    if (!message.member.roles.cache.get('1089878792916434954')) return message.reply({ content: `**You do not have permission to do this!**` })
    let newM = message.mentions.users.first();
    if (!newM) return message.reply("Please mention a user");
    message.channel.permissionOverwrites.create(newM, {
      VIEW_CHANNEL: false,
    });
    const embed = new Discord.MessageEmbed()
      .setDescription(`**${newM}, Has been remove to the ticket**`)
      .setColor("#2baa19");
    message.delete()
    message.channel.send({ embeds: [embed] });
  },
};