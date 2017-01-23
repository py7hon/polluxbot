const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client();
const getter = require('booru-getter')
var Jimp = require("jimp");
bot.login("MjcxMzk0MDE0MzU4NDA1MTIx.C2Fy7Q.R4Fmoe-fKNsbPML_9zsBDzvQ6KA");
let points = JSON.parse(fs.readFileSync('./points.json', 'utf8'));
const prefix = "+";
var responseObject = {
    "ayy": "Ayy, lmao!"
    , "wat": "Say what?"
    , "lol": "roflmaotntpmp"
};
var counter = 0
    //
    //===============================================================
    //             PATHS
    //===============================================================
    //
const MISC = "./misc/"
const REACTIONS = "./imgres/reactions/"
const GLASS = "./misc/glassavi/"
const CARDS = "./imgres/usercards/"
const BUILD = "./imgres/build/"
const FONTS = "./fonts/"
const LVBAR = "./misc/levelbars/"
const hook = new Discord.WebhookClient('272073532983345156', 'R9ZazRH9UWfojUO3wwEUTI45kQ21raefTRDxLZWwhgYXRP4_GB_2sNZHqpfoc8l3ayDL');
//
//===============================================================
//             FUNCTIONS
//===============================================================
//
function checkAdm(origin, target) {
    if (origin.guild.member(target).roles.exists("name", "ADM")) {
        return "ADM";
    }
    else if (origin.guild.member(target).roles.exists("name", "MOD")) {
        return "MOD";
    }
    else if (origin.guild.member(target).roles.exists("name", "🎀   Maids")) {
        return "MAID";
    }
    else if (target.bot) {
        return "BOT";
    }
    else {
        return "none";
    }
};

function checkment(message) {
    let ment = message.mentions.users.first()
    let tgt = message.author;
    ment === undefined ? tgt = message.author : tgt = ment;
    return tgt
}

function glassify(img, call) {
    Jimp.read(img).then(function (user) {
        Jimp.read(BUILD + "glass.png").then(function (glass) {
            Jimp.read(BUILD + "note.png").then(function (lenna) {
                user.resize(126, 126)
                user.mask(glass, 0, 0)
                var air = {}
                Jimp.read(BUILD + "note.png").then(function (lennaB) {
                    lennaB.composite(user, 0, 0)
                    lennaB.mask(lenna, 0, 0)
                    lennaB.write(`${GLASS}/${call}.png`);
                });
            });
        })
    });
}

function randomize(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
//
//===============================================================
//             BOT MESSAGE
//===============================================================
//
bot.on("message", message => {
    var caller = checkment(message).username // Checar Caller
    if (message.author.bot) return; // Ignorar Bot
    // POINTS.JSON ---------------------------------------------------
    if (!points[message.author.id]) points[message.author.id] = {
        name: message.author.username
        , points: 0
        , level: 0
        , money: 0
        , medals: {}
        , flowers: 0
        , cookies: 0
        , "persotext": ""
    };
    let userData = points[message.author.id];
    userData.points++;
    userData.money += randomize(0, 5);
    //
    //LEVEL UP CHECKER
    //-----------------------------------------------------
    let curLevel = Math.floor(0.15 * Math.sqrt(userData.points));
    let forNext = Math.trunc(Math.pow((userData.level + 1) / 0.15, 2));
    if (curLevel > userData.level) {
        // Level up!
        userData.level = curLevel;
        // message.reply(`upou pro level **${curLevel}**!`);
        let tgta = message.author
        let tgtaData = points[tgta.id];
        console.log("COMP INVOKED")
        let img = tgta.avatarURL.substr(0, tgta.avatarURL.length - 10)
        glassify(img, caller)
        setTimeout(function () {
            Jimp.read(`${GLASS}/${caller}.png`).then(function (photo) {
                Jimp.read(BUILD + 'levelcard.png').then(function (cart) {
                    Jimp.loadFont(FONTS + 'HEADING.fnt').then(function (head) { // load font from .fnt file
                        Jimp.loadFont(FONTS + 'BIG.png.fnt').then(function (sub) {
                            try {
                                var level = tgtaData.level.toString()
                            }
                            catch (err) {
                                var level = "00"
                            }
                            var next = Math.trunc(Math.pow((Number(level) + 1) / 0.15, 2));
                            if (level.length == 1) {
                                level = `0${level}`
                            }
                            else if (level === undefined) {
                                level = `XX`
                            }
                            cart.print(head, 153, 3, message.guild.member(tgta).displayName);
                            cart.print(sub, 336, 45, `${level}`);
                            cart.composite(photo, 18, 20)
                            cart.write(`${CARDS}/up/${caller}.png`)
                        })
                    });
                });
            });
        }, 1000);
        setTimeout(function () {
            message.channel.sendFile(`${CARDS}/up/${caller}.png`)
        }, 2000);
        setTimeout(function () {
            //    message.channel.sendMessage("NADA");
        }, 3000);
    }
    // [END] POINTS.JSON ---------------------------------------------------
    //
    //Avatar Fetcher
    //-----------------------------------------------------
    if (message.content.includes(prefix + "avi")) {
        console.log("AVATAR VIEW INVOKED by " + caller)
        message.channel.sendFile(message.author.avatarURL.substr(0, message.author.avatarURL.length - 10))
    }
    //
    //Glassify
    //-----------------------------------------------------
    if (message.content.startsWith(prefix + "glassify")) {
        console.log("IMG INVOKED by " + caller)
        let img = message.author.avatarURL.substr(0, message.author.avatarURL.length - 10)
            // message.channel.sendFile(img)
            //  aImg = Jimp.read(img, function (err, image) {});
        glassify(img, caller)
        setTimeout(function () {
            message.channel.sendFile(`${GLASS}/${caller}.png`)
        }, 2000);
    };
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
        Jimp.read(BUILD + "bar.png").then(function (bar) {
            Jimp.read(BUILD + "holder.png").then(function (hold) {
                bar.resize(stret - 17, 26)
                hold.composite(bar, 17, 0)
                hold.write(`${MISC}/${caller}.png`);
                console.log("foi");
            });
        });
        setTimeout(function () {
            message.channel.sendFile(`${MISC}/${caller}.png`)
        }, 2000);
    };
    //
    //Avatar Fetcher
    //-----------------------------------------------------
    if (message.content.startsWith(prefix + "oldlevel")) {
        console.log("LEVEL INVOKED by " + caller)
        var perc = userData.points / forNext
        var stret = 200 * perc
        Jimp.read(BUILD + "bar.png").then(function (bar) {
            Jimp.read(BUILD + "holder.png").then(function (hold) {
                bar.resize(stret - 17, 26)
                hold.composite(bar, 17, 0)
                hold.write(`${LVBAR}/${caller}.png`);
                console.log("foi");
            });
        });
        setTimeout(function () {
            message.reply(`Seu level é **${userData.level}**, ${userData.points}/${forNext}XP`);
            message.channel.sendFile(`${LVBAR}/${caller}.png`)
        }, 2000);
    }
    fs.writeFile('./points.json', JSON.stringify(points), (err) => {
        if (err) console.error(err)
    });
    if (message.content.startsWith(prefix + "rule34")) {
        console.log("RULE34 INVOKED----------")
        let query = message.content.split(" ")
        !query[1] ? query[1] = "furry" : query[1]=query[1];
        getter.getRandomLewd(query[1], (url) => {

            if (url === undefined) {
                message.reply("Teus pornô são tão bizarro que nem achei essa merda.")
            }
            else {
                message.reply("http:" + url)
            }
        })
    };
      if (message.content.startsWith(prefix + "safe")) {
        console.log("SAFEBOORU INVOKED----------")
        console.log(1)
        let query = message.content.split(" ")
        !query[1] ? query[1] = "1girl" : query[1]=query[1];
        getter.getRandom(query[1], (url) => {
            console.log(2)
            if (url === undefined) {
                message.reply("Não achei nada com essas tags :(")
            }
            else {
                message.reply('http:'+url)
            }
        })
    };
    // Admin Checker
    if (message.content.startsWith(prefix + "adm")) {
        tgt = message.guild.member(checkment(message))
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
    if (message.content.startsWith(prefix + "profile") || message.content.startsWith(prefix + "level")) {
        let tgt = checkment(message)
        let tgtData = points[tgt.id];
        console.log("COMP INVOKED")
        let img = tgt.avatarURL.substr(0, tgt.avatarURL.length - 10)
        glassify(img, caller)
        setTimeout(function () {
            Jimp.read(`${GLASS}/${caller}.png`).then(function (photo) {
                Jimp.read(BUILD + 'cartela.png').then(function (cart) {
                    Jimp.read(BUILD + 'levbar.png').then(function (bar) {
                        let adm = checkAdm(message, tgt)
                        Jimp.read(BUILD + adm + '.png').then(function (tag) {
                            Jimp.loadFont(FONTS + 'HEADING.fnt').then(function (head) { // load font from .fnt file
                                Jimp.loadFont(FONTS + 'TXT.fnt').then(function (sub) {
                                    try {
                                        var level = tgtData.level.toString()
                                        var money = tgtData.money.toString()
                                        var exp = tgtData.points.toString()
                                    }
                                    catch (err) {
                                        var level = "00"
                                        var money = "00"
                                        var exp = "0000"
                                    }
                                    var next = Math.trunc(Math.pow((Number(level) + 1) / 0.15, 2));
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
                                        money = "INFINITE"
                                        exp = "99999"
                                        next = "99999"
                                        bar.resize(354, 18)
                                    };
                                    cart.print(head, 153, 3, message.guild.member(tgt).displayName);
                                    cart.print(head, 425, 37, `${level}`);
                                    cart.print(head, 290, 160, `${money}`);
                                    cart.print(sub, 74, 253, `${exp} / ${next}`);
                                    cart.print(sub, 172, 66, `${joinstamp}`);
                                    cart.composite(bar, 45, 231)
                                    cart.composite(photo, 18, 20)
                                    cart.composite(tag, 7, 182)
                                    cart.write(`${CARDS}/${caller}.png`)
                                })
                            });
                        });
                    });
                });
            });
        }, 1000);
        setTimeout(function () {
            message.channel.sendFile(`${CARDS}/${caller}.png`)
        }, 2000);
    };
    //
    //Reactions
    //-----------------------------------------------------
    if (message.content.startsWith(prefix + "salty")) {
        message.channel.sendFile(REACTIONS + "juba.png")
    };
    if (message.content.startsWith(prefix + "vidal")) {
        message.channel.sendFile(REACTIONS + "vidaru.png")
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
    if (message.content.startsWith(prefix + "joined")) {
        tgt = message.guild.member(checkment(message))
        let join = tgt.joinedAt
        let data = `**${tgt.displayName}** é membro desde: ${join.getDate()}/${join.getMonth()+1}/${join.getFullYear()} - ${join.toLocaleTimeString()}`;
        message.reply(data)
    };
    if (message.content.startsWith(prefix + "say")) {
        message.channel.sendMessage(message.content.substr(5))
    };
    if (responseObject[message.content]) {
        message.channel.sendMessage(responseObject[message.content]);
    }
    if (current_hour == 23 && counter < 1) {
        msg.guild.defaultChannel.sendMessage("Vão dormir seus caralho!")
        counter = true
        console.log("vaidormi")
    }
    else if (current_hour != 23) {
        counter = false
    }
    if (message.content.startsWith(prefix + "help")) {

       var helptxt = `
**Comandos disponíveis:**

\`+avi\`
Retorna o seu avatar, só isso.

\`+adm [@user]\`
Verifica se você ou @fulaninho é um Adm

\`+glassify\`
Faz umas viadage com teu avatar

\`+profile [@user]\`
Mostra o Profilecard seu ou de @fulaninho

\`+bar <1-100>\`
Uma barra X% cheia

\`+say <texto>\`
Repete <texto>

\`+joined [@user]\`
Retorna a data que você ou @fulaninho entrou no Server

\`+vidal\`
VIDAL VIDAL VIDAL VIDAL VIDAL VIDAL VIDAL VIDAL VIDAL VIDAL VIDAL VIDAL

\`+salty\`
QUIPE BOTE CARALHO

\`+safe [tags]\`
Imagens bonitas do Safebooru.

\`+rule34 [tags]\`
Putaria, usar no canal NSFW ou serás mutado.

\`+help\`
Abre isso

[] = _Argumento Opcional_
<> = _Argumento Obrigatório_

Invite: https://discordapp.com/oauth2/authorize?client_id=271394014358405121&scope=bot
`
        message.author.sendMessage(helptxt)
        console.log("HELP INVOKED")
        message.reply("Te enviei uns lance em pvt, dá um zóio.")

    };
    //-----------------------------------------------------
    //                                           END
    //-----------------------------------------------------
});

bot.on('guildMemberAdd', (member) => {
    member.guild.defaultChannel.sendMessage(`Ae galera, ${member.user.username} acabou de entrar!`)
});
bot.on('guildMemberRemove', (member) => {
    member.guild.defaultChannel.sendMessage(` ${member.user.username} vazou!`)
});
var date = new Date();
var current_hour = date.getHours();
var counter = false;
bot.on('ready', () => {
    console.log('START');
    var ts = Date.now().toString()
    fs.createReadStream('points.json').pipe(fs.createWriteStream('/backup/points_backup_' + ts + '.json'));
    // bot.setPlayingGame("Hyperdimension Neptunia")
    hook.sendSlackMessage({
            'username': 'Falk'
            , 'attachments': [{
                'avatar': 'https://cdn.discordapp.com/attachments/249641789152034816/272620679755464705/fe3cf46fee9eb9162aa55c8eef6a300c.jpg'
                , 'pretext': `**Falk / Pollux** is now **ONLINE** :white_check_mark:
All systems go!
`
                , 'color': '#C04', //'footer_icon': 'http://snek.s3.amazonaws.com/topSnek.png',
                // 'footer': 'Powered by sneks',
                'ts': Date.now() / 1000
      }]
        })
        //  var aa = new Date();
        console.log("HOOK DEPLOYER");
    bot.user.setGame("Heroes of the Storm")

});
bot.on('error', e => {
    console.log('MOREO');
    hook.sendMessage(":skull_crossbones: Falk MORREO")
        //  var aa = new Date();
        //console.log(aa.getHours());
});
process.on("unhandledRejection", err => {
    console.error("OH SHIT! Uncaught Promise Error: \n" + err.stack);
});
