const Discord = require('discord.js')
let fs = require('fs')
let modules = JSON.parse(fs.readFileSync('./modules.json', 'utf8'));
const cfg = require("../../config.js");
const hook = new Discord.WebhookClient(cfg.annHook.ID, cfg.annHook.token);

exports.run = (bot, message, args, userData, caller, gear, points, skynet) => {

    if (!message.author.id == '88120564400553984') return;

console.log(modules[message.guild.id].announcements)
   


     emb = new Discord.RichEmbed();
    let ann = message.content.substr('+globalnotice'.length)


        emb.setColor('#e03535')
    emb.title = "UPDATE Announcement"


    emb.setAuthor('Pollux Maintainance',bot.user.avatarURL,'https://discord.gg/ay48h7Q')
    emb.setThumbnail('https://github.com/LucasFlicky/polluxbot/blob/master/avis/4.gif?raw=true')
    emb.setFooter('Use +mute_notices para desativar estes avisos. +unmute_notices para reativar.')


  //emb.setThumbnail("https://raw.githubusercontent.com/LucasFlicky/polluxbot/master/avis/display.png")
  // emb.setImage("https://raw.githubusercontent.com/LucasFlicky/polluxbot/master/avis/2.png")
    //emb.description = "Os Top-5 mais rubificadoss do server"

      emb.description = ann.split('ççç')[0]
      emb.addField('New or Updated Commands',ann.split('ççç')[1], true)
      emb.addField('Disabled Commands',ann.split('ççç')[2], true)
      emb.addField('More Info','POLLUX Support: https://discord.gg/ay48h7Q', true)




    message.channel.sendEmbed(emb)







    for (i = 0; i < bot.guilds.size; i++) {


        if (modules[bot.guilds.array()[i].id].announcements === true) {
        
            bot.guilds.array()[i].defaultChannel.sendEmbed(emb)


        }
    }

};
