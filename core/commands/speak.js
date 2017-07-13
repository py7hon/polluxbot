var gear = require("../gearbox.js");
var paths = require("../paths.js");
var locale = require('../../utils/multilang_b');
var mm = locale.getT();
var fs = require('fs');

var cmd = 'speak or lang';

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

//-------MAGIC----------------


    var modPass = false


    var noperms     =   mm('CMD.moderationNeeded', {lngs:LANG})
    var noPermsMe   =   mm('CMD.unperm', {lngs:LANG})



 var modPass = gear.hasPerms(Member,DB)


    if (!modPass) {
        return message.reply(mm('CMD.moderationNeeded', {
            lngs: LANG
        })).catch(console.error);
    }



//if (fs.existsSync('./utils/lang/'+args)) {
     switch(args){
        case 'en':
        case 'english':
            message.reply(":flag_ca: Alright, I will now speak English! Canadian flag because fuck you, that's why.");
            gear.paramDefine(Server,'LANGUAGE','en');
            break;
        case 'en-uk':
            message.reply(":flag_gb: Alright, I will now speak English!");
            gear.paramDefine(Server,'LANGUAGE','en');
            break;
        case 'en-us':
            message.reply(":flag_us: Alright, I will now speak English!");
            gear.paramDefine(Server,'LANGUAGE','en');
            break;
         case 'pt-br':
                  message.reply(":flag_br: Okei, a partir de agora eu falo Português! Bandeira do Brasil porque ninguém liga pra Portugal.");
            gear.paramDefine(Server,'LANGUAGE','dev');
            break;
         case 'pt':
         case 'portuguese':
            message.reply(":flag_br: Okei, a partir de agora eu falo Português! Bandeira do Brasil é mais falado que o Portugal. ¯\\_(ツ)_/¯ \n *para Português-Europeu use:* `+speak pt-eu`");
            gear.paramDefine(Server,'LANGUAGE','dev');
            break;
            case 'pt-pt':
            case 'pt-eu':
            message.reply(":flag_pt: Ok, a partir de agora falo português, o legítimo, porque ninguém quer saber do Brasil. ¯\\_(ツ)_/¯ ");
            gear.paramDefine(Server,'LANGUAGE','pt');
            break;
        case 'ru':
            message.reply(":flag_ru: Cyka Blyat this is still under development, do not use");
            gear.paramDefine(Server,'LANGUAGE','ru');
            break;
        default:
            message.reply(":earth_americas: I didn't find that language so i'm setting it to English as default. \n(usage is `+speak en` / `+speak pt`)\n I'm always open for language suggestions! ~~");
            gear.paramDefine(Server,'LANGUAGE','en');
            break;
    }


    };

 module.exports = {pub:true,cmd: cmd, perms: 2, init: init, cat: 'language'};













































