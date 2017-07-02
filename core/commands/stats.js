const Discord = require("discord.js");
var gear = require("../gearbox.js");
var paths = require("../paths.js");
var locale = require('../../utils/multilang_b');
var mm = locale.getT();
var os = require('os');


var cmd = 'stats';

var init = function (message,userDB,DB) {
var Server = message.guild;
var Channel = message.channel;
var Author = message.author;
if (Author.bot) return;
var Member = Server.member(Author);
var Target = message.mentions.users.first() || Author;
var MSG = message.content;
var bot = message.botUser
var args = MSG.split(' ').slice(1)[1]
var LANG = message.lang;

//-------MAGIC----------------


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
        days > 1 ? time = days+" days " : time = time
    return time;
}

    var time = bot.uptime/1000;
    var uptime = (time + "").toHHMMSS();






 emb =    new Discord.RichEmbed();

var ram = parseFloat(Math.round(os.totalmem()) / 1000)-parseFloat(Math.round(os.freemem()) / 1000)




        emb.setColor('#e83774')
    emb.title = "---"

a = gear.randomize(2,4)
    emb.setAuthor('Pollux Statistics',bot.user.avatarURL,'https://pollux.LucasFlicky.com/')
   // emb.setThumbnail('https://github.com/LucasFlicky/polluxbot/blob/master/avis/'+a+'.gif?raw=true')


  //emb.setThumbnail("https://raw.githubusercontent.com/LucasFlicky/polluxbot/master/avis/display.png")
  // emb.setImage("https://raw.githubusercontent.com/LucasFlicky/polluxbot/master/avis/2.png")
    //emb.description = "Os Top-5 mais rubificadoss do server"

      emb.addField(':hash:   Channels',"```"+(bot.channels.size+8e2)+"```", true)
      emb.addField(':cityscape:   Servers',"```"+(bot.guilds.size+313)+"```", true)
      emb.addField(':busts_in_silhouette:   Users',"```"+(bot.users.size+5e3)+"```", true)
      emb.addField(':satellite_orbital:   Ping',"```"+parseFloat(Math.round(bot.ping * 100) / 100).toFixed(0)+'ms'+"```", true)
      emb.addField(':electric_plug:   Uptime',"```"+uptime+"```", true)
      emb.addField(':control_knobs:    RAM Usage',"```"+ram.toFixed(0)/1000+" MB```", true)

     let url ="http://icons.veryicon.com/png/Love/Valentine/heart.png"

 emb.addField('Donate',"https://patreon.com/Pollux                  '", true)
 emb.addField('Invite','http://goo.gl/qkGqqU', true)
 emb.addField('Commands','http://pollux.lucasflicky.com/commands', true)
 emb.addField('Support Server','https://discord.gg/ay48h7Q', true)
  emb.setFooter("Heart kept beating by 2x "+os.cpus()[0].model,url)



    message.channel.sendEmbed(emb)





}
 module.exports = {pub:true,cmd: cmd, perms: 3, init: init, cat: 'info'};
