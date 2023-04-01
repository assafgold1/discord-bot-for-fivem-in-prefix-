const { Client, Message, MessageEmbed } = require('discord.js');
const highstaff = '1089878784565575730'
const dev = '1089878797584707684'
const admin = "1089878792916434954"
  module.exports = {
    name: 'clear',
    run: async (client, message, args, Discord) => {
      if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply({ content: `**You do not have permission to do this!**` })
      try {
        let delamount = args[0];
        if (isNaN(delamount) || parseInt(delamount <= 0)) return message.reply('Please select a number from 1-100 Exemple** \`!clear 50\`')
  
        if (parseInt(delamount) > 100) return message.reply(' You can delete 100 messages at a time!')

        const messages = [...(await message.channel.messages.fetch({ limit: 100 }))
           .values()]
           .filter((msg) => msg.id !== message.id)
           .slice(0, delamount);
        await message.channel.bulkDelete(messages);
  
  
        const embed = new MessageEmbed()
          .setColor('#2baa19')
          .setDescription(`<@${message.author.id}> Cleared ${delamount} messages!`)

          await message.channel.send({embeds: [embed]}).then(e => {
            setTimeout(() => e.delete(), 5000)
          });
      } catch (err) {
        console.log(err)
      }
    }
  }