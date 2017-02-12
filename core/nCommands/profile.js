const fs = require("fs");
const Jimp = require("jimp");
var gear = require("../gearbox.js");
var paths = require("../paths.js");
var locale = require('../../utils/multilang_b');
var mm = locale.getT();

var cmd = 'profile';

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
        message.reply('Não usável em DM')
        return
    }
    //CHECK PROFS LV ETC ---

    message.reply('Gerando seu Profilecard...').then(m => m.delete(2000))

    let img = Target.defaultAvatarURL.substr(0, Target.defaultAvatarURL.length - 10)
    if (Target.avatarURL) {
        img = Target.avatarURL.substr(0, Target.avatarURL.length - 10);
    }

    let tgtData = Target.mods;

    let adm = gear.checkAdm(message, Target).toLowerCase()

    let GOODMOJI = ':gem:'
    let GOOD = 'Gems'
    if (Server.mods.GOODMOJI) {
        GOODMOJI = Server.mods.GOODMOJI
    }
    if (Server.mods.GOODNAME) {
        GOOD = Server.mods.GOODNAME
    }


    Jimp.read(img).then(function (photo) {
        photo.resize(126, 126)
        Jimp.read(paths.BUILD + "note.png").then(function (lenna) {
            photo.mask(lenna, 0, 0)



            Jimp.read(paths.BUILD + 'cartela.png').then(function (cart) {

                Jimp.read(paths.BUILD + 'levbar.png').then(function (bar) {

                    Jimp.read(paths.BUILD + adm + '.png').then(function (tag) {

                        Jimp.loadFont(paths.FONTS + 'HEADING.fnt').then(function (head) { // load font from .fnt file
                            Jimp.loadFont(paths.FONTS + 'TXT.fnt').then(function (sub) {
                                try {
                                    var level = tgtData.level.toString()
                                    var money = tgtData.goodies.toString()
                                    var exp = tgtData.exp.toString()
                                    var texp = tgtData.persotext.toString()
                                } catch (err) {
                                    var level = "00"
                                    var money = "00"
                                    var exp = "0000"
                                    var texp = ""
                                }

                                var next = Math.trunc(Math.pow((Number(level) + 1) / 0.18, 2));
                                var perc = Number(exp) / next
                                if (level.length == 1) {
                                    level = `0${level}`
                                } else if (level === undefined) {
                                    level = `XX`
                                }
                                console.log('OK ATE QUI')
                                let join = message.guild.member(Target).joinedAt
                                let joinstamp = `${join.getDate()}/${join.getMonth()+1}/${join.getFullYear()} - ${join.toLocaleTimeString()}`;
                                var stret = 354 * perc
                                bar.resize(stret + 1, 18)
                                if (Target.id == '271394014358405121') {
                                    level = "XX"
                                    money = tgtData.goodies.toString()
                                    exp = "99999"
                                    next = "99999"
                                    bar.resize(354, 18)
                                } else if (Target.bot) {
                                    level = "XX"
                                    money = "INFINITE" + GOOD
                                    exp = "99999"
                                    next = "99999"
                                    bar.resize(354, 18)
                                };
                                cart.print(head, 153, 3, message.guild.member(Target).displayName);
                                cart.print(head, 425, 37, `${level}`);
                                cart.print(head, 290, 160, `${money} ${GOOD}`);
                                cart.print(sub, 74, 253, `${exp} / ${next}`);
                                cart.print(sub, 172, 66, `${joinstamp}`);
                                cart.print(sub, 180, 100, `${texp}`, 250);
                                cart.composite(bar, 45, 231)
                                cart.composite(photo, 18, 20)
                                cart.composite(tag, 7, 182)
                                    //cart.write(`${paths.CARDS}${caller}.png`)
                                console.log("Success".green)
                                cart.getBuffer(Jimp.MIME_PNG, function (err, image) {
                                    message.channel.sendFile(image)
                                })

                            })
                        });

                    });
                });
            });


        });
    });





};
module.exports = {
    pub:true,
    cmd: cmd,
    perms: 0,
    init: init,
    cat: 'misc'
};
