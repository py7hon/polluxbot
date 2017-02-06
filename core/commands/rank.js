const Discord = require("discord.js");
const arraySort = require('array-sort')
const fs = require("fs");
var paths = require("../paths.js");
const gear = require('../gearbox.js')

exports.run = (bot, message, args, userData, caller, gear, points, skynet) => {
  if(!gear.moduleCheck('LEVEL',message)){
        message.reply(':no_entry_sign: Sistema de Levels foi desabilitado aqui.');
        return;
    }
 emb =    new Discord.RichEmbed();



     var rankItem = []
        var ranked = []
        for (var i in points) {
            rankItem.name = points[i].name
            rankItem.points = points[i].points
            rankItem.level = points[i].level
            ranked.push(rankItem)
            rankItem = []
        }
        arraySort(ranked, 'points', {
            reverse: true
        })
        console.log(ranked)


    emb.setColor('#da5bae')
    emb.title = "Pink Hoodie SKYNET Maid Cafe Oldfags Ranking"

    emb.setAuthor('Pollux',bot.user.avatarURL,'https://github.com/LucasFlicky/polluxbot')

  emb.setFooter('Se você não aparece aqui, digite +profile para ver seu Level')
 emb.setThumbnail("https://raw.githubusercontent.com/LucasFlicky/polluxbot/master/avis/skynet.png")
 // emb.setImage("https://raw.githubusercontent.com/LucasFlicky/polluxbot/master/avis/skynet.png")
  // emb.setImage("https://raw.githubusercontent.com/LucasFlicky/polluxbot/master/avis/2.png")
    emb.description = "Os Top-5 fregueses mais tradicionais do Cyber Cafe"


      emb.addField(':first_place: 1st',ranked[0].name, true)

      emb.addField('Level '+ranked[0].level,'**'+ranked[0].points + '** Exp', true)


      emb.addField(':second_place: 2nd',ranked[1].name, true)

      emb.addField('Level '+ranked[1].level,'**'+ranked[1].points + '** Exp', true)

       emb.addField(':third_place: 3rd',ranked[2].name, true)

      emb.addField('Level '+ranked[2].level,'**'+ranked[2].points + '** Exp', true)

       emb.addField(':medal: 4th',ranked[3].name, true)

      emb.addField('Level '+ranked[3].level,'**'+ranked[3].points + '** Exp', true)


       emb.addField(':medal: 5th',ranked[4].name, true)

      emb.addField('Level '+ranked[4].level,'**'+ranked[4].points + '** Exp', true)



    message.channel.sendEmbed(emb)






}
