
exports.run = (bot, message, args, userData, caller, gear, points) => {
    const Discord = require("discord.js");
 emb =    new Discord.RichEmbed();
    var paths = require("../paths.js");

    emb.color = 44524
    emb.title = "44524"

    emb.setAuthor('AVD','https://raw.githubusercontent.com/LucasFlicky/polluxbot/master/avis/4.gif')

 //   emb.footer = "vvvvvvvvvvvvv"
 //   emb.thumbnail = "../../avis/1.png"
  //  emb.image = "../../avis/2.png"
    emb.description = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
   /*   emb.addField('AAA','BBB')
      emb.addField('111','222')
      emb.addField('AB1','CAD', true)
      emb.addField('AB1','CAD', true)
    */
    message.channel.sendEmbed(emb,"asfasfasfasf")

}
