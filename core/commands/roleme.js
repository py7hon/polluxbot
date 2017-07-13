
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
var Target = message.mentions.users.first() || Author;
var MSG = message.content;
var bot = message.botUser
var args = MSG.toLowerCase().split(' ').slice(1)[0]
var argsV = MSG.toLowerCase().split(' ').slice(1)[1]

var LANG = message.lang;


    function ifEmpty(){

    var kek = require("./autorole.js")
    var clone = message
    clone.content = "+autorole list"
    return kek.init(clone,userDB,DB)
    }


//-------MAGIC----------------

Target = Server.member(Target)
console.log(args)
    if (args =="help" || args ==""|| args ===undefined){

        return ifEmpty()
        /*

        message.channel.sendMessage(`
**__Autoroles Disponíveis:__**
*Jogo/Role [keyword]*
**Heroes of the Storm** [hots, heroes]
**Guild Wars 2** [guildwars2, gw2]
**Paladins** [paladins]
**Perv** (NSFW-Access) [perv]

Exemplo \`+roleme hots\` >> Adiciona a Role *Heroes of the Storm*
para sair use \`+roleme out [role]\`
    `)*/
    }

var mem=Member

//--------------------------------------



    var AUTROLS = DB.get(Server.id).modules.AUTOROLES

   var On      = gear.emoji("check")
var Off     = gear.emoji("xmark")

    var rolenotfound     = mm('CMD.nosuchrole', {
            lngs: LANG
        });


//--------------------------------------

 var noPermsMe   =   mm('CMD.unperm', {lngs:LANG})



    if (args=="out"){
        var argum = MSG.substr((message.prefix +" out"+ cmd).length +1)


               for (var i=0; i<AUTROLS.length;i++){

            if (AUTROLS[i][1] == argum){
               return xR(argum,Server.member(Author))
            }

        }
        message.reply(rolenotfound)



    }else{
        var argum = MSG.substr((message.prefix + cmd).length +1)

           for (var i=0; i<AUTROLS.length;i++){

            if (AUTROLS[i][1] == argum){
               return fR(argum,Server.member(Author))
            }

        }
        message.reply(rolenotfound)

    }












function fR(role,memb){
    message.delete()
    var roleadd_confirm     = On+ mm('CMD.roleadCom', {
            lngs: LANG,
    user: memb.displayName,
    group: role
        });




        var a = Server.roles.find('name', role);
        memb.addRole(a).then(a => message.channel.sendMessage(roleadd_confirm)).then(e=>e.delete(5000)).catch(e=> message.channel.sendMessage(noPermsMe))
            }

function xR(role,memb){
    message.delete()

    var roleremove_confirm  =Off+ mm('CMD.rolermCom', {
            lngs: LANG,
           user: memb.displayName,
    group: role
        });



        var a = Server.roles.find('name', role);
        memb.removeRole(a).then(a => message.channel.sendMessage(roleremove_confirm)).then(e=>e.delete(5000)).catch(e=> message.channel.sendMessage(noPermsMe))
            }
}
 module.exports = {pub:false,cmd: cmd, perms: 3, init: init, cat: 'info'};
