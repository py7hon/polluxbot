const Discord = require("discord.js");
const arraySort = require('array-sort')
const fs = require("fs");
var paths = require("../paths.js");


exports.run = (bot, message, args, userData, caller, gear, points, skynet) => {

const RUBYMOJI = message.guild.emojis.find('name','ruby')
 emb =    new Discord.RichEmbed();



     var rankItem = []
        var ranked = []
        for (var i in points) {
            rankItem.name = points[i].name
            rankItem.rubys = points[i].rubys
            rankItem.level = points[i].level
            ranked.push(rankItem)
            rankItem = []
        }
        arraySort(ranked, 'rubys', {
            reverse: true
        })
        console.log(ranked)


    emb.setColor('#e22449')
    emb.title = "RANKING DE RUBYS"

    emb.setAuthor('Pollux',bot.user.avatarURL,'https://github.com/LucasFlicky/polluxbot')

  emb.setFooter('Se você não aparece aqui, digite +ruby para ver quantos Rubys você tem')
  //emb.setThumbnail("https://raw.githubusercontent.com/LucasFlicky/polluxbot/master/avis/display.png")
  // emb.setImage("https://raw.githubusercontent.com/LucasFlicky/polluxbot/master/avis/2.png")
    emb.description = "Os Top-5 mais embolachados do server"

      emb.addField(':first_place: 1st',ranked[0].name, true)
      emb.addField('Level',ranked[0].level, true)
      emb.addField('Rubys',ranked[0].rubys + RUBYMOJI, true)

      emb.addField(':second_place: 2nd',ranked[1].name, true)
      emb.addField('Level',ranked[1].level, true)
      emb.addField('Rubys',ranked[1].rubys + RUBYMOJI, true)

       emb.addField(':third_place: 3rd',ranked[2].name, true)
      emb.addField('Level',ranked[2].level, true)
      emb.addField('Rubys',ranked[2].rubys + RUBYMOJI, true)

       emb.addField(':medal: 4th',ranked[3].name, true)
      emb.addField('Level',ranked[3].level, true)
      emb.addField('Rubys',ranked[3].rubys + RUBYMOJI, true)


       emb.addField(':medal: 5th',ranked[4].name, true)
      emb.addField('Level',ranked[4].level, true)
      emb.addField('Rubys',ranked[4].rubys + RUBYMOJI, true)



    message.channel.sendEmbed(emb)






}
