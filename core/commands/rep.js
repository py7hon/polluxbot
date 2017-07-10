 String.prototype.toHHMMSS = function () {
     var sec_num = parseInt(this, 10);
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

 var cmd = 'rep';

 var init = function (message, userDB, DB) {
     var Server = message.guild;
     var Channel = message.channel;
     var Author = message.author;
     if (Author.bot) return;
     var Member = Server.member(Author);
     var Target = message.mentions.users.first();
     var MSG = message.content;
     var bot = message.botUser
     var args = MSG.split(' ').slice(1)[1]
     var LANG = message.lang;

try{



     //AVOID SELF REP AND NO REP

     let noSelf = mm('reput.noSelf', {
         lngs: LANG

     })
     let noTarget = mm('reput.noTarget', {
         lngs: LANG
     })

     if (message.mentions.users.size === 0) {
         return message.reply(noTarget)
     }
     if (message.mentions.users.first().id == Author.id) {
         return message.reply(noSelf)
     }
     //------


     //Resolve Undefined
     if (userDB.get(Author.id).modules.repdaily == undefined) {
         gear.paramDefine(Author, "repdaily", 0)
     }
     if (userDB.get(Target.id).modules.rep == undefined) {
         gear.paramDefine(message.mentions.users.first(), 'rep', 0)
     }
     //-----------



     var now = new Date().getTime();

     var day = 3000000


     var dly = userDB.get(Author.id).modules.repdaily


     if ((now - dly) >= day) {

         let repConfirm = mm('reput.confirm', {
             lngs: LANG,
             who: Author.username,
             target: Target.username
         })

         Channel.sendMessage(repConfirm)

         gear.paramIncrement(message.mentions.users.first(), 'rep', 1)
         gear.paramDefine(Author, 'repdaily', now)

     } else {
         let r = day - (now - dly)
         let remain = (r / 1000 + "").toHHMMSS();
         let repCooldown = mm('reput.cooldown', {
             lngs: LANG,
             remaining: remain
         })
         Channel.sendMessage(repCooldown)
     }

}catch(e){console.log(e)}

 }
 module.exports = {
     pub: true,
     cmd: cmd,
     perms: 3,
     init: init,
     cat: 'goodies'
 };
