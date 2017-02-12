var gear = require("../gearbox.js");
var paths = require("../paths.js");
var locale = require('../../utils/multilang_b');
var mm = locale.getT();

var cmd = 'name';

var init = function (message, userDB, DB) {
var Server = message.guild;
var Channel = message.channel;
var Author = message.author;
if (Author.bot) return;
var Member = Server.member(Author);
var Target = message.mentions.users.first() || Author;
var MSG = message.content;
var bot = message.botUser
var args = MSG.split(' ').slice(1)[1]
var LANG = message.lang;

//-------MAGIC----------------
    const Jimp = require("jimp");
    var paths = require("../paths.js");


    var modPass = false

    if (Server.mods.MODROLE && Server.mods.MODROLE.size >= 1){
        modPass = Member.roles.has(Server.mods.MODROLE);
    }else if(Member.hasPermission("MANAGE_SERVER")){
        modPass = true;
    };
if (!modPass) return message.reply('insufficient perms');

    if (message.mentions.users.size === 0) {
        return message.reply("tu precisa me dizer de quem eu vou chutar a bunda").catch(console.error);
    }
    let kickMember = Server.member(Target);
    let kik = Target
    if (!kickMember) {
        return message.reply("deu ruim, não achei esse maluco");
    }
    if (!Server.member(bot.user).hasPermission("KICK_MEMBERS")) {
        return message.reply("Por algum raio de razão eu não posso kickar esse cara. MIMDÁ PERMISSÃO").catch(console.error);
    }


    let img = Target.defaultAvatarURL.substr(0, Target.defaultAvatarURL.length - 10)
    if (Target.avatarURL) {
        img = Target.avatarURL.substr(0, Target.avatarURL.length - 10);
    }


    Jimp.read(img).then(function (face) {
        face.resize(126, 126)
        Jimp.read(paths.BUILD + "note.png").then(function (lenna) {
            face.mask(lenna, 0, 0)


            face.resize(96, 96)
            face.rotate(-45)
            Jimp.read(paths.BUILD + "jazz.png").then(function (jazz) {
                jazz.composite(face, 80, 31);
                //jazz.write(`${paths.ROUND}/${caller}2.png`);
                message.channel.sendMessage('Ok, me dá um segundo...')
                jazz.getBuffer(Jimp.MIME_PNG, function (err, image) {


                    message.channel.sendFile(image, 'kicked.png', `:boot: Meti um pé na bunda de ${kik.username}.`).then(m => {
                        kickMember.kick()
                    }).catch(console.error)
                })

            });

        });
    });





}
module.exports = {cmd: cmd, perms: 0, init: init, cat: 'misc'};
