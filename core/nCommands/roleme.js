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

//-------MAGIC----------------

Target = Server.member(Target)

    if (args =="help"){
        message.channel.sendMessage(`
**__Autoroles Disponíveis:__**
*Jogo/Role [keyword]*
**Heroes of the Storm** [hots, heroes]
**Guild Wars 2** [guildwars1, gw2]
**Paladins** [paladins]
**Perv** (NSFW-Access) [perv]

Exemplo \`+roleme hots\` >> Adiciona a Role *Heroes of the Storm*
para sair use \`+roleme out [role]\`
    `)}

var mem=Member



    if (args=="out"){
        switch (argsV){
  case "overwatch":
              case "ow":
         xR("Overwatch   🎮",mem);
        break;    
            
    case "paladins":
    
    xR("Paladins   🎮",mem);
        break;
        case "hots":
        case "heroes":
    xR("Heróis do Toró   🎮",mem);
        break;
        case "gw2":
        case "guildwars2":
    xR("Guild Wars II   🎮",mem);
        break;
          case "perv":
    xR("Perv",mem);
        break;
            }
    }else{
        switch (args){

    case "paladins":
    case "overwatch":
    fR("Paladins   🎮",mem);
        break;
        case "hots":
        case "heroes":
    fR("Heróis do Toró   🎮",mem);
        break;
        case "gw2":
        case "guildwars2":
    fR("Guild Wars II   🎮",mem);
        break;
          case "perv":
    fR("Perv",mem);
        break;
            }
    }



function fR(role,memb){
        var a = Server.roles.find('name', role);
        memb.addRole(a).then(a => message.channel.sendMessage(":white_check_mark: Adicionei **"+memb.displayName+"** ao grupo de **"+role+"** !")).catch(e=> message.channel.sendMessage("Erro!"))
            }
function xR(role,memb){
        var a = Server.roles.find('name', role);
        memb.removeRole(a).then(a => message.channel.sendMessage(":no_entry: Removi **"+memb.displayName+"** do grupo de **"+role+"** !")).catch(e=> message.channel.sendMessage("Erro!"))
            }
}
module.exports = {pub:false,cmd: cmd, perms: 0, init: init, cat: 'info'};
