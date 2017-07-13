const Discord = require("discord.js")
const fs = require("fs");
const Jimp = require("jimp");
const Cafe = require("../archetypes/Cafe");
var gear = require("../gearbox.js");
var paths = require("../paths.js");
var locale = require('../../utils/multilang_b');
var mm = locale.getT();


var cmd = 'menu';

var init = function (message, userDB, DB) {
    var icon = [];
    var exfinni = 0;

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
    const rubymoj = bot.emojis.get('276878246589497344')
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

    Author.menuproc = true
    var emb = new Discord.RichEmbed();

    message.author.order = []

    emb.setColor('#e0579b')
    emb.title = "MENU"

    a = gear.randomize(2, 4)
    //emb.setAuthor('Pollux Statistics',bot.user.avatarURL,'https://github.com/LucasFlicky/polluxbot')
    //emb.setThumbnail('https://github.com/LucasFlicky/polluxbot/blob/master/avis/'+a+'.gif?raw=true')

    var emojya = bot.emojis.get('276878246589497344')
    let GOODMOJI = emojya
    let GOOD = 'Ruby'
    if (DB.get(Server.id).modules.GOODMOJI) {
        GOODMOJI = DB.get(Server.id).modules.GOODMOJI
    }
    if (DB.get(Server.id).modules.GOODNAME) {
        GOOD = DB.get(Server.id).modules.GOODNAME
    }

    //message.channel.sendEmbed(emb)


    if (Cafe.orderActive(Author.id)) {
        return message.reply(`Command already ongoing for this user.`);
    }

    const ORD = new Cafe(message);

    emb.setThumbnail("https://raw.githubusercontent.com/LucasFlicky/polluxbot/master/avis/skynet.png")
    //emb.setThumbnail("https://raw.githubusercontent.com/LucasFlicky/polluxbot/master/avis/display.png")
    // emb.setImage("https://raw.githubusercontent.com/LucasFlicky/polluxbot/master/avis/2.png")
    emb.description = "Ask your orders naturally, e.g.'I'd like a cake, please!'"

    emb.addField(ORD.MENU[0][2] + " " + ORD.MENU[0][1], "**" + ORD.MENU[0][0] + "** Rubys " + rubymoj, true)
    emb.addField(ORD.MENU[1][2] + " " + ORD.MENU[1][1], "**" + ORD.MENU[1][0] + "** Rubys " + rubymoj, true)
    emb.addField(ORD.MENU[2][2] + " " + ORD.MENU[2][1], "**" + ORD.MENU[2][0] + "** Rubys " + rubymoj, true)
    emb.addField(ORD.MENU[4][2] + " " + ORD.MENU[4][1], "**" + ORD.MENU[4][0] + "** Rubys " + rubymoj, true)


    return message.channel.sendEmbed(emb).then(async() => {

        //--start shit

        const balance = await userDB.get(Author.id).modules.goodies;
        await transaction(message, balance);
        ORD.finish();

    });





    function checkout(item) {
        var menu = ORD.MENU;
        let cart = []

        for (var i = 0; i < menu.length; i++) {
            if (cO(menu[i][1]) || cO(menu[i][2])) {
                cart.push(i);
                icon.push(menu[i][2]);
            }
        }

        function cO(inut) {
            return (item.toLowerCase()).includes(inut.toLowerCase())
        }
        return cart
    }
    function cost(cart) {
        var total = 0;
        for (var i = 0; i < cart.length; i++) {
            total += ORD.MENU[cart[i]][0];
            exfinni += ORD.MENU[cart[i]][3];
        }
        return total;
    }
    function transaction(msg, balance) {


            var a = mm('menu.cake', {
                lngs: LANG
            }).toLowerCase()
            var b = mm('menu.coffee', {
                lngs: LANG
            }).toLowerCase()
            var c = mm('menu.donut', {
                lngs: LANG
            }).toLowerCase()
            var d = mm('menu.donut2', {
                lngs: LANG
            }).toLowerCase()
            var e = mm('menu.eggplant', {
                lngs: LANG
            }).toLowerCase()
            var f = mm('menu.custard', {
                lngs: LANG
            }).toLowerCase()

        return new Promise(async resolve => {
            const responses = await msg.channel.awaitMessages(msg2 =>
                msg2.author.id === msg.author.id && (
                    msg2.content.includes('cancel') ||
                    msg2.content === 'c' ||
                    msg2.content.includes(a) ||
                    msg2.content.includes(b) ||
                    msg2.content.includes(c) ||
                    msg2.content.includes(d) ||
                    msg2.content.includes(f) ||
                    msg2.content.includes(e)
                ), {
                    maxMatches: 1,
                    time: 11e3
                }
            );


            console.log(responses)

            if (responses.size === 0) {
                message.reply(mm('menu.goaway', {
                    lngs: LANG
                }));
                ORD.finish();
                return resolve(true);
            }




            const action = responses.first().content.toLowerCase();

            if (action.includes('cancel') || action === 'c') {

                message.reply("CANCEL");
                ORD.finish();
                return resolve(true);
            }


            var sumcalc = [];
            var totale = 0;
            sumcalc = checkout(action)

            totale = cost(sumcalc)

            message.channel.sendMessage(` ${icon}
**Total:** ${totale}

OK?

\`ok\`confirm
\`c\` cancel`)


            const responsesB = await Channel.awaitMessages(msg2B =>
                msg2B.author.id === msg.author.id && (
                    msg2B.content.includes('cancel') ||
                    msg2B.content === 'c' ||
                    msg2B.content.includes('ok')
                ), {
                    maxMatches: 1,
                    time: 11e3
                }
            );

            if (responsesB.size === 0) {
                message.reply(mm('menu.goaway', {
                    lngs: LANG
                }));
                ORD.finish();
                return resolve(true);
            }

            const actionB = responsesB.first().content.toLowerCase();







            //  var total;


            if (actionB.includes('cancel') || actionB === 'c') {

                message.reply("CANCEL")
                ORD.finish()
            } else {


                if (balance < totale) {
                    message.reply(mm('$.noFundsGeneric', {
                        lngs: LANG,
                        goods: "Ruby"
                    }) + rubymoj);
                    return resolve(true);
                } else {



                    var factor = gear.randomize(10, 50)
                    message.channel.sendMessage(mm('menu.chargeA', {
                        lngs: LANG,
                        total: totale
                    }) + rubymoj + mm('menu.chargeB', {
                        lngs: LANG
                    }))
                    gear.paramIncrement(Author, "goodies", -totale)
                    let entrega = "There you go: " + icon + ". \n `you got " + exfinni + " bonus EXP `";
                    gear.paramIncrement(Author, "exp", exfinni)

                    setTimeout(function () {
                        message.reply(entrega)
                        ORD.finish()
                        return resolve(true);
                    }, 1000 * factor)

                    //}
                }

            }
            return resolve(true);
        });
    }


};


module.exports = {
    pub: true,
    cmd: cmd,
    perms: 3,
    init: init,
    cat: 'misc'
};
