
var { Client, MessageEmbed, Collection, MessageActionRow, MessageButton } = require("discord.js"); // import client from discord.js 
var client = new Client({
    intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_BANS", "GUILD_INTEGRATIONS", "GUILD_WEBHOOKS", "GUILD_INVITES", "GUILD_VOICE_STATES", "GUILD_PRESENCES", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS", "GUILD_MESSAGE_TYPING", "DIRECT_MESSAGES", "DIRECT_MESSAGE_REACTIONS", "DIRECT_MESSAGE_TYPING",],
}); // bot
var db = require('quick.db'); // import db from 'quick.db'
var axios = require('axios'); // import axios from axios

//------------config----------------
const guildid = '1074784525663600782' 
const playerlistchannel = '1074784527551041557'
const playerlistmessage = '1061023705091809460'
const sserverip = '212.2.237.17'
const serverlogo = 'https://media.discordapp.net/attachments/1000657358424375316/1086373306975928350/Comp_1_109.gif'
const devname = 'Lior#6309'
const staff = '1089878792916434954'
const highstaff = '1089878784565575730'
const dev = '1089878797584707684'
const logs = '1074784528691892242'
const admin = "1089878792916434954"


client.config = require('./config.json'); // כל פעם שבעושים client.config זה עושה require לconfig.json
client.commands = new Collection()

client.login(client.config.token);  // מתחבר לבוט עם הטוקן

var prefix = client.config.prefix // מייבא את הprefix מתוך client.config (config.json)

client.on('messageCreate', async (message) => { // ברגע שהבוט קולט הודעה בשרת או בDM 
    if (!message.content.toLowerCase().startsWith(prefix)) return; // עם הקלט של ההודעה לא מתחילה עם הprefux הבוט לא יגיב שום דבר להודעה
    const [cmd, ...args] = message.content
        .slice(prefix.length)
        .trim()
        .split(" ") // מגדיר args, cmd

    const command = client.commands.get(cmd.toLowerCase()) // מגדיר משתנה בשם Command המצייג את הפקודה
    if (!command) return; // אם אין פקודה הבוט לא מגיב
    if (command) { // אם יש פקודה
        await command.run(client, message, args) // מריץ את הfile של הפקודה
    }
})
require('./handler/commands.js')(client) // מפעיל client בmoudle export של הfile


let Discord = require('discord.js')

// start of sug sysyem

client.on("interactionCreate", async interaction => {
    if (interaction.customId == 'v') { // אם הid של הכפתור הוא v
        const quary = db.get(`suggestions_${interaction.message.id}`)
        if (db.fetch(`suggestions_${interaction.message.id}_${interaction.user.id}_v`) == true) return interaction.reply({ content: `**You already vote ✅ on this suggestion!**`, ephemeral: true });
        if (db.fetch(`suggestions_${interaction.message.id}_${interaction.user.id}_x`) == true) {
            db.add(`suggestions_${interaction.message.id}_v`, 1)
            db.subtract(`suggestions_${interaction.message.id}_x`, 1)
        } else {
            db.add(`suggestions_${interaction.message.id}_v`, 1)
        }
        db.set(`suggestions_${interaction.message.id}_${interaction.user.id}_v`, true)
        db.set(`suggestions_${interaction.message.id}_${interaction.user.id}_x`, false)

        var v = db.fetch(`suggestions_${interaction.message.id}_v`)
        var x = db.fetch(`suggestions_${interaction.message.id}_x`)
        if (x == null || NaN) x = 0
        else if (v == null || NaN) v = 0
        const suggestion = db.fetch(`suggestions_${interaction.message.id}`)
        const authorId = db.fetch(`suggestions_${interaction.message.id}_authorId`)
        const author = client.users.cache.get(authorId)
        const row = new MessageActionRow()
            .addComponents([
                new MessageButton()
                    .setCustomId("v")
                    .setLabel("YES")
                    .setStyle("PRIMARY"),
                new MessageButton()
                    .setLabel("NO")
                    .setCustomId('x')
                    .setStyle("DANGER")
            ])
        interaction.message.edit({
            embeds: [new MessageEmbed()
                .setColor('#2baa19') // colour= 
                .setAuthor({ name: 'TheRockets | Suggest System', iconURL: author?.displayAvatarURL?.({ dynamic: true }) })
                .addField('User', `${author} `)
                .addField('Suggestion', suggestion, true)
                .addField('Suggestion Status', `YES = ${v} | NO = ${x}`, true)
                .setThumbnail('https://cdn.discordapp.com/attachments/1000657358424375316/1089891620599640195/2.gif') // set_thumbnail=
                .setTimestamp() // embed time sende
                .setFooter({ text: `• Made by Lior#6309`, iconURL: `https://cdn.discordapp.com/attachments/1000657358424375316/1089891620599640195/2.gif` })
            ],
            components: [row]
        });
        interaction.reply({ content: `**Your vote YES!**`, ephemeral: true }).catch(err => { });
    } else if (interaction.customId == 'x') { // אם הid של הכפתור הוא x
        const quary = db.get(`suggestions_${interaction.message.id}`)

        if (db.fetch(`suggestions_${interaction.message.id}_${interaction.user.id}_x`) == true) return interaction.reply({ content: `**You already vote ❌ on this suggestion!**`, ephemeral: true });
        if (db.fetch(`suggestions_${interaction.message.id}_${interaction.user.id}_v`) == true) {
            db.add(`suggestions_${interaction.message.id}_x`, 1)
            db.subtract(`suggestions_${interaction.message.id}_v`, 1)
        } else {
            db.add(`suggestions_${interaction.message.id}_x`, 1)
        }
        db.set(`suggestions_${interaction.message.id}_${interaction.user.id}_v`, false)
        db.set(`suggestions_${interaction.message.id}_${interaction.user.id}_x`, true)

        var v = db.fetch(`suggestions_${interaction.message.id}_v`)
        var x = db.fetch(`suggestions_${interaction.message.id}_x`)
        if (x == null || NaN) x = 0
        else if (v == null || NaN) v = 0
        const suggestion = db.fetch(`suggestions_${interaction.message.id}`)
        const authorId = db.fetch(`suggestions_${interaction.message.id}_authorId`)
        const author = client.users.cache.get(authorId)
        const row = new MessageActionRow()
            .addComponents([
                new MessageButton()
                    .setCustomId("v")
                    .setLabel("YES")
                    .setStyle("PRIMARY"),
                new MessageButton()
                    .setLabel("NO")
                    .setCustomId('x')
                    .setStyle("DANGER")
            ])
        interaction.message.edit({
            embeds: [new MessageEmbed()
                .setColor('#2baa19') // colour= 
                .setAuthor({ name: 'TheRockets | Suggest System', iconURL: author.displayAvatarURL({ dynamic: true }) })
                .addField('User', `${author}`)
                .addField('Suggestion', suggestion, true)
                .addField('Suggestion Status', `YES = ${v} | NO = ${x}`, true)
                .setThumbnail('https://cdn.discordapp.com/attachments/1000657358424375316/1089891620599640195/2.gif') // set_thumbnail=
                .setTimestamp() // embed time sende
                .setFooter({ text: `• Made by Lior#6309`, iconURL: `https://cdn.discordapp.com/attachments/1000657358424375316/1089891620599640195/2.gif` })
            ],
            components: [row]
        });

        interaction.message.edit({
            embeds: [new MessageEmbed()
                .setColor('RED') // colour= 
                .setAuthor({ name: 'TheRockets | Suggest System', iconURL: author.displayAvatarURL({ dynamic: true }) })
                .addField('User', `${author})`)
                .addField('Suggestion', suggestion, true)
                .addField('Suggestion Status', `YES = ${v} | NO = ${x}`, true)
                .setThumbnail('https://cdn.discordapp.com/attachments/1000657358424375316/1089891620599640195/2.gif') // set_thumbnail=
                .setTimestamp() // embed time sende
                .setFooter({ text: `• Made by Lior#6309`, iconURL: `https://cdn.discordapp.com/attachments/1000657358424375316/1089891620599640195/2.gif` })
            ],
            components: [row]
        })
        interaction.reply({ content: `**Your vote NO!**`, ephemeral: true }).catch(err => { })
    }
})



// end of sug system

















// start of event sug sysyem

client.on("interactionCreate", async interaction => {
    if (interaction.customId == 'vv') { // אם הid של הכפתור הוא v
        const quary = db.get(`suggestions_${interaction.message.id}`)
        if (db.fetch(`suggestions_${interaction.message.id}_${interaction.user.id}_vv`) == true) return interaction.reply({ content: `**You already vote ✅ on this suggestion!**`, ephemeral: true });
        if (db.fetch(`suggestions_${interaction.message.id}_${interaction.user.id}_xx`) == true) {
            db.add(`suggestions_${interaction.message.id}_vv`, 1)
            db.subtract(`suggestions_${interaction.message.id}_xx`, 1)
        } else {
            db.add(`suggestions_${interaction.message.id}_vv`, 1)
        }
        db.set(`suggestions_${interaction.message.id}_${interaction.user.id}_vv`, true)
        db.set(`suggestions_${interaction.message.id}_${interaction.user.id}_xx`, false)

        var v = db.fetch(`suggestions_${interaction.message.id}_vv`)
        var x = db.fetch(`suggestions_${interaction.message.id}_xx`)
        if (x == null || NaN) x = 0
        else if (v == null || NaN) v = 0
        const suggestion = db.fetch(`suggestions_${interaction.message.id}`)
        const authorId = db.fetch(`suggestions_${interaction.message.id}_authorId`)
        const author = client.users.cache.get(authorId)
        const row = new MessageActionRow()
            .addComponents([
                new MessageButton()
                    .setCustomId("vv")
                    .setLabel("YES")
                    .setStyle("PRIMARY"),
                new MessageButton()
                    .setLabel("NO")
                    .setCustomId('xx')
                    .setStyle("DANGER")
            ])
        interaction.message.edit({
            embeds: [new MessageEmbed()
                .setColor('#2baa19') // colour= 
                .setAuthor({ name: 'TheRockets | Suggest System', iconURL: author.displayAvatarURL({ dynamic: true }) })
                .addField('User', `${author}`)
                .addField('Suggestion', suggestion, true)
                .addField('Suggestion Status', `YES = ${v} | NO = ${x}`, true)
                .setThumbnail('https://cdn.discordapp.com/attachments/1000657358424375316/1089891620599640195/2.gif') // set_thumbnail=
                .setTimestamp() // embed time sende
                .setFooter({ text: `• Made by Lior#6309`, iconURL: `https://cdn.discordapp.com/attachments/1000657358424375316/1089891620599640195/2.gif` })
            ],
            components: [row]
        });
        interaction.reply({ content: `**Your vote YES!**`, ephemeral: true }).catch(err => { });
    } else if (interaction.customId == 'xx') { // אם הid של הכפתור הוא x
        const quary = db.get(`suggestions_${interaction.message.id}`)

        if (db.fetch(`suggestions_${interaction.message.id}_${interaction.user.id}_xx`) == true) return interaction.reply({ content: `**You already vote ❌ on this suggestion!**`, ephemeral: true });
        if (db.fetch(`suggestions_${interaction.message.id}_${interaction.user.id}_vv`) == true) {
            db.add(`suggestions_${interaction.message.id}_xx`, 1)
            db.subtract(`suggestions_${interaction.message.id}_vv`, 1)
        } else {
            db.add(`suggestions_${interaction.message.id}_xx`, 1)
        }
        db.set(`suggestions_${interaction.message.id}_${interaction.user.id}_v`, false)
        db.set(`suggestions_${interaction.message.id}_${interaction.user.id}_x`, true)

        var v = db.fetch(`suggestions_${interaction.message.id}_vv`)
        var x = db.fetch(`suggestions_${interaction.message.id}_xx`)
        if (x == null || NaN) x = 0
        else if (v == null || NaN) v = 0
        const suggestion = db.fetch(`suggestions_${interaction.message.id}`)
        const authorId = db.fetch(`suggestions_${interaction.message.id}_authorId`)
        const author = client.users.cache.get(authorId)
        const row = new MessageActionRow()
            .addComponents([
                new MessageButton()
                    .setCustomId("vv")
                    .setLabel("YES")
                    .setStyle("PRIMARY"),
                new MessageButton()
                    .setLabel("NO")
                    .setCustomId('xx')
                    .setStyle("DANGER")
            ])
        interaction.message.edit({
            embeds: [new MessageEmbed()
                .setColor('#2baa19') // colour= 
                .setAuthor({ name: 'TheRockets | Suggest System', iconURL: author.displayAvatarURL({ dynamic: true }) })
                .addField('User', `${author} `)
                .addField('Suggestion', suggestion, true)
                .addField('Suggestion Status', `YES = ${v} | NO = ${x}`, true)
                .setThumbnail('https://cdn.discordapp.com/attachments/1000657358424375316/1089891620599640195/2.gif') // set_thumbnail=
                .setTimestamp() // embed time sende
                .setFooter({ text: `• Made by Lior#6309`, iconURL: `https://cdn.discordapp.com/attachments/1000657358424375316/1089891620599640195/2.gif` })
            ],
            components: [row]
        });

        interaction.message.edit({
            embeds: [new MessageEmbed()
                .setColor('RED') // colour= 
                .setAuthor({ name: 'TheRockets | Suggest System', iconURL: author.displayAvatarURL({ dynamic: true }) })
                .addField('User', `${author} `)
                .addField('Suggestion', suggestion, true)
                .addField('Suggestion Status', `YES = ${v} | NO = ${x}`, true)
                .setThumbnail('https://cdn.discordapp.com/attachments/1000657358424375316/1089891620599640195/2.gif') // set_thumbnail=
                .setTimestamp() // embed time sende
                .setFooter({ text: `• Made by Lior#6309`, iconURL: `https://cdn.discordapp.com/attachments/1000657358424375316/1089891620599640195/2.gif` })
            ],
            components: [row]
        })
        interaction.reply({ content: `**Your vote NO!**`, ephemeral: true }).catch(err => { })
    }
})



// end of event sug system




// welcome system
client.on("guildMemberAdd", async (member) => { // if user join to guild event bot.event user add to guild
    var channel = client.channels.cache.get('1089878891985907752') // find channel in guilds by id
    var embed = new MessageEmbed()
        .setColor('#2baa19') // embeds color
        .setAuthor({ name: `${member.guild.name}`, iconURL: `${member.guild.iconURL({ dynamic: true })}` }) // title name, title icon, title url
        .setDescription(`**__Hey__** ${member},**__welcome To TheRockets__**\n\n\ **__\n We are Now ${member.guild.memberCount} Members__**\n\n <#1074784527551041561>`) // embed description
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true })) // embed thumbnail
        .setImage("https://cdn.discordapp.com/attachments/1000657358424375316/1089891620599640195/2.gif")
        .setTimestamp() // embed footer time
    channel.send({ embeds: [embed] })
}
)




// verify system
client.on('interactionCreate', async (interaction) => {
    if (interaction.isButton()) {
        if (interaction.customId == 'verify') {
            interaction.reply({ content: '  You got the role <@&1089878836373631086>', ephemeral: true })
            interaction.member.roles.add('1089878836373631086')
        }
    }
});



client.on("ready", async () => {
    console.log('the bot is ready')
    const fivem = require("discord-fivem-api");

    const server = new fivem.DiscordFivemApi("212.2.237.215:30120");

    setInterval(async () => {
        await server.getPlayers().then(async (data) => {
            data = data.sort((d, c) => d.id - c.id);
            let playerslist = [];

            for (let player of data) {
                const discord = [];
                for (let identifiers of player.identifiers) {
                    if (identifiers.startsWith("discord:")) discord.push(identifiers.replace('discord:', ''));
                }
                playerslist.push(`[ ID: ${player.id} ] \`${player.name}\` <@${discord}>`)
                discord.forEach(async (dis) => {
                    let user = await client.users.fetch(dis).catch((err) => []);
                    db.add(`playTime_${user.id}`, 7);
                });
            }

            const maxPlayers = await server.getMaxPlayers();

            let guild = client.guilds.cache.get("1089655889885134848")
            client.user.setActivity(`[${data.length}/${maxPlayers}] | (${guild.memberCount})`);
            let channel = client.channels.cache.get("1089878896180211782")


            const space = parseInt((data.length * 100) / maxPlayers)
            channel.messages.fetch({ around: "1089898747766513725", limit: 1 }).then(messages => {
                const embed = new MessageEmbed()
                    .setThumbnail("https://cdn.discordapp.com/attachments/1000657358424375316/1089891620599640195/2.gif")
                    .setColor("#2baa19")
                    .setImage("https://cdn.discordapp.com/attachments/1000657358424375316/1089891620599640195/2.gif")
                    .setAuthor("TheRockets" + " | " + "Server Is Online!")
                    .setDescription("`📊` **__Status:__** Online " + " \n " + "`👥` **__Players:__** " + data.length + "/" + maxPlayers + "\n" + "`🌟` **__Space:__ **" + `${space}` + "%" + " \n " + playerslist.slice(0, 32).join('\n'))
                    .setTimestamp()
                    .setFooter(guild.name + ` - Players: ${data.length}/32`, guild.iconURL({ dynamic: true }))
                messages.first().edit({ embeds: [embed] });
            })
        }).catch((err) => {
            let cchannel = client.channels.cache.get("1089878896180211782")
            let gguild = client.guilds.cache.get("1089655889885134848")
            let memberserver = gguild.memberCount
            client.user.setActivity(`[OFF] | (${memberserver})`);

            cchannel.messages.fetch({ around: "1089898747766513725", limit: 1 }).then(messages => {
                const embed = new MessageEmbed()
                    .setColor("RED")
                    .setAuthor("TheRockets" + " | " + "Server Is Offline!")
                    .setTimestamp()
                    .setFooter("🔴Server Offline")
                messages.first().edit({ embeds: [embed] });
            })
        });
    }, 15_000);

    const guild = client.guilds.cache.get('1089655889885134848');
    const leaderboardTickets = guild.channels.cache.get('1089878893676208149');
    if (leaderboardTickets) {
        setInterval(async () => {
            const leadMessage = await leaderboardTickets.messages.fetch('1089897682547519548')
                .catch(() => { });
            if (!leadMessage) return;

            const objTickets = db.get(`helps`, { table: 'tickets' }) || {}
            const arrTickets = Object.keys(objTickets);
            const rows = arrTickets.map((id) => ({
                userId: id,
                count: objTickets[id]
            }));

            const filtered = rows
                .filter((tic) => tic.count > 0)
                .filter((tic) => {
                    const disMember = guild.members.cache.get(tic.userId);
                    if (
                        disMember &&
                        disMember.roles.cache.has('1089878792916434954')
                    ) {
                        return true;
                    }

                    return false;
                });
            const sortedTickets = filtered.sort((a, b) => b.count - a.count);

            const fotmattedText = sortedTickets.length > 0 
                ? sortedTickets.map((tic, index) => {
                    return `\`${index + 1}.\` <@${tic.userId}> - \`${tic.count}\` Tickets`;
                }).join('\n')
                : 'No one has helped in any tickets yet!';

            const embed = new MessageEmbed()
                .setTitle('Tickets Leaderboard')
                .setDescription(fotmattedText)
                .setColor('#2baa19')
            await leadMessage.edit({ embeds: [embed] })
                .catch(() => { });
        //}, 10_000);
        }, (30 * 1000));
    }
});



client.on("ready", () => {
    setInterval(async () => {
        let top10channel = client.channels.cache.get("1089878897593684038");
        if (top10channel) top10channel.messages.fetch({ around: "1089899251473068062", limit: 1 }).then(async messages => {
            let info = [];

            let players = db.all().filter((x) => x.ID.startsWith("playTime")).sort((a, b) => b.data - a.data);
            for (let i = 0; i < players.length; i++) {
                let p;
                if (i + 1 == 1) {
                    p = '`🥇.`';
                } else if (i + 1 == 2) {
                    p = '`🥈.`';
                } else if (i + 1 == 3) {
                    p = '`🥉.`';
                } else {
                    p = `\`${(i) + 1}.\``;
                }

                if (i == 10) break;

                let totalSeconds = (players[i].data / 1);
                let days = Math.floor(totalSeconds / 86400);
                totalSeconds %= 86400;
                let hours = Math.floor(totalSeconds / 3600);
                totalSeconds %= 3600;
                let minutes = Math.floor(totalSeconds / 60);

                let min = minutes
                let hour = hours
                let day = days

                if (days === 0) days = '';
                if (days > 0) days = `${day} day(s),`;
                if (hours === 0) hours = '';
                if (hours > 0) hours = ` ${hour} hour(s),`;
                if (minutes === 0) minutes = '';
                if (minutes > 0) minutes = ` ${min} minute(s)`;
                if (totalSeconds === 0) totalSeconds = '';
                if (totalSeconds > 0) totalSeconds = minutes.length > 0 ? ` ${totalSeconds} second(s)` : `${totalSeconds} second(s)`;

                let time = `${days}${hours}${minutes}${totalSeconds}`;
                let user = await client.users.fetch(players[i].ID.split('_')[1]);

                info.push(`**${p}** ${user} • \`${time}\``);
            };

            let embed = new MessageEmbed()
                .setColor("#2baa19")
                .setTitle(`TheRockets | Top 10 Players`)
                .setDescription(`${info.join('\n')}`)
                .setThumbnail('https://cdn.discordapp.com/attachments/1000657358424375316/1089891620599640195/2.gif')
                .setFooter('TheRockets Top 10')
                .setTimestamp();
            messages.first().edit({ embeds: [embed] })
                .catch(() => { });
        })
    }, 15_000);
})


// free roles
client.on('interactionCreate', async (interaction) => {
    if (interaction.isButton()) {
        if (interaction.customId == 'Announcements-add') {
            if (interaction.member.roles.cache.has('969281122120904724')) {
                return interaction.reply({
                    content: 'You already have the <@&969281122120904724> role',
                    ephemeral: true
                })
            } else {
                interaction.member.roles.add('969281122120904724'); // מוסיף את הרול של בלאקליסט
                return interaction.reply({
                    content: 'You have added the <@&969281122120904724> role',
                    ephemeral: true
                }) // מגיב הודעה
            }
        } else if (interaction.customId == 'Announcements-remove') {
            if (interaction.member.roles.cache.has('969281122120904724')) {
                interaction.member.roles.remove('969281122120904724'); // מוחק את הרול של בלאקליסט
                return interaction.reply({
                    content: 'You have removed the <@&969281122120904724> role',
                    ephemeral: true
                })
            } else {
                return interaction.reply({
                    content: 'You don\'t have the <@&969281122120904724> role',
                    ephemeral: true
                })
            }
        }
    }
});

client.on(`messageCreate`, async message => {
    const bannedWords = [`discord.gg`, `.gg/`, `.gg /`, `. gg /`, `. gg/`, `discord .gg /`, `discord.gg /`, `discord .gg/`, `discord .gg`, `discord . gg`, `discord. gg`, `discord gg`, `discordgg`, `discord gg /`]
    try {
        if (bannedWords.some(word => message.content.toLowerCase().includes(word))) {
            if (message.member.roles.cache.get('1089878850047057970')) return;
            await message.delete();
            await message.channel.send(`חל איסור לשלוח קישורים לשרתים אחרים`);
        }
    } catch (e) {
        console.log(e);
    }
});

client.on('interactionCreate', async interaction => {
    const name = interaction.user.tag
    const icon = 'https://cdn.discordapp.com/attachments/1000657358424375316/1089891620599640195/2.gif'
    const { createTranscript } = require("discord-html-transcripts");
    const image = 'https://cdn.discordapp.com/attachments/1000657358424375316/1089891620599640195/2.gif'
    const staff = '1089878792916434954'
    const highstaff = '1089878784565575730'
    const dev = '1089878797584707684'
    const logs = '1038120589828833361'
    const admin = "1089878792916434954"
    if (interaction.isSelectMenu()) {
        if (interaction.customId === "ticketselection") {
            try {
                if (interaction.guild.channels.cache.find(c => c.topic === `**${name}** | ${interaction.member.id}`)) return interaction.reply({ content: `**You have an open ticket!**`, ephemeral: true })

                let ticket_format;
                if (interaction.values == "שאלה") {
                    ticket_format = "**פרט על שאלתך:**";
                } else if (interaction.values == "בחינה") {
                    ticket_format = "**שם:\n גיל: \n איזה בחינה תרצה לעשות: \n פורמט לבחינה שתרצה ישלחו לך בטיקט.**"
                } else if (interaction.values == "תלונה") {
                    ticket_format = "**שם:\n על מה תרצה להתלונן:\n פורמט לתלונה שתרצה ישלחו לך בטיקט.**"
                } else if (interaction.values == "תרומה") {
                    ticket_format = "**שם:\n למטרת מה תרצו לתרום:(הכנסת פד, רכב לתורמים ועוד..) \n דרך לתשלום ישלחו לך**"
                }

                await interaction.guild.channels.create(`ticket-$${interaction.values}`).then(channel => {
                    channel.setParent('1089878865570189403')
                    channel.permissionOverwrites.set([
                        {
                            id: interaction.member.id,
                            allow: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'ATTACH_FILES'],
                        },
                        {
                            id: interaction.guild.roles.everyone,
                            deny: ['VIEW_CHANNEL'],
                        },
                        {
                            id: interaction.guild.roles.cache.get(`${staff}`),
                            allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
                        },
                        {
                            id: interaction.guild.roles.cache.get(`${highstaff}`),
                            allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
                        },
                        {
                            id: interaction.guild.roles.cache.get(`${dev}`),
                            allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
                        },
                        {
                            id: interaction.guild.roles.cache.get(`${admin}`),
                            allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
                        },
                    ]);
                    let botEmbed = new Discord.MessageEmbed()
                        .setAuthor({ name: name + ' - Ticket System', iconURL: `https://cdn.discordapp.com/attachments/1000657358424375316/1089891620599640195/2.gif` })
                        .setColor("#2baa19")
                        .setDescription(`Created a ticket with issues regarding \`${interaction.values}\``)

                    let formatEmbed = new Discord.MessageEmbed()
                        .setTitle(`פורמט __${interaction.values}__:`)
                        .setColor("#2baa19")
                        .setDescription(ticket_format)
                        .setThumbnail(`${icon}`)
                        .setFooter({ text: `• Made by Lior#6309`, iconURL: `https://cdn.discordapp.com/attachments/1000657358424375316/1089891620599640195/2.gif` })

                    let button = new Discord.MessageActionRow()
                        .addComponents(new Discord.MessageButton()
                            .setCustomId('staff-options')
                            .setLabel('Staff Options')
                            .setStyle('PRIMARY'));

                    channel.setTopic(`**${name}** | ${interaction.member.id}`).catch((err) => []);
                    channel.send({ embeds: [botEmbed, formatEmbed], /*components: [button],*/ content: `${interaction.member} | <@&${staff}>` }).then(async msg => {
                        msg.pin()
                    })
                    db.set(`ticketformat_${channel.id}`, interaction.values)
                    return interaction.reply({ content: `<#${channel.id}> **Ticket Opened!**`, ephemeral: true }).catch((err) => { return interaction.reply({ content: `**Ticket Opened!**`, ephemeral: true }); });
                });
            } catch (err) {
                console.log(err)
            };
        }
    }
    if (interaction.isModalSubmit()) {
        const attachment = await createTranscript(interaction.channel, {
            limit: -1,
            returnBuffer: false,
            fileName: `transcript.html`
        })
        const ticket_logs = client.channels.cache.get(`1089878792916434954`)
        const ticket_owner_id = interaction.channel.topic.split(' | ')[1];
        const ticket_user = client.users.cache.get(ticket_owner_id)
        let summary = {};
        interaction.channel.messages.cache.map(message => {
            if (summary.hasOwnProperty(message.author.id))
                summary[message.author.id].number++;
            else
                summary[message.author.id] = { number: 0, user: message.author };
        });

        let amount = "1";
        for (user in summary) {
            amount += `\`${summary[user].number}\` - ${summary[user].user.tag}\n(${summary[user].user.id})\n`;
        }
        let embed = new Discord.MessageEmbed()
            .setAuthor({ name: "Ticket Logs", iconURL: interaction.guild.iconURL({ dynamic: true }) })
            .addFields(
                { name: "Action", value: `Delete`, inline: true },
                { name: "Ticket Name", value: `${interaction.channel.name}`, inline: true },
                { name: "Ticket Format", value: `${db.get(`ticketformat_${interaction.channel.id}`)}`, inline: true },
                { name: "Ticket Owner", value: `\`${ticket_user.tag}\`\n<@${ticket_user.id}>\n${ticket_user.id}`, inline: true },
                { name: "Moderator", value: `\`${interaction.user.tag}\`\n<@${interaction.user.id}>\n${interaction.user.id}`, inline: true },
                { name: "Delete At", value: `<t:${parseInt(Date.now() / 1000)}:d>, <t:${parseInt(Date.now() / 1000)}:T>\n<t:${parseInt(Date.now() / 1000)}:R>`, inline: true },
                { name: "Direct Transcript", value: `attachment://transcript.html`, inline: true },
                { name: "Users In Transcript", value: amount, inline: true },
                { name: "Reason", value: `${interaction.fields.getTextInputValue("ticket-close-reason") || 'No Reason'}`, inline: true },
            )
            .setColor("RED")
        ticket_logs.send({ embeds: [embed], files: [attachment] })
        await interaction.reply({ content: '✅', ephemeral: true });
        interaction.channel.delete()
    }
    if (interaction.isButton()) {
        if (interaction.customId === 'staff-options') {
            if (interaction.member.roles.cache.some(r => r.id === `${staff, highstaff, admin}`)) {
                let ticket_transcript = new Discord.MessageButton()
                    .setCustomId("ticket-transcript")
                    .setLabel("Transcript")
                    .setStyle("PRIMARY")
                let ticket_close = new Discord.MessageButton()
                    .setCustomId("ticket-close")
                    .setLabel("Ticket Close")
                    .setStyle("DANGER")
                let row = new Discord.MessageActionRow()
                    .addComponents([ticket_transcript, ticket_close,])
                let embed = new Discord.MessageEmbed()
                    .setTitle("Staff ticket controls")
                    .setColor("#2baa19")
                interaction.reply({ embeds: [embed], components: [row], ephemeral: true })
            } else {
                return interaction.reply({ content: `**You do not have permission to do this!**`, ephemeral: true });
            }
        };
        if (interaction.customId === '1') {

            //if (interaction.guild.channels.cache.find(c => c.topic === `**${name}** | ${interaction.member.id}`)) return interaction.reply({ content: '**You have an open ticket!**', ephemeral: true })

            let menu = new Discord.MessageSelectMenu()
                .setCustomId(`ticketselection`)
                .setPlaceholder("Select the category of the ticket")
                .addOptions([
                    {
                        label: "שאלה",
                        value: "שאלה",
                    },
                    {
                        label: "בחינה",
                        value: "בחינה",
                    },
                    {
                        label: "תרומה",
                        value: "תרומה",
                    },
                    {
                        label: "תלונה",
                        value: "תלונה",
                    }
                        

                ])

            let row = new Discord.MessageActionRow()
                .addComponents([menu])
            let embed = new Discord.MessageEmbed()
                .setAuthor({ name: interaction.member.user.username + "'s Ticket", iconURL: interaction.guild.iconURL({ dynamic: true }) })
                .setDescription(`**Select the category of the ticket**`)
                .setColor("#2baa19")
                .setFooter({ text: `• Made by Lior#6309`, iconURL: `https://cdn.discordapp.com/attachments/1000657358424375316/1089891620599640195/2.gif` })
                .setTimestamp()
            interaction.reply({ embeds: [embed], components: [row], ephemeral: true })
        };

        if (interaction.customId === 'ticket-close') {
            let sr = new Discord.Modal()
                .setTitle(`Closing ticket`)
                .setCustomId(`sr`);

            const ticket_close_reason = new Discord.TextInputComponent()
                .setCustomId("ticket-close-reason")
                .setLabel(`Type the reason for closing this ticket`.substring(0, 45))
                .setMaxLength(400)
                .setRequired(false)
                .setStyle("PARAGRAPH");


            let row = new Discord.MessageActionRow().addComponents(ticket_close_reason);
            sr.addComponents(row);

            await interaction.showModal(sr);
        };
        if (interaction.customId === 'ticket-transcript') {
            const attachment = await createTranscript(interaction.channel, {
                limit: -1,
                returnBuffer: false,
                fileName: `transcript.html`
            })
            const ticket_logs = client.channels.cache.get(`${logs}`)
            const ticket_owner_id = interaction.channel.topic.split(' | ')[1];
            const ticket_user = client.users.cache.get(ticket_owner_id)
            let summary = {};
            interaction.channel.messages.cache.map(message => {
                if (summary.hasOwnProperty(message.author.id))
                    summary[message.author.id].number++;
                else
                    summary[message.author.id] = { number: 0, user: message.author };
            });

            let amount = "";
            for (user in summary) {
                amount += `\`${summary[user].number}\` - ${summary[user].user.tag}\n(${summary[user].user.id})\n`;
            }
            let embed = new Discord.MessageEmbed()
                .setAuthor({ name: "Ticket Logs", iconURL: interaction.guild.iconURL({ dynamic: true }) })
                .addFields(
                    { name: "Action", value: `Transcript`, inline: true },
                    { name: "Ticket Name", value: `${interaction.channel.name}`, inline: true },
                    { name: "Ticket Format", value: `${db.get(`ticketformat_${interaction.channel.id}`)}`, inline: true },
                    { name: "Ticket Owner", value: `\`${ticket_user.tag}\`\n<@${ticket_user.id}>\n${ticket_user.id}`, inline: true },
                    { name: "Moderator", value: `\`${interaction.user.tag}\`\n<@${interaction.user.id}>\n${interaction.user.id}`, inline: true },
                    { name: "Channel", value: `${interaction.channel.name}\n<#${interaction.channel.id}>\n${interaction.channel.id}`, inline: true },
                    { name: "Direct Transcript", value: `attachment://transcript.html`, inline: true },
                    { name: "Users In Transcript", value: amount, inline: true },
                )
                .setColor("DARK_GREEN")
            ticket_logs.send({ embeds: [embed], files: [attachment] })
            let embedz = new Discord.MessageEmbed()
                .setDescription(`Transcript saved to <#${logs}>`)
                .setColor('DARK_GREEN')
            interaction.reply({ embeds: [embedz] })
        };
    };
});


const MySqlHandler = require('./database/index');
const mysqlConfig = require('./database/config.json');
const serverDB = new MySqlHandler({
    ...mysqlConfig,
});

client.serverDB = serverDB;

client.on('ready', async () => {
    const guild = client.guilds.cache.get('1074360226825916436');
    if (!guild) return;

    // Top gangs message
    setInterval(async () => {
        const channel = guild.channels.cache.get('1052349940082430012');
        if (!channel) return;

        const message = await channel.messages.fetch('1052361510409736232')
            .catch(() => { });
        if (!message) return;

        const gangs = await client.serverDB.query(`
           SELECT * FROM guille_gangsv2 
           ORDER BY gangkills DESC LIMIT 10
        `).catch(() => [])

        const formattedText = gangs.length > 0
            ? gangs.map((gang, index) => {
                return `\`${index + 1}.\` ${gang.gang} - **${Number(gang.gangkills).toLocaleString()}** kills`;
            }).join('\n')
            : 'No gangs found';

        const embed = new MessageEmbed()
            .setColor('#2baa19')
            .setThumbnail('https://cdn.discordapp.com/attachments/1000657358424375316/1089891620599640195/2.gif')
            .setTitle(`TheRockets | Top 10 Gangs`)
            .setDescription(formattedText)
            .setFooter({
                text: 'TheRockets Top 10 Gangs',
            })
            .setTimestamp();

        await message.edit({ embeds: [embed] })
            .catch(() => { });
    }, (30 * 1000) * 2);

    setInterval(async () => {
        const channel = guild.channels.cache.get('1089878889238626314');
        if (!channel) return;

        const message = await channel.messages.fetch('1090215710589997136')
            .catch(() => { });
        if (!message) return;

        const adminSits = await client.serverDB.query(`
           SELECT * FROM admin_sits
           ORDER BY amount DESC;
        `).catch(() => [])

        const formattedText = adminSits.length > 0
            ? adminSits.map((admin, index) => {
                return `\`${index + 1}.\` ${admin.name} (<@${admin.discord}>) - ${Number(admin.amount)} sits`;
            }).join('\n')
            : 'No data found';

        const embed = new MessageEmbed()
            .setColor('#2baa19')
            .setThumbnail('https://cdn.discordapp.com/attachments/1000657358424375316/1089891620599640195/2.gif')
            .setTitle(`TheRockets | Admin Sits`)
            .setDescription(formattedText)
            .setFooter({
                text: 'TheRockets Admin Sits',
            })
            .setTimestamp();

        await message.edit({ embeds: [embed] })
            .catch(() => { });
    }, (20 * 1000) * 2);

    setInterval(async () => {
        const channel = guild.channels.cache.get('1089878889238626314');
        if (!channel) return;
      
        const message = await channel.messages.fetch('1090215710589997136')
          .catch(() => { });
        if (!message) return;
      
        const [
          bwhIdentifiers,
          users,
        ] = await Promise.all([
          client.serverDB.query(`SELECT * FROM bwh_identifiers;`),
          client.serverDB.query(`
      SELECT * FROM users
      ORDER BY CAST(killcount AS UNSIGNED INTEGER) DESC
      LIMIT 10;
          `).catch(() => []),
        ]);
      
        const formattedText = users.length > 0
          ? users.map((user, index) => {
            const playerInfo = bwhIdentifiers.find(
              (p) => p.steam == user.identifier
            );
      
            let discord;
            try {
              discord = playerInfo.discord?.split(':')[1];
            } catch (err) {
              discord = null;
            }
      
            return `\`${index + 1}.\` ${user.name} (${discord ? `<@${discord}>` : '`Unknown Discord`'}) - ${Number(user.killcount)} kills`;
          }).join('\n')
          : 'No data found';
      
        const embed = new MessageEmbed()
          .setColor('#2baa19')
          .setThumbnail('https://cdn.discordapp.com/attachments/1000657358424375316/1089891620599640195/2.gif')
          .setTitle(`TheRockets | Top Kills`)
          .setDescription(formattedText)
          .setFooter({
            text: 'TheRockets Top Kills',
          })
          .setTimestamp();
      
        await message.edit({ embeds: [embed] })
          .catch(() => { });
      }, (20 * 1000));
    // Top players message
    /*setInterval(async () => {
        const channel = guild.channels.cache.get('1074360226825916436');
        if (!channel) return;

        const message = await channel.messages.fetch('1074360226825916436')
            .catch(() => { });
        if (!message) return;

        const [
            players,
            playersExp,
        ] = await Promise.all([
            client.serverDB.query(`SELECT * FROM users;`),
            client.serverDB.query(`SELECT * FROM bb_exp;`),
        ]);
    
        const formattedText = players.length > 0
            ? players.map((player, index) => {
                return `\`${index + 1}.\` ${player.name} - **${Number(player.kills).toLocaleString()}** kills`;
            }).join('\n')
            : 'No players found';

        const embed = new MessageEmbed()
            .setColor('#2baa19')
            .setThumbnail('https://cdn.discordapp.com/attachments/1000657358424375316/1089891620599640195/2.gif')
            .setTitle(`TheRockets | Top 10 Players`)
            .setDescription(formattedText)
            .setFooter({
                text: 'TheRockets Top 10 Players',
            })
            .setTimestamp();

        await message.edit({ embeds: [embed] })
            .catch(() => { });
    }, (60 * 1000) * 4);*/
});

process.on('unhandledRejection', (error) => {
    console.error('Unhandled promise rejection:', error);
});

process.on('uncaughtException', (error) => {
    console.error('Uncaught promise exception:', error);
});
