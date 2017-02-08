const Discord = require("discord.js");
const arraySort = require('array-sort')
const Jimp = require("jimp");
const fs = require("fs");
var paths = require("../paths.js");

exports.run = (bot, message, args, userData, caller, gear, points, skynet) => {

  emb = new Discord.RichEmbed();
  


        emb.setColor('#ffd156')
    emb.title = "UPDATE Announcement"


    emb.setAuthor('Pollux Maintainance',bot.user.avatarURL,'https://discord.gg/ay48h7Q')
    emb.setThumbnail('https://github.com/LucasFlicky/polluxbot/blob/master/avis/4.gif?raw=true')
    emb.setFooter('Use +mute_notices para desativar estes avisos. +unmute_notices para reativar.')


  //emb.setThumbnail("https://raw.githubusercontent.com/LucasFlicky/polluxbot/master/avis/display.png")
  // emb.setImage("https://raw.githubusercontent.com/LucasFlicky/polluxbot/master/avis/2.png")
    //emb.description = "Os Top-5 mais rubificadoss do server"

      emb.description = ''
      emb.addField('New or Updated Commands','a', true)





    message.channel.sendEmbed(emb)

}
