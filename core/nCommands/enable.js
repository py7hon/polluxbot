var gear = require("../gearbox.js");
var paths = require("../paths.js");
var locale = require('../../utils/multilang_b');
var mm = locale.getT();

var cmd = 'enable';

var init = function (message, userDB, DB) {
    var Server = message.guild;
    var Channel = message.channel;
    var Author = message.author;
    if (Author.bot) return;
    var Member = Server.member(Author);
    var Target = message.mentions.users.first() || Author;
    var MSG = message.content;
    var bot = message.botUser
    var args = MSG.split(' ').slice(1)
    var LANG = message.lang;

    //-------MAGIC----------------


    if (message.channel.type == 'dm') {
        message.reply("Comando não utilizável por DM");
        return;
    }

    if (message.content.length < 9) {
        message.reply("Escolha um módulo");
        return;
    }


    var modPass = false

    if (Server.mods.MODROLE && Server.mods.MODROLE.size >= 1) {
        modPass = Member.roles.has(Server.mods.MODROLE);
    } else if (Member.hasPermission("MANAGE_SERVER")) {
        modPass = true;
    };


    if (!modPass) {
        return message.reply("Apenas MODs e ADMs podem executar este comando").catch(console.error);
    }




function pp(o, p) {
    return o[p];
}

var module = args[0].toUpperCase()
if (args[1]) {
    var scope = args[1].toLowerCase()
}
var sc = ''
switch (scope) {
    case 's':
    case 'server':
    case 'guild':
        sc = 'S'
        break;
    case 'c':
    case 'channel':
    case 'chnl':
        sc = 'C'
        break;
    default:
        sc = 'C'
        break;
}

if (sc == 'S') {
        if (!(module in Server.mods)) return;
        gear.paramDefine(Server, module ,true)
        message.reply('O módulo ' + module + ' foi habilitado globalmente!')
} else {

     if (!(module in message.channel.mods)) return;
        gear.paramDefine(Channel, module ,true)
    message.reply('O módulo `' + module + '` foi habilitado no canal #' + Channel.name)
}




}
module.exports = {pub:true,cmd: cmd, perms: 0, init: init, cat: 'master'};
