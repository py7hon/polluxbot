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
     var args = MSG.split(' ').slice(1)[1]
     var LANG = message.lang;

     if (!Server.mods.GOODIES) {
         message.reply(mm('CMD.disabledModule', {
             lngs: LANG,
             module: "`GOODIES`"
         }));
         return;
     }



     let GOODMOJI = ':gem:'
     let GOOD = 'Gem'
     if (Server.mods.GOODMOJI) {
         GOODMOJI = Server.mods.GOODMOJI
     }
     if (Server.mods.GOODNAME) {
         GOOD = Server.mods.GOODNAME
     }



     // day one 1485938511477 + 86400000

     const D = 1000 * 60 * 60 * 24 * 1

     var now = new Date().getTime();
     var day = 86400000
     var dly = Author.mods.daily
     var streak = Author.mods.dyStreak
     1486025790272
     if ((now - dly) >= day) {
         if ((now - dly) < (day * 2)) {
             gear.paramIncrement(Author, 'dyStreak', 1)
         } else {
             gear.paramDefine(Author, 'dyStreak', 0)
         }
         var dailyGet = mm('$.dailyGet', {
             lngs: LANG,
             emoji: GOODMOJI,
             goods: GOOD
         })


         message.reply(dailyGet)
         if (streak == 10) {
             var dailyStreak = mm('$.dailyStreak', {
                 lngs: LANG,
                 emoji: GOODMOJI

             })

             message.channel.sendMessage(dailyStreak)
         }

         gear.paramIncrement(Author, 'goodies', 100)
         gear.paramDefine(Author, 'daily', now)

     } else {
         var r = day - (now - dly)
         var remain = (r / 1000 + "").toHHMMSS();
         var dailyNope = mm('$.dailyNope', {
             lngs: LANG,
             emoji: GOODMOJI,
             remaining: remain
         })
         message.reply(dailyNope)
     }




 }
 module.exports = {
     pub:true,
     cmd: cmd,
     perms: 0,
     init: init,
     cat: 'goodies'
 };
