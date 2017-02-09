const Discord = require("discord.js");
const arraySort = require('array-sort')
const Jimp = require("jimp");
const fs = require("fs");
var paths = require("../paths.js");
let points = JSON.parse(fs.readFileSync('../points.json', 'utf8'));
let modules = JSON.parse(fs.readFileSync('./modules.json', 'utf8'));

exports.run = (bot, message, args, userData, caller, gear, points, skynet) => {

  emb = new Discord.RichEmbed();
  
if (message.channel.type == 'dm') {
        message.reply('Não usável em DM')
        return
    }


    let img = bot.user.avatarURL.substr(0, bot.user.avatarURL.length - 10)
 let tgt = gear.checkment(message)
 if (tgt.avatarURL) {
        img = tgt.avatarURL.substr(0, tgt.avatarURL.length - 10);
    }

        emb.setColor('#ffd156')
    emb.title = "Balanço"


    //emb.setAuthor('Pollux',bot.user.avatarURL,'https://discord.gg/ay48h7Q')
    emb.setThumbnail(img)
   // emb.setFooter('Use +mute_notices para desativar estes avisos. +unmute_notices para reativar.')


  //emb.setThumbnail("https://raw.githubusercontent.com/LucasFlicky/polluxbot/master/avis/display.png")
  // emb.setImage("https://raw.githubusercontent.com/LucasFlicky/polluxbot/master/avis/2.png")
    //emb.description = "Os Top-5 mais rubificadoss do server"

      emb.description = ' Números contabilizados desde 8-Feb-2017 '
      emb.addField('Ganhos',`
      **Putaria**: ${points[tgt.id].earnTracker.putaria}
**Jogatina**: ${points[tgt.id].earnTracker.jogatina}
**Drops**: ${points[tgt.id].earnTracker.drops}
**Trade**: ${points[tgt.id].earnTracker.trade}
      `, true)
     emb.addField('Gastos',`
  **Putaria**: ${points[tgt.id].expenseTracker.putaria}
**Jogatina**: ${points[tgt.id].expenseTracker.jogatina}
**Drops**: ${points[tgt.id].expenseTracker.drops}
**Trade**: ${points[tgt.id].expenseTracker.trade}

      `, true)




    message.channel.sendEmbed(emb)

}
