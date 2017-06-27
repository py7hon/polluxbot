const Discord = require("discord.js");
var gear = require("../gearbox.js");
var paths = require("../paths.js");
var locale = require('../../utils/multilang_b');
var mm = locale.getT();

var cmd = 'roleme';

var init = function (message,userDB,DB) {

    var Server = message.guild;
    var Channel = message.channel;
    var Author = message.author;
    if (Author.bot) return;
    var Member = Server.member(Author);
    var Target = message.mentions.roles.first();
    var MSG = message.content;
    var bot = message.botUser
    var args = MSG.toLowerCase().split(' ').slice(1)[0]


    var argsV = MSG.toLowerCase().split(' ').slice(1)[1]

    var LANG = message.lang;

    //-------MAGIC----------------

    message.delete(8000);


    let modPass = gear.hasPerms(Server,Member);

    if (!modPass) {
        return message.reply(mm('CMD.moderatioNeeded', {
            lngs: LANG
        })).catch(console.error);
    }


    if (message.mentions.roles.size === 0 && !MSG.includes('list') && args != 'l') {

        return message.reply(mm('CMD.noRolesGiven', {          //TEMPORARY
            lngs: LANG
        })).catch(console.error);

    }


    if (args === "add" || args === "+"){


        if (DB.get(Server.id).modules.AUTOROLES.includes(Target)){
            return message.reply(mm('CMD.roleAlreadyHere', {          //TEMPORARY
                lngs: LANG
            })).catch(console.error);
        }
        gear.paramAdd (Server,"AUTOROLES",Target)

        return message.reply(mm('CMD.roleAdded', {          //TEMPORARY
            lngs: LANG
        })).catch(console.error);

    } // ADD


    if (args === "rem" || args === "remove" || args === "-"){


        if (!DB.get(Server.id).modules.AUTOROLES.includes(Target)){
            return message.reply(mm('CMD.noRoleHere', {          //TEMPORARY
                lngs: LANG
            })).catch(console.error);
        }
        gear.paramRemove (Server,"AUTOROLES",Target)

        return message.reply(mm('CMD.roleAdded', {          //TEMPORARY
            lngs: LANG
        })).catch(console.error);

    } // REMOVE


    if (args === "list" || args === "l" ){

        let autoroles = !DB.get(Server.id).modules.AUTOROLES
        let output = ""
        for (var i ; i < autoroles.length; i++){

            output += autoroles[i].name+"\n"

        }

        message.reply('```\n'+output+'```')

    } // LIST


}




module.exports = {pub:false,cmd: cmd, perms: 2, init: init, cat: 'mod'};
