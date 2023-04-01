const Discord = require('discord.js');
const { createTranscript } = require('discord-html-transcripts');
const db = require('quick.db');

module.exports = {
    name: 'close',
    description: '',
    category: 'ticket',
    run: async (client, message, args) => {
        if (!message.member.roles.cache.get('1089878792916434954')) return message.reply({ content: `**You do not have permission to do this!**` });

        const staffMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!staffMember) {
            return message.reply({
                content: `**Please provide a member!**`
            });
        }

        db.add(`helps.${staffMember.id}`, 1, { table: 'tickets' });

        let reason = staffMember ? args.slice(1).join(' ') : args.join(' ');
        if (!reason) reason = 'No Reason';

        const attachment = await createTranscript(message.channel, {
            limit: -1,
            returnBuffer: false,
            fileName: `transcript.html`
        });
        const ticket_logs = client.channels.cache.get(`1038120589828833361`)
        const ticket_owner_id = (message.channel.topic || '')?.split(' | ')[1];
        const ticket_user = client.users.cache.get(ticket_owner_id) ||
            await client.users.fetch(ticket_owner_id).catch(() => { });


        let summary = {};
        message.channel.messages.cache.map((message) => {
            if (summary.hasOwnProperty(message.author.id))
                summary[message.author.id].number++;
            else
                summary[message.author.id] = { number: 0, user: message.author };
        });

        let amount = '';
        for (user in summary) {
            amount += `\`${summary[user].number}\` - ${summary[user].user.tag}\n(${summary[user].user.id})\n`;
        }

        let embed = new Discord.MessageEmbed()
            .setAuthor({
                name: 'Ticket Logs',
                iconURL: message.guild.iconURL({ dynamic: true })
            })
            .addFields(
                { name: 'Action', value: `Delete`, inline: true },
                { name: 'Ticket Name', value: `${message.channel.name}`, inline: true },
                { name: 'Ticket Format', value: `${db.get(`ticketformat_${message.channel.id}`)}`, inline: true },
                {
                    name: 'Ticket Owner',
                    value: ticket_user
                        ? `\`${ticket_user?.tag}\`\n<@${ticket_user?.id}>\n${ticket_user?.id}`
                        : 'Unknown#0000',
                    inline: true
                },
                { name: 'Moderator', value: `\`${message.author.tag}\`\n<@${message.author.id}>\n${message.author.id}`, inline: true },
                { name: 'Delete At', value: `<t:${parseInt(Date.now() / 1000)}:d>, <t:${parseInt(Date.now() / 1000)}:T>\n<t:${parseInt(Date.now() / 1000)}:R>`, inline: true },
                { name: 'Direct Transcript', value: `attachment://transcript.html`, inline: true },
                { name: 'Users In Transcript', value: amount, inline: true },
                { name: 'Reason', value: `${reason || 'No Reason'}`, inline: true },
            )
            .setColor('RED');

        if (ticket_logs) ticket_logs.send({
            embeds: [embed],
            files: [attachment]
        });
        await message.reply({ content: '✅' }).catch(() => { })

        if (message.channel?.deletable && !message.channel.deleted)
            await message.channel.delete()
                .catch(() => { });
    },
};