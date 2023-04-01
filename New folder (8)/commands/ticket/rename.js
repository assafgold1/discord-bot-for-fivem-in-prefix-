const Discord = require("discord.js");
const ticketteam = '1089878792916434954'
const highstaff = '1089878784565575730'
const dev = '1089878797584707684'
const admin = "1089878792916434954"
module.exports = {
  name: "rename",
  run: async (client, message, args) => {
    if (!message.member.roles.cache.get('1089878792916434954')) return message.reply({ content: `**You do not have permission to do this!**` })
    let newName = args.join(" ");
    if (newName.length < 1) return message.channel.send("Please write a new name");
    message.channel.setName(`ticket-${newName}`);
    const embed = new Discord.MessageEmbed()
      .setDescription(`**Channel name has been changed to:** \`ticket-${newName}\``)
      .setColor('#2baa19');
          message.delete()
    message.channel.send({ embeds: [embed] });
  },
};