const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client();
var Jimp = require("jimp");
var paths = require("./paths.js");
var cleverbot = require("cleverbot");
let points = JSON.parse(fs.readFileSync('../points.json', 'utf8'));
let reactions = JSON.parse(fs.readFileSync('./reactions.json', 'utf8'));
let masterreactions = JSON.parse(fs.readFileSync('./masterreactions.json', 'utf8'));
const cfg = require("../config.js");
var gear = require('./gearbox.js');
const prefix = "+";
var counter = 0
var droprate = 5000
    //
    //===============================================================
    //             PATHS
    //===============================================================
    //
    //const RANK = points
const hook = new Discord.WebhookClient(cfg.hook.ID, cfg.hook.token);
const coreHook = new Discord.WebhookClient(cfg.coreHook.ID, cfg.coreHook.token);
// START SHIT UP
cleverbot = new cleverbot(cfg.clever.ID, cfg.clever.token);
cleverbot.setNick(cfg.name)
    //----Cleverbot
cleverbot.create(function (err, session) {
    bot.on("message", message => {
        if (gear.checkment(message).username != bot.user.username) return;
        if (message.author.bot) return;
        //if (message.author.username != "RoboEd") return;
        if (!message.content.startsWith('+')) {
            message.channel.startTyping()
            cleverbot.ask(message.content.substr(13), function (err, response) {
                message.reply(response);
                message.channel.stopTyping();
                console.log("Cleverbot chat: " + message.content + " // " + response)
            })
        }
    });
});
fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        let eventFunction = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        bot.on(eventName, (...args) => eventFunction.run(bot, ...args));
    });
});
//----Message Digester
bot.on("message", message => {
    if (message.author.bot) return; // Ignorar Bot
    if (!message.content.startsWith(cfg.prefix)) return;
    let userData = points[message.author.id];
    var caller = gear.checkment(message).username
    let command = message.content.split(" ")[0];
    command = command.slice(cfg.prefix.length);
    let args = message.content.split(" ").slice(1);
    try {
        delete require.cache[require.resolve(`../points.json`)];
        let commandFile = require(`./commands/${command}.js`);
        commandFile.run(bot, message, args, userData, caller, gear, points);
    }
    catch (err) {
        console.log(err)
    }
})
bot.on("message", message => {
    if (message.author.bot) return; // Ignorar Bot
    if (!points[message.author.id]) points[message.author.id] = {
        name: message.author.username
        , points: 0
        , level: 0
        , money: 0
        , medals: {}
        , flowers: 0
        , cookies: 0
        , persotext: ""
    };
    let userData = points[message.author.id];
    if (!message.content.includes(prefix)) {
        var droprate = gear.randomize(0, 2000);
        console.log("Drop Random " + droprate)
        userData.points++;
        userData.money += gear.randomize(0, 5);
    }
    var caller = gear.checkment(message).username // Checar Caller
        // POINTS.JSON ---------------------------------------------------
        //
        //LEVEL UP CHECKER
        //-----------------------------------------------------
    let curLevel = Math.floor(0.18 * Math.sqrt(userData.points));
    let forNext = Math.trunc(Math.pow((userData.level + 1) / 0.18, 2));
    if (curLevel > userData.level) {
        // Level up!
        userData.level = curLevel;
        // message.reply(`upou pro level **${curLevel}**!`);
        let tgta = message.author
        let tgtaData = points[tgta.id];
        console.log("LEVEL UP EVENT FOR " + tgta)
        let img = tgta.avatarURL.substr(0, tgta.avatarURL.length - 10)
        gear.glassify(img, caller)
        setTimeout(function () {
            Jimp.read(`${paths.GLASS}/${caller}.png`).then(function (photo) {
                Jimp.read(paths.BUILD + 'levelcard.png').then(function (cart) {
                    Jimp.loadFont(paths.FONTS + 'HEADING.fnt').then(function (head) { // load font from .fnt file
                        Jimp.loadFont(paths.FONTS + 'BIG.png.fnt').then(function (sub) {
                            try {
                                var level = tgtaData.level.toString()
                            }
                            catch (err) {
                                var level = "00"
                            }
                            var next = Math.trunc(Math.pow((Number(level) + 1) / 0.18, 2));
                            if (level.length == 1) {
                                level = `0${level}`
                            }
                            else if (level === undefined) {
                                level = `XX`
                            }
                            cart.print(head, 153, 3, message.guild.member(tgta).displayName);
                            cart.print(sub, 336, 45, `${level}`);
                            cart.composite(photo, 18, 20)
                            cart.write(`${paths.CARDS}/up/${caller}.png`)
                        })
                    });
                });
            });
        }, 1000);
        setTimeout(function () {
            message.channel.sendFile(`${paths.CARDS}/up/${caller}.png`)
        }, 2000);
        setTimeout(function () {
            //    message.channel.sendMessage("NADA");
        }, 3000);
    }
    // [END] POINTS.JSON --------------------------------------------------------------------------------------------------
    const params = message.content.split(" ").slice(1);
    // BLACKJACK
    if (message.content.startsWith(prefix + "ccc")) {
        var array = ["H/Q", "S/4", "S/A", "C/K", "D/7"]
        console.log(array)
    };
    //Avatar Fetcher
    //-----------------------------------------------------
    if (message.content.includes(prefix + "avi")) {
        console.log("AVATAR VIEW INVOKED by " + caller + "-------------\n")
        message.channel.sendFile(message.author.avatarURL.substr(0, message.author.avatarURL.length - 10))
    }
    //
    //Glassify
    //-----------------------------------------------------
    //
    //RPG Bar
    //-----------------------------------------------------
    if (message.content.startsWith(prefix + "bar")) {
        if (message.content.length < 6) {
            return
        }
        console.log("BAR INVOKED by " + caller)
        opt = message.content.split(" ")
            //200x26
        var perc = opt[1]
        var stret = 200 * perc / 100
        Jimp.read(paths.BUILD + "bar.png").then(function (bar) {
            Jimp.read(paths.BUILD + "holder.png").then(function (hold) {
                bar.resize(stret - 17, 26)
                hold.composite(bar, 17, 0)
                hold.write(`${paths.MISC}/${caller}.png`);
                console.log("Success!");
            });
        });
        setTimeout(function () {
            message.channel.sendFile(`${paths.MISC}/${caller}.png`)
        }, 2000);
    };
    //
    //RANK
    //-----------------------------------------------------
    if (message.content.includes("biscoito")) {
        userData.cookies >= 0 ? userData.cookies -= 1 : userData.cookies = 0;
        console.log("Heresia Detected")
    }
    //
    //Avatar Fetcher
    //-----------------------------------------------------
    gear.writePoints(points, caller)
        // Admin Checker
    if (message.content.startsWith(prefix + "adm")) {
        tgt = message.guild.member(gear.checkment(message))
        let myRole = message.guild.roles.find("name", "ADM");
        if (tgt.roles.exists("name", "ADM")) {
            message.reply(tgt.displayName + " é Admin sim!");
        }
        else if (tgt.roles.exists("name", "MOD")) {
            message.reply(tgt.displayName + " não é Admin mas é Mod, serve?");
        }
        else {
            message.reply("definitivamente not admin");
        }
    };
    //
    //Profile Card
    //-----------------------------------------------------
    //
    //Reactions
    //-----------------------------------------------------
    if (message.content.startsWith(prefix + "salty")) {
        message.channel.sendFile(paths.REACTIONS + "juba.png")
    };
    if (message.content.startsWith(prefix + "potdrop")) {
        tgt = message.guild.member(gear.checkment(message))
        let myRole = message.guild.roles.find("name", "ADM");
        if (tgt.roles.exists("name", "ADM")) {
            droprate = 1
        }
        else if (tgt.roles.exists("name", "MOD")) {
            message.reply("Somente os almighty Admins podem dropar potes");
        }
        else {
            message.reply("Somente os almighty Admins podem dropar potes");
        }
    };
    if (message.content.startsWith(prefix + "vidal")) {
        message.channel.sendFile(paths.REACTIONS + "vidaru.png")
    };
    if (message.content.startsWith(prefix + "hook")) {
        console.log("HOOK INVOKED")
        hook.sendSlackMessage({
            'username': 'Falk'
            , 'attachments': [{
                'avatar': 'https://cdn.discordapp.com/attachments/249641789152034816/272620679755464705/fe3cf46fee9eb9162aa55c8eef6a300c.jpg'
                , 'pretext': 'All systems go!'
                , 'color': '#C0B', //'footer_icon': 'http://snek.s3.amazonaws.com/topSnek.png',
                // 'footer': 'Powered by sneks',
                'ts': Date.now() / 1000
      }]
        }).catch(console.error);
    };
    if (message.content.startsWith(prefix + "say")) {
        message.channel.sendMessage(message.content.substr(5))
    };
    if (reactions[message.content]) {
        message.channel.sendMessage(reactions[message.content]);
    }
    /*if (current_hour == 23 && counter < 1) {
        msg.guild.defaultChannel.sendMessage("Vão dormir seus caralho!")
        counter = true
        console.log("vaidormi")
    }
    else if (current_hour != 23) {
        counter = false
    }*/
    // console.log("DROPRATE " + droprate)
    if (droprate >= 1000 && droprate < 1101) {
        message.guild.defaultChannel.sendFile(paths.BUILD + 'cookie.png', 'Cookie.png', "OLHA GENTE! Um cookie! quem digitar \`+pick\` primeiro leva! ").then(function (cookpot) {
            gear.vacuum.push(cookpot)
        })
        gear.drops++
            console.log("------------=========== ::: NATURAL DROP")
    }
    if (droprate <= 5) {
        message.guild.defaultChannel.sendFile(paths.BUILD + 'cookipot.jpg', 'Cookipot.jpg', "EITA PORRA! Um pote inteiro de cookies! quem digitar \`+pick\` primeiro leva! ").then(function (cookpot) {
            gear.vacuum.push(cookpot)
        })
        gear.drops += 10
        console.log("------------=========== ::: NATURAL RARE DROP ::: ===")
    }
    var aaa = []
    if (message.content.startsWith(prefix + "test")) {
        message.channel.sendMessage("teste")
    }
    //-----------------------------------------------------
    //                                           END
    //-----------------------------------------------------
});
//--Presence Update
bot.on('guildMemberAdd', (member) => {
    member.guild.defaultChannel.sendMessage(`Ae galera, ${member.user.username} acabou de entrar!`)
});
bot.on('guildMemberRemove', (member) => {
    member.guild.defaultChannel.sendMessage(` ${member.user.username} foi-se!`)
});
bot.on('ready', () => {
    av = gear.randomize(1, 6)
    bot.user.setAvatar('../avis/' + av + '.png', function (err) {
        if (err) throw err;
    });
    console.log('START');
    var ts = Date.now().toString()
    fs.createReadStream('../points.json').pipe(fs.createWriteStream('../backup/points_backup_' + ts + '.json'));
    // bot.setPlayingGame("Hyperdimension Neptunia")
    hook.sendSlackMessage({
            'username': 'Bot status'
            , 'attachments': [{
                'avatar': 'https://cdn.discordapp.com/attachments/249641789152034816/272620679755464705/fe3cf46fee9eb9162aa55c8eef6a300c.jpg'
                , 'pretext': `**Falk / Pollux** has been **updated**`
                , 'color': '#C04', //'footer_icon': 'http://snek.s3.amazonaws.com/topSnek.png',
                // 'footer': 'Powered by sneks',
                'ts': Date.now() / 1000
      }]
        })
        //  var aa = new Date();
    console.log("HOOK DEPLOYER");
    bot.user.setGame("Heroes of the Storm")
});
var made = false
var mado = false
bot.on('message', msg => {
    if (!msg.author.id == '88120564400553984') {
        return
    }
    var m = msg.content.toLowerCase()
    if (masterreactions[m]) {
        msg.channel.startTyping();
        setTimeout(function () {
            var a = gear.randomize(1, 10)
            try {
                msg.channel.sendMessage(masterreactions[m][a]);
            }
            catch (e) {
                console.log(e)
                msg.channel.sendMessage(masterreactions[m][0]);
            }
            msg.channel.stopTyping();
        }, 1000);
    }
})
bot.on('presenceUpdate', (me, mo) => {
    if (me.id == '88120564400553984') {
        console.log(mo.presence.status)
        var skynet = bot.guilds.get('248285312353173505')
        var engine = skynet.defaultChannel
        if (mo.presence.status == 'online'&&me.presence.status == 'offline') {p
            if (made == false) {
                var ind = gear.randomize(0,5)
                var mess =[
                    "Yay! Meu mestre chegou!"
                    ,"Ih, chegou o Flicky aí"
                    ,"Opa, ó só quem voltou"
                    ,"Flicky olha esses cara"
                    ,"Chegou o guei"
                    ,"Apareceu a margarida"
                ]
                engine.sendMessage(mess[ind])
            }
            made = true
            return
        }
        else if (mo.presence.status == 'offline') {
            if (mado == false) {
                engine.sendMessage("Galera, o Flicky saiu! Hora de tacar o terror no server!")
            }
            mado = true
        }
        else {
            made = false
            mado = false
        }
    }
});
bot.on('error', e => {
    console.log('MOREO');
    hook.sendMessage(":skull_crossbones: Falk MORREO")
        //  var aa = new Date();
        //console.log(aa.getHours());
});
process.on("unhandledRejection", err => {
    let crash = ":skull_crossbones: **Uncaught Promise Error:** \n" + err.stack;
    coreHook.sendSlackMessage({
        'username': 'Falk'
        , 'attachments': [{
            'avatar': 'https://cdn.discordapp.com/attachments/249641789152034816/272620679755464705/fe3cf46fee9eb9162aa55c8eef6a300c.jpg'
            , 'pretext': crash
            , 'color': '#C04', //'footer_icon': 'http://snek.s3.amazonaws.com/topSnek.png',
            // 'footer': 'Powered by sneks',
            'ts': Date.now() / 1000
      }]
    })
});
bot.login(cfg.token);
