const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client();
const getter = require('booru-getter');
var sortJson = require('sort-json');
var arraySort = require('array-sort');
var Jimp = require("jimp");
var cleverbot = require("cleverbot");
var droprate = 5000
let points = JSON.parse(fs.readFileSync('./points.json', 'utf8'));
const prefix = "+";
var ongoing = false
var responseObject = {
    "ayy": "Ayy, lmao!"
    , "wat": "Say what?"
    , "lol": "roflmaotntpmp"
};
var counter = 0
var drops = 0
var vacuum = []
var counter = false;
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
    //const RANK = points
const hook = new Discord.WebhookClient('272073532983345156', 'R9ZazRH9UWfojUO3wwEUTI45kQ21raefTRDxLZWwhgYXRP4_GB_2sNZHqpfoc8l3ayDL');
const coreHook = new Discord.WebhookClient('273496953990676480', '9W4LcooEqVzLsJ1OF3iyB3DxekIlUbGK2dShrtsgGB12x2cOQqCEwdH9He_FQ1d89rMH');
// START SHIT UP
cleverbot = new cleverbot("btewzf6MtZ3KHqGI", "lEJieBrDuHH0jpCmU4KjhzfXj4KcMwpB");
cleverbot.setNick("Falk")
bot.login("MjcxMzk0MDE0MzU4NDA1MTIx.C2Fy7Q.R4Fmoe-fKNsbPML_9zsBDzvQ6KA");
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

function checkCookies(amount, invoker) {
    if (invoker.cookies >= amount) {
        return true;
    }
    else {
        return false;
    }
}

function glassify(img, call, msg = false) {
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

function shuffle(array) {
    var currentIndex = array.length
        , temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

function draw(array, who) {
    var cardimg = new Jimp(array.length * 96, 147, function (err, image) {});
    console.log(array)

  //  if (array.length == 1) {
        Jimp.read(`${BUILD}/cards/${array[0].card}.png`).then(function (c1) {
            cardimg.composite(c1, 0 * 96, 0)
            cardimg.write(`${BUILD}/cards/${who}1_bj.png`)
        })
  //  }
        try{

  //  if (array.length == 2) {
        Jimp.read(`${BUILD}/cards/${array[1].card}.png`).then(function (c1) {
            cardimg.composite(c1, 1 * 96, 0)
            cardimg.write(`${BUILD}/cards/${who}2_bj.png`)
        })
        }catch(err){
            try{

  //  }
 //   if (array.length == 3) {
        Jimp.read(`${BUILD}/cards/${array[2].card}.png`).then(function (c1) {
            cardimg.composite(c1, 2 * 96, 0)
            cardimg.write(`${BUILD}/cards/${who}3_bj.png`)
        })
            }catch(err){//try
//    }
 //   if (array.length == 4) {
        try{
            Jimp.read(`${BUILD}/cards/${array[3].card}.png`).then(function (c1) {
            cardimg.composite(c1, 3 * 96, 0)
            cardimg.write(`${BUILD}/cards/${who}4_bj.png`)
        })
            }catch(err){//try
//    }
                try{
//    if (array.length == 5) {
        Jimp.read(`${BUILD}/cards/${array[4].card}.png`).then(function (c1) {
            cardimg.composite(c1, 4 * 96, 0)
            cardimg.write(`${BUILD}/cards/${who}5_bj.png`)
        })

                }catch(err){cardimg.write(`${BUILD}/cards/${who}_bj.png`)}




        }}}//catch

//    }
}
//===============================================================
//             BOT MESSAGE
//===============================================================
//
//----Cleverbot
cleverbot.create(function (err, session) {
    bot.on("message", message => {
        if (checkment(message).username != bot.user.username) return;
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

function add(a, b) {
    return a + b;
}
//----Message Digester
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
        var droprate = randomize(0, 2000);
        console.log("Drop Random " + droprate)
        userData.points++;
        userData.money += randomize(0, 5);
    }
    var caller = checkment(message).username // Checar Caller
        // POINTS.JSON ---------------------------------------------------
    if (message.content.startsWith(prefix + "personaltxt")) {
        userData.persotext = message.content.substr(13)
        message.reply(`Seu texto pessoal mudou para:

*` + message.content.substr(13) + `*

Digite \`+profile\` para visualizar ele em seu Profile Card~`)
    }
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
    // [END] POINTS.JSON --------------------------------------------------------------------------------------------------
    // BLACKJACK
    if (message.content.startsWith(prefix + "ccc")) {
        var array = ["H/Q", "S/4", "S/A", "C/K", "D/7"]
        console.log(array)
    };
    if (message.content.startsWith(prefix + "bj")) {
        console.log(ongoing)
        if (ongoing) {
            message.reply("failed")
            return;
        }
        stuff = message.content.toLowerCase().split(' ')
        if (isNaN(parseInt(stuff[1], 10))) {
            message.reply("failed")
            return;
        }
        if (checkCookies(stuff[1], userData) == false) {
            message.reply("failed")
            return;
        }
        ongoing = true
        var deck = []
        var naipes = ['H/', 'A/', 'S/', 'C/']
        var cards = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K']
        for (i = 0; i < 4; i++) {
            for (x = 0; x < 13; x++) {
                var card = {
                    card: naipes[i] + cards[x]
                    , value: x + 1
                }
                deck.push(card)
            }
        }
        var pile = shuffle(deck)
        var end = false
        var bank = []
        var play = []
        var playQ = 0
        var bankQ = 0
        if (end) return;
        //// SETUP------------------------------------------------------------------------------------------SETUP
        bank.unshift(pile[i])
        draw(bank, 'banc')
        setTimeout(function () {
            message.channel.sendMessage("My card:")
            message.channel.sendFile(`${BUILD}/cards/${'banc'+bank.length}_bj.png`)
        }, 1500);
        pile.splice(0, 1)
            //
        play.unshift(pile[i])
        draw(play, caller)
        setTimeout(function () { message.reply("Your card:").then(function (thread) {
            setTimeout(function () {
                message.channel.sendFile(`${BUILD}/cards/${caller+play.length}_bj.png`)
            }, 1800);
            if (end) {
                ongoing = false
                console.log(ongoing + " ongo")
                console.log(end + " end")
                return;
            }
            pile.splice(0, 1)
            for (crd in bank) {
                bankQ += bank[crd].value
            }
            for (crd in play) {
                playQ += play[crd].value
            }
            //-----------------------------------------------------------------------------------REPLY
           setTimeout(function () { message.channel.sendMessage("**1** Draw **2** Stop. I have:" + bankQ + ", You have:" + playQ) }, 2000);
                //pick or hold
            bot.on("message", newmsg => {
                if (end) {
                    ongoing = false
                    console.log(ongoing)
                    return;
                }
                //1 pick
                //2 hold
                bankQ = 0;
                playQ = 0;
                // pick
                if (newmsg.author == message.author && newmsg.content == "1") {
                    play.unshift(pile[i])
                    draw(play, caller)
                    setTimeout(function () {
                        message.reply("Your Random card is " + pile[i].card)
                        message.channel.sendFile(`${BUILD}/cards/${caller+play.length}_bj.png`)
                    }, 1800);
                    pile.splice(0, 1)
                    for (crd in play) {
                        console.log(play[crd].value + "+")
                        playQ += play[crd].value
                    }
                    console.log(playQ)
                    if (playQ > 21) {
                        message.reply("BLOW")
                        end = true;
                        ongoing = false
                        console.log(ongoing)
                        return;
                    }
                    if (bankQ < 18) {
                        bank.unshift(pile[i])
                        draw(bank, 'banc')
                        setTimeout(function () {
                            message.reply("My Random card is " + pile[i].card)
                            message.channel.sendFile(`${BUILD}/cards/${'banc'+bank.length}_bj.png`)
                        }, 1800);
                        pile.splice(0, 1)
                        for (crd in bank) {
                            console.log(bank[crd].value + "+")
                            bankQ += bank[crd].value
                        }
                    }
                    else {
                        message.reply("I hold")
                        if (bankQ >= playQ) {
                            message.reply("I win")
                            end = true;
                            ongoing = false
                            console.log(ongoing)
                            return;
                        }
                        else {
                            message.reply("You win")
                            end = true;
                            ongoing = false
                            console.log(ongoing)
                            return;
                        }
                    }
                    console.log(bankQ)
                    if (bankQ > 21) {
                        message.reply("BLOW")
                        end = true;
                        ongoing = false
                        console.log(ongoing)
                        return;
                    }
                    message.reply("1 pick 2 hold, Current sum is me:" + bankQ + " you:" + playQ)
                        //check blow
                }
                else if (newmsg.author == message.author && newmsg.content == "2") {
                    //hold
                    bank.unshift(pile[i])
                    draw(bank, 'banc')
                    setTimeout(function () {
                        message.reply("My Random card is " + pile[i].card)
                        message.channel.sendFile(`${BUILD}/cards/${'banc'+bank.length}_bj.png`)
                    }, 1800);
                    pile.splice(0, 1)
                    for (crd in bank) {
                        bankQ += bank[crd].value
                    }
                    for (crd in play) {
                        playQ += play[crd].value
                    }
                    message.reply("1 pick 2 hold, Current sum is me:" + bankQ + " you:" + playQ)
                        //check blow
                    if (bankQ > 21) {
                        message.reply("BLOW")
                        end = true;
                        ongoing = false
                        console.log(ongoing)
                        return;
                    }
                    //check higher
                    if (bankQ >= playQ) {
                        message.reply("I win")
                        end = true;
                        ongoing = false
                        console.log(ongoing)
                        return;
                    }
                    else {
                        message.reply("You win")
                        end = true;
                        ongoing = false
                        console.log(ongoing)
                        return;
                    }
                    return;
                }
                else {
                    // end = true;
                    // ongoing = false
                    // console.log(ongoing)
                    return;
                };
            });
        });}, 800);
    }
    //Avatar Fetcher
    //-----------------------------------------------------
    if (message.content.includes(prefix + "avi")) {
        console.log("AVATAR VIEW INVOKED by " + caller + "-------------\n")
        message.channel.sendFile(message.author.avatarURL.substr(0, message.author.avatarURL.length - 10))
    }
    //
    //Glassify
    //-----------------------------------------------------
    if (message.content.startsWith(prefix + "glassify")) {
        console.log("GLASSIFY INVOKED by " + caller + "-------------\n")
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
                console.log("Success!");
            });
        });
        setTimeout(function () {
            message.channel.sendFile(`${MISC}/${caller}.png`)
        }, 2000);
    };
    //
    //RANK
    //-----------------------------------------------------
    if (message.content.includes("biscoito")) {
        userData.cookies >= 0 ? userData.cookies -= 1 : userData.cookies = 0;
        console.log("Heresia Detected")
    }
    if (message.content == (prefix + "flip")) {
        var coin = randomize(1, 2);
        if (coin == 1) {
            message.channel.sendFile(BUILD + 'heads.png', 'heads.png', "Cara!")
        }
        else {
            message.channel.sendFile(BUILD + 'tails.png', 'tails.png', "Coroa!")
        }
    }
    if (message.content.startsWith(prefix + "betflip")) {
        if (checkCookies(3, userData) == false) {
            message.reply(" você não tem cookies suficientes. Você precisa pelo menos **3** :cookie:");
            return;
        }
        var bet = message.content.toLowerCase().split(' ');
        if (bet.length <= 2) {
            message.reply('Comando incorreto, use `+beflip <quantidade> <resultado>` Ex: `+betflip 5 cara`');
            return;
        }
        if (isNaN(parseInt(bet[1], 10))) {
            console.log("isnan")
            message.reply('Comando incorreto, use `+beflip <quantidade> <resultado>` Ex: `+betflip 5 cara`');
            return;
        };
        if (checkCookies(parseInt(bet[1]), userData) == false) {
            message.reply(" cê não tá com essa bola toda não...");
            return;
        };
        console.log(bet[2])
        if (bet[2] != "cara" && bet[2] != "coroa") {
            message.reply('Comando incorreto, use `+beflip <quantidade> <resultado>` Ex: `+betflip 5 cara`');
            return;
        }
        userData.cookies -= bet[1]
        var coin = randomize(1, 2);
        var res = ""
        var ros = ""
        coin == 1 ? res = "Cara" : res = "Coroa";
        coin == 1 ? ros = "heads.png" : ros = "tails.png";
        if (res.toLowerCase() == bet[2]) {
            message.channel.sendFile(BUILD + 'heads.png', 'heads.png', "Yay! " + res + "! Você ganhou **" + (bet[1] * 2) + "**")
            userData.cookies += bet[1] * 2
        }
        else {
            message.channel.sendFile(BUILD + ros, ros, "Putz! " + res + "! Você perdeu...")
        }
    }
    if (message.content.startsWith(prefix + "rank")) {
        console.log("RANK VIEW INVOKED by " + caller + "-------------\n")
        var rankItem = []
        var ranked = []
        for (var i in points) {
            rankItem.name = points[i].name
            rankItem.points = points[i].points
            rankItem.level = points[i].level
            ranked.push(rankItem)
            rankItem = []
        }
        arraySort(ranked, 'points', {
            reverse: true
        })
        console.log(ranked)
        let replyData = `
:first_place: 1st   **${ranked[0].name}**  Level ${ranked[0].level} :: ${ranked[0].points} Exp

:second_place: 2nd  **${ranked[1].name}** Level ${ranked[1].level} :: ${ranked[1].points} Exp

:third_place: 3rd   **${ranked[2].name}**  Level ${ranked[2].level} :: ${ranked[2].points} Exp

:medal: 4th **${ranked[3].name}**    Level ${ranked[3].level} :: ${ranked[3].points} Exp

:medal: 5th **${ranked[4].name}**    Level ${ranked[4].level} :: ${ranked[4].points} Exp

                        `
        message.channel.sendMessage(replyData)
    };
    //
    //Avatar Fetcher
    //-----------------------------------------------------
    fs.writeFile('./points.json', JSON.stringify(points), (err) => {
        console.log("JSON write event on " + caller + "'s activity -------------\n")
        if (err) console.log("JSON ERROR  on " + caller + "'s activity -------------\n" + err)
    });
    if (message.content.startsWith(prefix + "rule34")) {
        if (checkCookies(5, userData) == false) {
            message.reply(" você não tem cookies suficientes para comprar putaria. Você precisa pelo menos **5**");
            return;
        }
        userData.cookies -= 5;
        console.log("PUTARIA INVOKED by " + caller + "-------------\n")
        let query = message.content.split(" ");
        !query[1] ? query[1] = "furry" : query[1] = query[1];
        getter.getRandomLewd(query[1], (url) => {
            if (url === undefined) {
                message.reply("Teus pornô são tão bizarro que nem achei essa merda.")
            }
            else {
                message.channel.sendMessage("Foram debitados **5** :cookie: da sua conta.")
                message.reply("http:" + url);
            }
        })
    };
    if (message.content.startsWith(prefix + "safe")) {
        console.log("SAFEBOORU INVOKED by " + caller + "-------------\n")
        console.log(1)
        let query = message.content.split(" ");
        !query[1] ? query[1] = "1girl" : query[1] = query[1];
        getter.getRandom(query[1], (url) => {
            console.log(2)
            if (url === undefined) {
                message.reply("Não achei nada com essas tags :(")
            }
            else {
                message.reply('http:' + url)
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
        console.log("PROFILE VIEW INVOKED by " + caller + "-------------\n")
        let tgt = checkment(message)
        let tgtData = points[tgt.id];
        console.log("COMP INVOKED")
        let img = tgt.avatarURL.substr(0, tgt.avatarURL.length - 10)
        glassify(img, caller, message)
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
                                    cart.write(`${CARDS}${caller}.png`)
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
            message.channel.sendFile(`${CARDS}${caller}.png`)
        }, 2200);
    };
    if (message.content.startsWith(prefix + "announce")) {
        tgt = message.guild.member(checkment(message))
        let myRole = message.guild.roles.find("name", "ADM");
        if (tgt.roles.exists("name", "ADM")) {
            message.guild.defaultChannel.sendMessage(`:mega:  **Anúncio**
` + message.content.substr(10))
        }
        else if (tgt.roles.exists("name", "MOD")) {
            message.guild.defaultChannel.sendMessage(`:mega:  **Anúncio**
` + message.content.substr(10))
        }
        else {
            message.reply("Somente Admins e Mods podem criar anúncios");
        }
    };
    //
    //Reactions
    //-----------------------------------------------------
    if (message.content.startsWith(prefix + "salty")) {
        message.channel.sendFile(REACTIONS + "juba.png")
    };
    if (message.content.startsWith(prefix + "potdrop")) {
        tgt = message.guild.member(checkment(message))
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
        console.log("JOINED BY " + caller)
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
    /*if (current_hour == 23 && counter < 1) {
        msg.guild.defaultChannel.sendMessage("Vão dormir seus caralho!")
        counter = true
        console.log("vaidormi")
    }
    else if (current_hour != 23) {
        counter = false
    }*/
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

\`+pick\`
Pega cookies largados

\`$cook\`
Veja quantos cookies você tem

\`+personaltxt <texto>\`
Uma frase pro seu Profile Card

[] = _Argumento Opcional_
<> = _Argumento Obrigatório_

Invite: https://discordapp.com/oauth2/authorize?client_id=271394014358405121&scope=bot
`
        message.author.sendMessage(helptxt)
        console.log("HELP INVOKED")
        message.reply("Te enviei uns lance em pvt, dá um zóio.")
    };
    // console.log("DROPRATE " + droprate)
    if (droprate >= 1000 && droprate < 1101) {
        message.guild.defaultChannel.sendFile(BUILD + 'cookie.png', 'Cookie.png', "OLHA GENTE! Um cookie! quem digitar \`+pick\` primeiro leva! ").then(function (cookpot) {
            vacuum.push(cookpot)
        })
        drops++
        console.log("------------=========== ::: NATURAL DROP")
    }
    if (droprate <= 5) {
        message.guild.defaultChannel.sendFile(BUILD + 'cookipot.jpg', 'Cookipot.jpg', "EITA PORRA! Um pote inteiro de cookies! quem digitar \`+pick\` primeiro leva! ").then(function (cookpot) {
            vacuum.push(cookpot)
        })
        drops += 10
        console.log("------------=========== ::: NATURAL RARE DROP ::: ===")
    }
    if (message.content.startsWith('$cook')) {
        message.reply("voce tem " + userData.cookies + " cookies")
    }
    var aaa = []
    if (message.content.startsWith(prefix + "pick")) {
        //aaa.message.delete()
        ///console.log(aaa)
        console.log("Pick trial by" + caller)
        if (drops > 0) {
            console.log("----------- SUCCESSFUL PICK by" + caller)
            userData.cookies += drops
            message.channel.sendMessage("**" + message.author.username + "** pegou " + drops + " Cookie(s)").then(function (c) {
                message.delete()
                c.delete(500000)
            });
            //  message.channel.bulkDelete(vacuum);
            //    message.guild.defaultChannel.bulkDelete(vacuum);
            for (i in vacuum) {
                vacuum[i].delete()
            }
            //   message.channel.bulkDelete(vacuum);
            drops = 0
        }
        else {
            console.log("----------- FAILED PICK by" + caller)
                //   message.channel.bulkDelete(vacuum);
                //   message.guild.defaultChannel.bulkDelete(vacuum);
            for (i in vacuum) {
                vacuum[i].delete()
            }
            //message.channel.sendMessage("No Cookie");
        }
    };
    if (message.content.startsWith(prefix + "test")) {
        message.channel.sendMessage("teste")
    }
    if (message.content.startsWith(prefix + "drop")) {
        console.log("------------DROP by" + caller)
            // message.guild.defaultChannel.sendMessage()
        if (userData.cookies >= 1) {
            userData.cookies -= 1
            aaa = message.channel.sendFile(BUILD + 'cookie.png', 'Cookie.png', message.author.username + " largou um cookie :cookie: na sala! Quem digitar \`+pick\` primeiro leva! ").then(function (c) {
                vacuum.push(c)
            })
            drops++
            message.delete(1000)
        }
        else {
            message.reply("Você não tem cookies pra dropar...");
        }
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
    console.log('START');
    var ts = Date.now().toString()
    fs.createReadStream('points.json').pipe(fs.createWriteStream('./backup/points_backup_' + ts + '.json'));
    // bot.setPlayingGame("Hyperdimension Neptunia")
    hook.sendSlackMessage({
            'username': 'Falk'
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
