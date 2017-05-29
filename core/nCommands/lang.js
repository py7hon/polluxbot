var gear = require("../gearbox.js");
var paths = require("../paths.js");
var locale = require('../../utils/multilang_b');
var mm = locale.getT();
var fs = require('fs');
var cmd = 'speak';

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


//if (fs.existsSync('./utils/lang/'+args)) {
    switch(args){
        case 'en':
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
         case 'pt':
            message.reply(":flag_br: Okei, a partir de agora eu falo Português! Bandeira do Brasil porque ninguém liga pra Portugal.");
            gear.paramDefine(Server,'LANGUAGE','dev');
            break;
            case 'pt-pt':
            case 'pt-eu':
            message.reply(":flag_pt: Okei, a partir de agora eu falo Português! Não é o de Portugal mas toma uma bandeirinha.");
            gear.paramDefine(Server,'LANGUAGE','dev');
            break;
        case 'ru':
            message.reply(":flag_ru: Cyka Blyat this is still under development, do not use");
            gear.paramDefine(Server,'LANGUAGE','ru');
            break;
        default:
            message.reply(":flag_ue: I didn't find that language so i'm setting it to English as default (usage is `+speak en` / `+speak pt`)");
            gear.paramDefine(Server,'LANGUAGE','en');
            break;
    }



    };

 module.exports = {pub:false,cmd: cmd, perms: 2, init: init, cat: 'language'};













































