 String.prototype.toHHMMSS = function () {
   let sec_num = parseInt(this, 10);
   let hours = Math.floor(sec_num / 3600);
   let days = Math.floor(hours / 24);

   let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
   let seconds = sec_num - (hours * 3600) - (minutes * 60);

   if (hours < 10) {
     hours = "0" + hours;
   }
   if (minutes < 10) {
     minutes = "0" + minutes;
   }
   if (seconds < 10) {
     seconds = "0" + seconds;
   }
   let time = hours + 'h ' + minutes + 'm ' + seconds + 's';
   days > 1 ? time = days + " dias " : time = time
   return time;
 }

 const gear = require("../../gearbox.js");
 const paths = require("../../paths.json");
 const locale = require('../../../utils/multilang_b');
 const mm = locale.getT();

 const cmd = 'rep';

 const init = async function (message) {
   const GLB = await gear.globalDB.get();
   const userDB = gear.userDB
   const DB = gear.serverDB
   const Server = message.guild;
   const Channel = message.channel;
   const Author = message.author;
   const Target = message.mentions.users.first()||Author;
   const MSG = message.content;
   const bot = message.botUser
   const args = MSG.split(' ').slice(1)[1]
   const LANG = message.lang;
   let P = {
     lngs: message.lang
   }
   if (gear.autoHelper([mm("helpkey", P)], {
       cmd,
       message,
       opt: this.cat
     })) return;

   Target.dDATA = message.target.dDATA || await userDB.findOne({id:Target.id});

     let day = 15000000
     let dly = Author.dDATA.modules.repdaily
     console.log(dly)
     let now = new Date().getTime();

   try {
     let creation = Author.createdAt.getTime()
     let nowe = Date.now()
     if (nowe - creation < 86400000) return message.reply(":warning: New Accounts can't rep")

     //AVOID SELF REP AND NO REP
     let noSelf = mm('reput.noSelf', {
       lngs: LANG
     })
     let noTarget = mm('reput.noTarget', {
       lngs: LANG
     })

     if (message.mentions.users.size === 0) {
       if (message.content.toLowerCase().includes(mm('dict.vacuum', P)) || message.content.toLowerCase().includes('vacuum')) {
         if ((now - dly) >= day) {
           console.log(GLB)
           let vacuum = GLB.vacuumrep || 0;
           let newvac = vacuum + 1
           await gear.globalDB.set({$set:{'data.vacuumrep':newvac}});
           await userDB.set(Author.id, {$set:{'modules.repdaily':now}});
           P.amount = newvac;
           P.user = message.member.displayName;
           return Channel.send(":fleur_de_lis: " + mm('eastereggs.vacuum', P));
         }else{
            return repCool();
         }
       }
       return message.reply(noTarget)
     }
     if (message.mentions.users.first().id == Author.id) {
       return message.reply(noSelf)
     }
     //------

     //Resolve Undefined
     if (Author.dDATA.modules.repdaily == undefined) {
       await userDB.set(Author.id, {$set: {'modules.repdaily': 0}});
     }
     if (Target.dDATA.modules.rep == undefined) {
       await userDB.set(Author.id, {$set: {'modules.rep': 0}});
     }
     //-----------

     if ((now - dly) >= day) {
       let repConfirm = mm('reput.confirm', {
         lngs: LANG,
         who: Author.username,
         target: Target.username
       })

       await userDB.set(Author.id, {$set: {'modules.repdaily': now}});
       userDB.set(Target.id, {$inc: {'modules.rep': 1}}).then(ok=>{
         if(ok){
          Channel.send(repConfirm)
         }
       });

     } else {
       return repCool();
     }
   } catch (e) {
     console.log(e)
   }

   function repCool(){
            let r = day - (now - dly)
       let remain = (r / 1000 + "").toHHMMSS();
       let repCooldown = mm('reput.cooldown', {
         lngs: LANG,
         remaining: remain
       })
       Channel.send(repCooldown)
   }
 }

 module.exports = {
   pub: true,
   cmd: cmd,
   perms: 3,
   init: init,
   cat: 'rubines'
 };
