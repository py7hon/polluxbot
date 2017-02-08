const Discord = require('discord.js')
exports.run = (bot, message, args, userData, caller, gear, points, skynet) => {

    if (!message.author.id == '88120564400553984') return;





     emb = new Discord.RichEmbed();
    let ann = message.content.substr('+globalnotice'.length)


        emb.setColor('#e03535')
    emb.title = "UPDATE Announcement"

a = gear.randomize(2,4)
    emb.setAuthor('Pollux Statistics',bot.user.avatarURL,'https://github.com/LucasFlicky/polluxbot')
    emb.setThumbnail('https://github.com/LucasFlicky/polluxbot/blob/master/avis/'+a+'.gif?raw=true')
    emb.setThumbnail('https://github.com/LucasFlicky/polluxbot/blob/master/avis/'+a+'.gif?raw=true')


  //emb.setThumbnail("https://raw.githubusercontent.com/LucasFlicky/polluxbot/master/avis/display.png")
  // emb.setImage("https://raw.githubusercontent.com/LucasFlicky/polluxbot/master/avis/2.png")
    //emb.description = "Os Top-5 mais rubificadoss do server"

      emb.description = ann.split('ççç')[0]
      emb.addField('New Commands',ann.split('ççç')[0], true)
      emb.addField('Disabled Commands',ann.split('ççç')[0], true)




    message.channel.sendEmbed(emb)









    for (i = 0; i < bot.guilds.size; i++) {

        if (modules[bot.guilds.array()[i].id].announcements) {
           // bot.guilds.array()[i].guild.defaultChannel.sendMessage(message.content.substr('+globalnotice'.length))

        }
    }

};
