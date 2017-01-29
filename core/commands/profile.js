const fs = require("fs");
const Jimp = require("jimp");
var gear = require('../gearbox.js');
let points = JSON.parse(fs.readFileSync('../points.json', 'utf8'));

exports.run = (bot, message, args) => {

        var caller = message.author.username
        console.log("PROFILE VIEW INVOKED by " + caller + "-------------\n")
        let tgt = gear.checkment(message)
        let tgtData = points[tgt.id];
        console.log("COMP INVOKED")
        let img = tgt.avatarURL.substr(0, tgt.avatarURL.length - 10)
        gear.glassify(img, caller, message)
        setTimeout(function () {
            Jimp.read(`${paths.GLASS}/${caller}.png`).then(function (photo) {
                Jimp.read(paths.BUILD + 'cartela.png').then(function (cart) {
                    Jimp.read(paths.BUILD + 'levbar.png').then(function (bar) {
                        let adm = gear.checkAdm(message, tgt)
                        Jimp.read(paths.BUILD + adm + '.png').then(function (tag) {
                            Jimp.loadFont(paths.FONTS + 'HEADING.fnt').then(function (head) { // load font from .fnt file
                                Jimp.loadFont(paths.FONTS + 'TXT.fnt').then(function (sub) {
                                    try {
                                        var level = tgtData.level.toString()
                                        var money = tgtData.cookies.toString()
                                        var exp = tgtData.points.toString()
                                        var texp = tgtData.persotext.toString()
                                    }
                                    catch (err) {
                                        var level = "00"
                                        var money = "00"
                                        var exp = "0000"
                                        var texp = ""
                                    }
                                    var next = Math.trunc(Math.pow((Number(level) + 1) / 0.18, 2));
                                    var perc = Number(exp) / next
                                    if (level.length == 1) {
                                        level = `0${level}`
                                    }
                                    else if (level === undefined) {
                                        level = `XX`
                                    }
                                    let join = message.guild.member(tgt).joinedAt
                                    let joinstamp = `${join.getDate()}/${join.getMonth()+1}/${join.getFullYear()} - ${join.toLocaleTimeString()}`;
                                    var stret = 354 * perc
                                    bar.resize(stret + 1, 18)
                                    if (tgt.bot) {
                                        level = "XX"
                                        money = "INFINITE COOKIES"
                                        exp = "99999"
                                        next = "99999"
                                        bar.resize(354, 18)
                                    };
                                    cart.print(head, 153, 3, message.guild.member(tgt).displayName);
                                    cart.print(head, 425, 37, `${level}`);
                                    cart.print(head, 290, 160, `${money} Cookies`);
                                    cart.print(sub, 74, 253, `${exp} / ${next}`);
                                    cart.print(sub, 172, 66, `${joinstamp}`);
                                    cart.print(sub, 180, 120, `${texp}`);
                                    cart.composite(bar, 45, 231)
                                    cart.composite(photo, 18, 20)
                                    cart.composite(tag, 7, 182)
                                    cart.write(`${paths.CARDS}${caller}.png`)
                                    console.log("Success")
                                        //message.reply(caller)
                                })
                            });
                        });
                    });
                });
            });
        }, 500);
        setTimeout(function () {
            message.channel.sendFile(`${paths.CARDS}${caller}.png`)
        }, 2200);
    };



