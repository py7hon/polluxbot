const fs = require("fs");
//let modules = JSON.parse(fs.readFileSync('./modules.json', 'utf8'));
let Jimp = require('jimp')
var paths = require("../paths.js");
var droprate =0
var colors = require ('colors')
exports.run = (bot, event, points, gear, cfg, skynet, hook, prefix, modules) => {

    let RUBYMOJI = event.guild.emojis.find('name','ruby')
if (RUBYMOJI === null){RUBYMOJI = ':octagonal_sign: '}
    console.log(event.guild.name.toString().bold.yellow + "\n" + event.author.username.bold + " : "+ event.content.gray)
 droprate = gear.randomize(0, 15000);



    if (event.author.bot) return; // Ignorar Bot
    if (event.channel.type === 'dm') {
        event.reply('Ainda não dou suporte a mensagens por DM, desculpa~');
        return;
    }

    let pref = "+"

    if (modules[event.guild.id].prefix != '' && modules[event.guild.id].prefix !== undefined) {
        pref = modules[event.guild.id].prefix

    } else {
        pref = prefix

    }

    let userData = points[event.author.id];
    let args = event.content.split(" ").slice(1);
    let command = event.content.split(" ")[0];
    command = command.slice(pref.length)

event.Server = modules[event.guild.id]
        event.Prefix = pref
        event.Modules = modules

    if (event.content.endsWith('now illegal')) {
        let aargs = event.content.split(' ')
        aargs.pop()
        aargs.pop()

        let illegal = require(`../sidecommands/nowillegal.js`);
        try {
            illegal.run(bot, event, aargs, userData, caller, gear, points, skynet, pref)
            return
        } catch (err) {
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



    if (gear.moduleCheck('RUBYDROP', event)&&event.guild.name!="Discord Bots") {
        if (event.guild.name=="Discord Bots") return;
    console.log(droprate)
        if (droprate > 1589 && droprate < 2251) {
            console.log('DROP')
            event.channel.sendFile(paths.BUILD + 'ruby.png', 'Ruby.png', "OLHA GENTE! Um ruby! quem digitar \`" + pref + "pick\` primeiro leva! ").then(function (rubypot) {
                gear.vacuum.push(rubypot)
            })
            gear.drops++
               // modules[bot.user.id].expenseTracker.drops++
               // modules[bot.user.id].rubys--
                console.log("------------=========== ::: NATURAL DROP".bgGreen.white)
        }
        if (droprate < 10) {
            event.channel.sendFile(paths.BUILD + 'rubypot.png', 'Rubychest.png', "EITA PORRA! Um baú inteiro de rubys! quem digitar \`" + pref + "pick\` primeiro leva! ").then(function (rubypot) {
                gear.vacuum.push(rubypot)
            })
            gear.drops += 10

           // modules[bot.user.id].expenseTracker.drops += 10
            //modules[bot.user.id].rubys -= 10
            console.log("------------=========== ::: NATURAL RARE DROP ::: ===".bgGreen.yellow.bold)
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
            expenseTracker: {},
            earnTracker: {},
            dyStreak: 0,
            daily: 86400000,
            rubys: 0,
            persotext: ""
        };
        let userData = points[event.author.id];
        if (!event.content.includes(pref)) {

            if(event.Server.name == "Discord Bots"){
                console.log(("Drop Random " + droprate + " at "+event.Server.name).toString().gray)
            }else{
                console.log("Drop Random ".yellow + droprate + " at "+event.Server.name.toString().bgBlue)
            }
            userData.points++;
            userData.money += gear.randomize(0, 5);
        }
        var caller = gear.checkment(event).username // Checar Caller
            // POINTS.JSON ---------------------------------------------------

        // [END] POINTS.JSON --------------------------------------------------------------------------------------------------
    } // LEVEL Checks




    if (gear.moduleCheck('LVUP_MSG', event)) {

        if (!points[event.author.id]) points[event.author.id] = {
            name: event.author.username,
            points: 0,
            level: 0,
            money: 0,
            medals: {},
            flowers: 0,
            expenseTracker: {},
            earnTracker: {},
            dyStreak: 0,
            daily: 86400000,
            rubys: 0,
            persotext: ""
        };
        let userData = points[event.author.id];

        var caller = gear.checkment(event).username // Checar Caller
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
            console.log(tgta)
            let tgtaData = points[tgta.id];
            console.log("LEVEL UP EVENT FOR ".bgBlue + tgta)

            let img = tgta.defaultAvatarURL.substr(0, tgta.avatarURL.length - 10)
            console.log(img)


            if(tgta.avatarURL.substr(0, tgta.avatarURL.length - 10)!==undefined){
                img = tgta.defaultAvatarURL.substr(0, tgta.avatarURL.length - 10)
            console.log(img)
            }



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


    }






    if (!event.content.startsWith(pref)) return; // ignore no-prefix
    delete require.cache[require.resolve(`../../points.json`)];
    try {
        delete require.cache[require.resolve(`../commands/${command}.js`)];
        let commandFile = require(`../commands/${command}.js`);


        commandFile.run(bot, event, args, userData, caller, gear, points, skynet, pref);
    } catch (err) {
        console.log(err)
    }

}
