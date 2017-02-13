const Discord = require("discord.js");
var gear = require("../gearbox.js");
var paths = require("../paths.js");
var locale = require('../../utils/multilang_b');
var mm = locale.getT();

var cmd = 'stats';

var init = function (message, userDB, DB) {
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
 emb.addField('More Info','POLLUX Support: https://discord.gg/ay48h7Q', true)



    message.channel.sendEmbed(emb)





}
module.exports = {pub:true,cmd: cmd, perms: 0, init: init, cat: 'info'};
