const Discord = require("discord.js");
const client = new Discord.Client({
    intents: 515
});
const config = require("./config.json");

client.login(config.token); 

client.once('ready', async () => {

    console.log("✅ - Estou online!")

})

client.on('messageCreate', message => {
     if (message.author.bot) return;
     if (message.channel.type == 'dm') return;
     if (!message.content.toLowerCase().startsWith(config.prefix.toLowerCase())) return;
     if (message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)) return;

    const args = message.content
        .trim().slice(config.prefix.length)
        .split(/ +/g);
    const command = args.shift().toLowerCase();

    try {
        const commandFile = require(`./commands/${command}.js`)
        commandFile.run(client, message, args);
    } catch (err) {
    console.error('Erro:' + err);
  }
});

////////////////////////////////ticket///////////////////////////////////////

client.on('interactionCreate', interaction => {

    let criar = new Discord.MessageButton().setCustomId("c").setLabel("Crie seu ticket").setStyle("PRIMARY")
    let fechar = new Discord.MessageButton().setCustomId("p").setLabel("Pagamento").setStyle("PRIMARY")

    if (interaction.isButton()) {
        if (interaction.customId.startsWith('c')) {

            let achando = interaction.guild.channels.cache.find(a => a.name === `ticket-${interaction.user.username}`);

            if (achando) return interaction.reply({ content: `**\❌ ${interaction.user} Você já possui um ticket aberto: ${achando}**`, ephemeral: true })

            interaction.guild.channels.create(`ticket-${interaction.user}`, {
                permissionOverwrites: [
                    {
                id: interaction.guild.roles.everyone,
                deny: ["VIEW_CHANNEL"],
                    },
                    {
                        id: interaction.user.id,
                        allow: ["VIEW_CHANNEL", "SEND_MESSAGES", 'READ_MESSAGE_HISTORY']
                    }
                ], 
                
                            }).then(async channel => {

                                interaction.reply({content: `Seu ticket foi criado em: ${channel}`, ephemeral: true})

                                const row = new Discord.MessageActionRow().addComponents(fechar)

                                let embed = new Discord.MessageEmbed()
                                .setAuthor(interaction.guild.name, interaction.guild.iconURL({dynamic:true}))
                                .setDescription(`**> ${interaction.user}.\n> Seu ticket está aberto. \n> Digite !pagamento para pagar.**`)
                                .setColor("RED")
                                .setFooter(interaction.guild.name, interaction.guild.iconURL({dynamic:true}))

                                channel.send({ content: `${interaction.user}`,embeds: [embed], components: [row]}).then(msg => {
                                    msg.pin()
                                })
                            })
        }
        if (interaction.customId.startsWith('p')) {

            interaction.reply(`\ ${interaction.user} \n Forma de pagamento \n paypal email: foxtrotofc@gmail.com \n paysafecard direct \n outro tipo`)

            setTimeout( () => {
                let embed = new Discord.MessageEmbed()
                                .setAuthor(interaction.guild.name, interaction.guild.iconURL({dynamic:true}))
                                .setDescription(`**> ${interaction.user}.\n> Seu ticket está aberto. \n> Digite !pagamento para pagar.**`)
                                .setColor("RED")
            }, 5000)

        }
    }
})

/////////////////////////////////////////////////////////////////////////// entrada
client.on("guildMemberRemove", async (member) => {

    let guild = client.guilds.cache.get("996541781585956935"); //ID do servidor
    let channel = client.channels.cache.get("1001557391759913062"); //ID do canal
   
  
    if (guild != member.guild) {
  
      return console.log ("Um membro saiu do servidor");
  
    } else {
  
       let saida = new Discord.MessageEmbed()
      .setTitle (`Um membro saiu!`)
      .setDescription(`${member.user}, esperemos q voltes amigo👋.`)
      .setAuthor (member.user.tag, member.user.displayAvatarURL())
      .setColor("BLACK")
      .setThumbnail(member.user.displayAvatarURL ({dynamic: true, format: "png", size: 1024}))
      .setFooter('Star$tore• ©️Todos os direitos reservados.')
      .setTimestamp();
  
      await channel.send({ embeds: [saida] })
    }
  
  });
  
  
  client.on("guildMemberAdd", async (member) => {
  
    let guild = client.guilds.cache.get("996541781585956935"); //ID do servidor
    let channel = client.channels.cache.get("1001557391759913062"); //ID do canal
   
  
    if (guild != member.guild) {
  
      return console.log ("Um membro entrou no servidor");
  
    } else {
  
       let saida = new Discord.MessageEmbed()
      .setTitle (`Um membro entrou!`)
      .setDescription(`${member.user}\n🤗Você é o ${guild.memberCount}°membro aqui no servidor👋. \n\n📛 Precisando de ajuda?\nEntre em contato com a gente! ${client.channels.cache.get('1006522342610046977')} \n\n 👮 Evite punições!\nLeia as nossas ${client.channels.cache.get('1004704973046697998')} para evitar ser punido no servidor!`)
      .setAuthor (member.user.tag, member.user.displayAvatarURL())
      .setColor("BLACK")
      .setThumbnail(member.user.displayAvatarURL ({dynamic: true, format: "png", size: 1024}))
      .setFooter('Star$tore•©️Todos os direitos reservados.')
      .setTimestamp();
  
      await channel.send({ embeds: [saida] })
    }
  
  }); 

//////////////////////Status
//stats do bot

client.on("ready", () => {
    let activities = [
        `Recebendo Pagamentos`,
        `Localizando VPS`,
        `Bot 24H online`,
        `My creator FX `
      ],
      i = 0;
    setInterval( () => client.user.setActivity(`${activities[i++ % activities.length]}`, {
          type: "PLAYING"
        }), 4000); // tempo de trocar de stats, esta em milisegundos. 
    client.user
        .setStatus("online")
  });

////////////////////////menção embed
client.on("messageCreate", message => {
    
    if (message.author.bot) return;
    if (message.channel.type == '')
    return
    if(message.content == `<@${client.user.id}>` || message.content == `<@!${client.user.id}>`) {
    let embed = new Discord.MessageEmbed()
      .setFooter('Star$tore')
      .setImage('https://cdn.discordapp.com/attachments/1002356411059150848/1009557079159214181/static.png')
    .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
    .setColor("RANDOM")
    .setDescription(`Sou Um Bot De Moderação,Diversão e Muito Mais!
Meu Prefixo é ${config.prefix}
Utilize ${config.prefix}help Para Ver Meu Comandos.

🛠️ | Meu Sevidor: [Suporte](Link do servidor de suporte)
😜 | Me Adicione: [Me Adicione](Link para adicionar o bot)
🎁 | Meu Site: Link do site`)
    message.reply({ embeds: [embed] })
    }
});
/////////////////////logs on
const { joinVoiceChannel } = require('@discordjs/voice');

client.on("ready", () => {
    let channel = client.channels.cache.get("1001612802533883964");
    // não é id da categoria do canal de voz, e sim do canal de voz

    joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
    })

    console.log(`Bot conectado no canal de voz ${channel.name} com sucesso`)
});
////////////////////////////verify


module.exports = {
    name: "setbotao", // Coloque o nome do comando do arquivo
    aliases: ["setverificar"], // Coloque sinônimos aqui

    run: async(client, message, args) => {
        

        if (!message.member.permissions.has("ADMINISTRATOR")) {
            message.reply(`Você não possui a permissão \`Administrador\` para utilizar este comando.`)
        } else {
            let canal = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
            if (!canal) { 
                message.reply({ embeds: [
                    new Discord.MessageEmbed()
                    .setColor("RED")
                    .setDescription(`\`!setbotao [canal]\``)
                ] })
            } else {
                message.reply(`O canal de texto ${canal} foi configurado.`);
                canal.send({ embeds: [
                    new Discord.MessageEmbed()
                    .setColor("RED")
                    .setDescription(`Clique no botão para se verificar!`)
                ], components: [
                    new Discord.MessageActionRow().addComponents(botao)
                ] })
            }
        }

       
        
    }
}

////////////////////boost
client.on("guildMemberUpdate", async (oldMember, newMember) => {

    const { guild } = newMember;

    const embed = new MessageEmbed()
        .setColor("PURPLE")
        .setAuthor({ name: `${newMember.user.username} impulsionou o servidor!`, iconURL: guild.iconURL({ dynamic: true, size: 512 }) })

    if (!oldMember.premiumSince && newMember.premiumSince) {

        const canvas = Canvas.createCanvas(800, 250);

        const ctx = canvas.getContext("2d");

        const background = await Canvas.loadImage("./Structures/Images/boosterImage.png");
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

        ctx.strokeStyle = "#FF0000";
        ctx.strokeRect(0, 0, canvas.width, canvas.height);

        ctx.font = "38px cursive";
        ctx.textAlign = "center"
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText(newMember.displayName, canvas.width / 2, canvas.height / 1.2);

        const avatar = await Canvas.loadImage(newMember.user.displayAvatarURL({ format: "jpg" }));

        ctx.beginPath();
        ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(avatar, 25, 25, 200, 200);

        const attachment = new MessageAttachment(canvas.toBuffer(), `boost-${guild.name}-${newMember.user.username}.png`);

        embed.setDescription(`Obrigado por impulsionar o servidor!`)
        embed.setImage(`attachment://boost-${guild.name}-${newMember.user.username}.png`)
    }
})

////////////////////////
const role = "1001557369743998996"; //ID DO CARGO
const status = ".gg/starstorept"; // STATUS
const colors = require(`colors`);
const serverID = "996541781585956935"; // ID DO SERVIDOR

    console.log(`[🔷 Status Role] Carregado!`.bold.green);

    client.on("presenceUpdate", async (oP, nP) => {
        let guild = client.guilds.cache.get(serverID)
        if (!guild) return;
        if (nP) {

            var user = guild.members.cache.get(nP.userId);

            if (!user || !user.roles) user = await guild.members.fetch(nP.userId).catch(() => {}) || false;

            if (!user) return;

            if (nP.activities.some(({
                    state
                }) => state?.includes(status))) {
                if (!user.roles.cache.has(role)) {
                    user.roles.add(role).catch(() => {});
                    console.log(`[🔷 Status Check] Status encontrado do usuário: ${user.user.tag}`.green.dim)
                }
            } else {
                if (user.roles.cache.has(role)) {
                    user.roles.remove(role).catch(() => {});
                    console.log(`[🔷 Status Check] Nenhum Status encontrado do usuário: ${user.user.tag}`.red.dim)
                }
            }
        }
    })
    

    client.on("ready", async () => {

        let guild = client.guilds.cache.get(serverID)
        if (!guild) return;

        let fm = await guild.members.fetch().catch(() => {})

        let haveStatus = [...fm.filter(user =>
            !user.user.bot && !user.roles.cache.has(role) &&
            user.presence && user.presence.activities.some(({
                state
            }) => state?.includes(status))
        ).values()];

        let noStatus = [...fm.filter(user =>
            !user.user.bot && !user.roles.cache.has(role) &&
            (!user.presence || !user.presence.activities.some(({
                state
            }) => state?.includes(status)))
        ).values()];

        for (const user of haveStatus) {
            await user.roles.add(role).catch(() => {});
                    await console.log(`[🔷 Status Check] Status encontrado do usuário: ${user.user.tag}`.green.dim)
            await delay(350);
        }

        for (const user of noStatus) {
            await user.roles.remove(role).catch(() => {});
                    await console.log(`[🔷 Status Check] Nenhum status encontrado do usuário: ${user.user.tag}`.red.dim)
            await delay(350);
        }
    })

    function delay(delayInms) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(2);
            }, delayInms);
        });
    }
  
///////////////////////invites

client.on("messageCreate", message => {
    if (message.author.bot) return;
    if (message.channel.type == '')
    return
    if(message.content == `<@${client.user.id}> invite` || message.content == `<@!${client.user.id}> invite`) {
      
      let embed = new MessageEmbed()
      .setDescription(``)
      .setColor("#1c9cfb")
      .setThumbnail(message.client.user.displayAvatarURL({ dynamic: true }))
    return message.reply({embeds: [embed]})
    }
});

///////////////////////////////
