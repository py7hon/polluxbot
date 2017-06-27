
const Discord = require("discord.js");
var gear = require("../gearbox.js");
var paths = require("../paths.js");
var locale = require('../../utils/multilang_b');
var mm = locale.getT();

var cmd = 'roleme';

var init = function (message, userDB, DB) {





    var Server = message.guild;
    var Channel = message.channel;
    var Author = message.author;
    if (Author.bot) return;
    var Member = Server.member(Author);
    var Target = message.mentions.roles.first();
    var MSG = message.content;
    var bot = message.botUser
    var args = MSG.toLowerCase().split(' ').slice(1)[0]
    var argsV = MSG().split(' ').slice(1)[1]

    var LANG = message.lang;

    //-------MAGIC----------------



           try{
         let dbmod = !DB.get(Server.id).modules
        if (!dbmod.AUTOROLES){
            gear.paramDefine(Server,"AUTOROLES",[])
        }

    }catch(err){
        message.reply("Autoroles empty resolve failed")
    }



//    message.delete(8000);

var modPass=false
  //  var modPass = gear.hasPerms(Server,Member);

    if (!modPass) {
         message.reply(mm('CMD.moderatioNeeded', {
            lngs: LANG
        })).catch(console.error);
    }



    if (args === "list" || args === "l" ){



     //   let autoroles = !DB.get(Server.id).modules.AUTOROLES
        let output = "aaa"
      /*  for (var i ; i < autoroles.length; i++){

            output += autoroles[i].name+"\n"

        }
*/
        message.reply('```\n'+output+'```')

    } // LIST



}




module.exports = {pub:false,cmd: cmd, perms: 2, init: init, cat: 'mod'};
