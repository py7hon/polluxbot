

var gear = require("../../gearbox.js");
var paths = require("../../paths.js");
var locale = require('../../../utils/multilang_b');
var mm = locale.getT();

var cmd = 'modrole';

var init = function (message, userDB, DB) {

    //HELP TRIGGER
    let helpkey = mm("helpkey",{lngs:message.lang})
if (message.content.split(" ")[1]==helpkey || message.content.split(" ")[1]=="?"|| message.content.split(" ")[1]=="help"){
    return gear.usage(cmd,message);
}
//------------

    var Server = message.guild;
    var Channel = message.channel;
    var Author = message.author;
    if (Author.bot) return;
    var Member = Server.member(Author);
    var Target = message.mentions.roles.first();
    var MSG = message.content;
    var bot = message.botUser


    var LANG = message.lang;

var argument = MSG.substr((message.prefix + cmd).length +1)
    //-------MAGIC----------------


        message.delete(8000).catch(e=> {let a = (new Error); gear.errLog(e,__filename,a.stack.toString())});

var modPass=false

try{

var modPass = gear.hasPerms(Member,DB);
}catch(err){console.log(err)}

    if (!modPass) {
         return message.reply(mm('CMD.moderationNeeded', {
            lngs: LANG
        })).catch(console.error);
    }

    var role;
    if (message.mentions.roles.size === 0){

        if (argument.length >1){
            if(Server.roles.exists("name",argument)){
                role = Server.roles.find("name",argument).id

            }else{
              return   message.reply(mm('CMD.cantFindRole',{lngs:LANG,role:argument}))
            }


        }else{
            return message.reply(mm('CMD.noRolesGiven',{lngs:LANG,role:argument}))
        }

    }else{
        role = message.mentions.roles.first().id
    }


console.log(role)

 gear.paramDefine(Server,"MODROLE",role)
   message.reply("DEFINED "+role)


}




module.exports = {pub:false,cmd: cmd, perms: 2, init: init, cat: 'mod'};
