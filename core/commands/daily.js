 String.prototype.toHHMMSS = function () {
     var sec_num = parseInt(this, 10); // don't forget the second param
     var hours = Math.floor(sec_num / 3600);
     var days = Math.floor(hours / 24);

     var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
     var seconds = sec_num - (hours * 3600) - (minutes * 60);

     if (hours < 10) {
         hours = "0" + hours;
     }
     if (minutes < 10) {
         minutes = "0" + minutes;
     }
     if (seconds < 10) {
         seconds = "0" + seconds;
     }
     var time = hours + 'h ' + minutes + 'm ' + seconds + 's';
     days > 1 ? time = days + " dias " : time = time
     return time;
 }
const Discord = require("discord.js")
 var gear = require("../gearbox.js");
 var paths = require("../paths.js");
 var locale = require('../../utils/multilang_b');
 var mm = locale.getT();

 var cmd = 'daily';

 var init = function (message,userDB,DB) {
     var Server = message.guild;
     var Channel = message.channel;
     var Author = message.author;
     if (Author.bot) return;
     var Member = Server.member(Author);
     var Target = message.mentions.users.first() || Author;
     var MSG = message.content;
     var bot = message.botUser
     var args = MSG.split(' ').slice(1)[0]
     var LANG = message.lang;

     if (!DB.get(Server.id).modules.GOODIES) {
         message.reply(mm('CMD.disabledModule', {
             lngs: LANG,
             module: "`GOODIES`"
         }));
         return;
     }



       var b = " "//"Get a boost on yout dailies and 1000"+gear.emoji("ruby")+" by upvoting me at discordbots.org and then using `+reward`"
          if(LANG == "dev"||LANG=="pt"){
       b = "Ganhe um bonus em suas dailies e mais 1000"+gear.emoji("ruby")+" votando em mim no discordbots.org e em seguida usando `+reward`"
        }

var emoj = bot.emojis.get('276878246589497344')

     let GOODMOJI = DB.get(Server.id).modules.GOODMOJI || emoj
     let GOOD = DB.get(Server.id).modules.GOODNAME || 'Ruby'

     if (!userDB.get(bot.user.id).dailyEpoch) {
         gear.superDefine(bot.user, "dailyEpoch", 1500271200000)
     }
     if (!userDB.get(bot.user.id).epochStamp) {
         gear.superDefine(bot.user, "epochStamp", new Date(1500271200000))
     }
     if (!userDB.get(Author.id).modules.daily) {
         gear.paramDefine(Author, "daily", 1500271199999)
     }




     var now = new Date().getTime();
     var day = 86400000
     var userEpoch = userDB.get(Author.id).modules.daily
     var streak = userDB.get(Author.id).modules.dyStreak
     var globalEpoch =  userDB.get(bot.user.id).dailyEpoch
     var next = globalEpoch+86400000




          if (args == "help" || args == "?" || args == "reset" || args == "epoch"){
         let e = new Discord.RichEmbed

          var r = next
          //var R = -();


         var remain = (Math.abs((now-next)/1000)+ "").toHHMMSS();
         e.setTitle(gear.emoji("ruby")+" Last Global Dailies Refresh")
         e.setDescription(remain)
         e.setTimestamp(userDB.get(bot.user.id).epochStamp)
         e.setColor("#d13d54")
         return Channel.send({embed:e}).catch(e=>gear.hook.send(e.error))
     }



     if (userEpoch < globalEpoch) {

         if (((userEpoch - globalEpoch) / 86400000) <= 2) {
             gear.paramIncrement(Author, 'dyStreak', 1)
         } else {
             gear.paramDefine(Author, 'dyStreak', 0)
         }

         //CONFIRM DAILY
         var dailyGet = mm('$.dailyGet', {
             lngs: LANG,
             emoji: '',
             goods: GOOD
         })+"\n"+b

         message.reply(emoj+dailyGet)
         if (streak == 10) {
             var dailyStreak = mm('$.dailyStreak', {
                 lngs: LANG,
                 emoji: ''

             })

             message.channel.send(emoj+dailyStreak)
               gear.paramIncrement(Author, 'goodies', 500)
         }

         gear.paramIncrement(Author, 'goodies', 100)
         gear.paramDefine(Author, 'daily', globalEpoch)


            if(userDB.get(Author.id).upvote == true){
         gear.paramIncrement(Author, 'goodies', 50)
     var a = " "//"And more **50** "+gear.emoji("ruby")+" for upvoting me!"

          if(LANG == "dev"||LANG=="pt"){
       a = "E mais **50** "+gear.emoji("ruby")+" por ter votado em mim!"
        }
                message.channel.send(a)
    }



     } else {
         var r = Math.abs(now-next);
         var remain = (r / 1000 + "").toHHMMSS();
         var dailyNope = mm('$.dailyNope', {
             lngs: LANG,
             emoji: '',
             remaining: remain
         })
         message.reply(emoj+dailyNope)
     }





 }
  module.exports = {
     pub:true,
     cmd: cmd,
     perms: 3,
     init: init,
     cat: 'goodies'
 };
