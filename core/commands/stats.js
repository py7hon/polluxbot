    const Discord = require("discord.js");
const gear = require('../gearbox.js')

exports.run = (bot, message, args, userData, caller, gear, points, skynet) => {

    String.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var days   = Math.floor(hours / 24);

    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    var time    = hours+'h '+minutes+'m '+seconds+'s';
        days > 1 ? time = days+" dias " : time = time
    return time;
}

    var time = bot.uptime/1000;
    var uptime = (time + "").toHHMMSS();


    
    

 emb =    new Discord.RichEmbed();
    
    
    
        emb.setColor('#57e0af')
    emb.title = "---"

a = gear.randomize(2,4)
    emb.setAuthor('Pollux Statistics',bot.user.avatarURL,'https://github.com/LucasFlicky/polluxbot')
    emb.setThumbnail('https://github.com/LucasFlicky/polluxbot/blob/master/avis/'+a+'.gif?raw=true')

  
  //emb.setThumbnail("https://raw.githubusercontent.com/LucasFlicky/polluxbot/master/avis/display.png")
  // emb.setImage("https://raw.githubusercontent.com/LucasFlicky/polluxbot/master/avis/2.png")
    //emb.description = "Os Top-5 mais rubificadoss do server"

      emb.addField(':desktop:   Channels',bot.channels.size, true)
      emb.addField(':cityscape:   Servers',bot.guilds.size, true)
      emb.addField(':busts_in_silhouette:   Users',bot.users.size, true)
      emb.addField(':satellite_orbital:   Ping',parseFloat(Math.round(bot.ping * 100) / 100).toFixed(0)+'ms', true)
      emb.addField(':electric_plug:   Uptime',uptime, true)



    message.channel.sendEmbed(emb)

    
    
    
    
    
    
    
    
    
    
    
}
