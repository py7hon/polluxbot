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
    var args = MSG.split(' ').slice(1)[0]


    var tint = (args || "0000FF")
    var LANG = message.lang;

    var nope = mm('CMD.noDM', {
        lngs: LANG
    });
    var gener = mm('builds.genProf', {
        lngs: LANG
    });
    var inf = mm('dict.infinite', {
        lngs: LANG
    });

    //-------MAGIC----------------
    if (message.channel.type == 'dm') {
        message.reply(nope)
        return
    }
    //CHECK PROFS LV ETC ---

    message.reply(gener).then(m => m.delete(2000))

    let img = Target.defaultAvatarURL.substr(0, Target.defaultAvatarURL.length - 10)
    if (Target.avatarURL) {
        img = Target.avatarURL.substr(0, Target.avatarURL.length - 10);
    }

    let tgtData = userDB.get(Target.id).modules;

    let adm = gear.checkAdm(message, Target).toLowerCase()

    let GOODMOJI = ':gem:'
    let GOOD = 'Gem'
    if (DB.get(Server.id).modules) {
        GOODMOJI = DB.get(Server.id).modules
    }
    if (DB.get(Server.id).modules.GOODNAME) {
        GOOD = DB.get(Server.id).modules.GOODNAME
    }


    var skin = userDB.get(Target.id).modules.skin
    var skinfo = require("../../" + paths.SKINS + skin + "/skin.js")

    Jimp.read(img).then(function (photo) {
        photo.resize(skinfo.propicHW, skinfo.propicHW)
        Jimp.read(paths.BUILD + "note.png").then(function (lenna) {

            if (skinfo.roundpic) {

                photo.mask(lenna, 0, 0)
            }



            Jimp.read(paths.SKINS + skin + '/cartela.png').then(function (cart) {


                                        cart.color([
                                             {
                                                apply: 'desaturate',
                                                params: [100]
                                            },
                                            {
                                                apply: 'mix',
                                                params: [tint, 40]
                                            }
]);

                Jimp.read(paths.SKINS + skin + '/levbar.png').then(function (bar) {

                    Jimp.read(paths.PROFILE + adm + '.png').then(function (tag) {

                        Jimp.loadFont(paths.FONTS + skinfo.font1).then(function (f1) { // load font from .fnt file
                            Jimp.loadFont(paths.FONTS + skinfo.font2).then(function (f2) {
                                Jimp.loadFont(paths.FONTS + skinfo.font3).then(function (f3) {
                                    Jimp.loadFont(paths.FONTS + skinfo.invisible).then(function (inv) {
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
                                        var stret = skinfo.barW * perc
                                        bar.resize(stret + 1, skinfo.barH)
                                        try {

                                            if (Target.id == '271394014358405121') {
                                                level = "XX"
                                                money = tgtData.goodies.toString()
                                                exp = "99999"
                                                next = "99999"
                                                bar.resize(skinfo.barW, skinfo.barH)
                                            } else if (Target.bot) {
                                                level = "XX"
                                                money = inf
                                                exp = "99999"
                                                next = "99999"
                                                bar.resize(skinfo.barW, skinfo.barH)
                                            };
                                        } catch (err) {
                                            level = "XX"
                                            money = inf
                                            exp = "99999"
                                            next = "99999"
                                            bar.resize(skinfo.barW, skinfo.barH)

                                        }
                                        cart.print(eval(skinfo.nameF), skinfo.nameX, skinfo.nameY, message.guild.member(Target).displayName);


                                        cart.print(eval(skinfo.levelF), skinfo.levelX, skinfo.levelY, `${level}`);
                                        cart.print(eval(skinfo.moneyF), skinfo.moneyX, skinfo.moneyY, `${money} ${GOOD}s`);
                                        cart.print(eval(skinfo.expF), skinfo.expX, skinfo.expY, `${exp} / ${next}`);
                                        console.log('OK ATE QUI')
                                        cart.print(eval(skinfo.joinF), skinfo.joinX, skinfo.joinY, `${joinstamp}`);
                                        cart.print(eval(skinfo.persotextF), skinfo.persotextX, skinfo.persotextY, `${texp}`, skinfo.persotextWmax);
                                        cart.composite(bar, skinfo.barX, skinfo.barY)
                                        cart.composite(photo, skinfo.propicX, skinfo.propicY)
                                        cart.composite(tag, skinfo.admtagX, skinfo.admtagY)
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

        });
    });





};
module.exports = {
    pub: true,
    cmd: cmd,
    perms: 3,
    init: init,
    cat: 'misc'
};
