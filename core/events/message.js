let modules = require("../modules.json");
let Jimp = require('jimp')
var paths = require("../paths.js");
var gear = require("../gearbox.js");
const fs = require("fs");

exports.run = (bot, event, points, gear, cfg, skynet, hook, prefix) => {
    if (event.author.bot) return; // Ignorar Bot

let pref = "--"

    if (modules[event.guild.id].prefix!=''&&modules[event.guild.id].prefix!==undefined){
         pref =  modules[event.guild.id].prefix

    }else{
       pref = prefix

    }

    let userData = points[event.author.id];
    let args = event.content.split(" ").slice(1);
    let command = event.content.split(" ")[0];
    command = command.slice(pref.length)



    if (event.content.endsWith('now illegal')) {
        let aargs = event.content.split(' ')
        aargs.pop()
        aargs.pop()

        let illegal = require(`../sidecommands/nowillegal.js`);
        try{
            illegal.run(bot, event, aargs, userData, caller, gear, points, skynet )
            return
        }catch(err){
            console.log('ERROR')
            hook.sendMessage(err)
            return
            }
    }

    if (event.content.includes("biscoito")) {
        userData.rubys >= 0 ? userData.rubys -= 1 : userData.rubys = 0;
        console.log("Heresia Detected")
        gear.writePoints(points, caller).catch(console.error)
    };

    //img

    if (event.content.startsWith(pref + "salty")) {
        event.channel.sendFile(paths.REACTIONS + "juba.png")
    };
    if (event.content.startsWith(pref + "vidal")) {
        event.channel.sendFile(paths.REACTIONS + "vidaru.png")
    };



    if (gear.moduleCheck('RUBY', event)) {
        if (droprate >= 1000 && droprate < 1151) {
            event.channel.sendFile(paths.BUILD + 'ruby.png', 'Ruby.png', "OLHA GENTE! Um ruby! quem digitar \`+pick\` primeiro leva! ").then(function (rubypot) {
                gear.vacuum.push(rubypot)
            })
            gear.drops++
                console.log("------------=========== ::: NATURAL DROP")
        }
        if (droprate <= 5) {
            event.channel.sendFile(paths.BUILD + 'rubypot.png', 'Rubychest.png', "EITA PORRA! Um baú inteiro de rubys! quem digitar \`+pick\` primeiro leva! ").then(function (rubypot) {
                gear.vacuum.push(rubypot)
            })
            gear.drops += 10
            console.log("------------=========== ::: NATURAL RARE DROP ::: ===")
        }

    } // RUBY Checks

    if (gear.moduleCheck('LEVEL', event)) {

    if (!points[event.author.id]) points[event.author.id] = {
        name: event.author.username,
        points: 0,
        level: 0,
        money: 0,
        medals: {},
        flowers: 0,
        expenseTracker:{},
        earnTracker:{},
        dyStreak: 0,
        daily: 86400000,
        rubys: 0,
        persotext: ""
    };
    let userData = points[event.author.id];
    if (!event.content.includes(pref)) {
        var droprate = gear.randomize(0, 8000);
        console.log("Drop Random " + droprate)
        userData.points++;
        userData.money += gear.randomize(0, 5);
    }
    var caller = gear.checkment(event).username // Checar Caller
        // POINTS.JSON ---------------------------------------------------



        //
        //LEVEL UP CHECKER
        //-----------------------------------------------------
        let curLevel = Math.floor(0.18 * Math.sqrt(userData.points));
        let forNext = Math.trunc(Math.pow((userData.level + 1) / 0.18, 2));
        if (curLevel > userData.level) {
            // Level up!
            userData.level = curLevel;
            // event.reply(`upou pro level **${curLevel}**!`);
            let tgta = event.author
            let tgtaData = points[tgta.id];
            console.log("LEVEL UP EVENT FOR " + tgta)
            let img = tgta.avatarURL.substr(0, tgta.avatarURL.length - 10)

                Jimp.read(img).then(function (user) {

            Jimp.read(paths.BUILD + "glass.png").then(function (glass) {
                Jimp.read(paths.BUILD + "note.png").then(function (lenna) {

                    user.resize(126, 126)
                    user.mask(glass, 0, 0)
                    var air = {}
                    Jimp.read(paths.BUILD + "note.png").then(function (photo) {
                        photo.composite(user, 0, 0)
                        photo.mask(lenna, 0, 0)

                    Jimp.read(paths.BUILD + 'levelcard.png').then(function (cart) {
                        Jimp.loadFont(paths.FONTS + 'HEADING.fnt').then(function (head) { // load font from .fnt file
                            Jimp.loadFont(paths.FONTS + 'BIG.png.fnt').then(function (sub) {
                                try {
                                    var level = tgtaData.level.toString()
                                } catch (err) {
                                    var level = "00"
                                }
                                var next = Math.trunc(Math.pow((Number(level) + 1) / 0.18, 2));
                                if (level.length == 1) {
                                    level = `0${level}`
                                } else if (level === undefined) {
                                    level = `XX`
                                }
                                cart.print(head, 153, 3, event.guild.member(tgta).displayName);
                                cart.print(sub, 336, 45, `${level}`);
                                cart.composite(photo, 18, 20)
                                cart.getBuffer(Jimp.MIME_PNG, function (err, image) {
                                    event.channel.sendFile(image)
                                })
                                //cart.write(`${paths.CARDS}/up/${caller}.png`)
                            })
                        });
                    });
                });
                });
                });
                });




        }
        // [END] POINTS.JSON --------------------------------------------------------------------------------------------------
    } // LEVEL Checks


    if (!event.content.startsWith(pref)) return; // ignore no-prefix
    delete require.cache[require.resolve(`../../points.json`)];
    try{
    let commandFile = require(`../commands/${command}.js`);
        commandFile.run(bot, event, args, userData, caller, gear, points, skynet);
    }catch(err){
        console.log(err)
    }

}
