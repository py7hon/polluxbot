const Jimp = require("jimp");
const Discord = require("discord.js");
const arraySort = require('array-sort')
const fs = require("fs");
const gear = require('../gearbox.js')
var paths = require("../paths.js");
var locale = require('../../utils/multilang_b');
var mm = locale.getT();

var cmd = 'shop';

var init = async function (message, userDB, DB) {



    var start = Date.now();

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

/*



    let img = Target.defaultAvatarURL.substr(0, Target.defaultAvatarURL.length - 10).replace(/gif/g, "png")
    if (Target.avatarURL) {
        img = Target.avatarURL.substr(0, Target.avatarURL.length - 10).replace(/gif/g, "png");
    }

    let tgtData = userDB.get(Target.id).modules;

    //   let adm = gear.checkAdm(message, Target).toLowerCase()


    gear.superDefine(Target, "ID", Target.id)

    var ranked = []
    userDB.forEach(j => {
        var i = JSON.parse(j)
        var rankItem = {}
        rankItem.exp = i.modules.exp
        rankItem.id = i.ID
        rankItem.name = i.name
        ranked.push(rankItem)

    })

    arraySort(ranked, 'exp', {
        reverse: true
    })

    var Sranked = []
    userDB.forEach(j => {
        var i = JSON.parse(j)
        var SrankItem = {}
        if (Server.members.get(i.ID) == undefined) return;
        SrankItem.exp = i.modules.exp
        SrankItem.id = i.ID
        SrankItem.name = i.name
        Sranked.push(SrankItem)

    })

    arraySort(Sranked, 'exp', {
        reverse: true
    })



    if (userDB.get(Target.id).modules.bgID == undefined) {
        gear.paramDefine(Target, "bgID", "0")
    }
    if (userDB.get(Target.id).modules.rep == undefined) {
        gear.paramDefine(Target, "rep", 0)
    }
    if (userDB.get(Target.id).modules.bgInventory == undefined) {
        gear.paramDefine(Target, "bgInventory", [0])
    }
    if (userDB.get(Target.id).modules.medalInventory == undefined) {
        gear.paramDefine(Target, "medalInventory", [])
    }
    if (userDB.get(Target.id).modules.medals == undefined) {
        gear.paramDefine(Target, "medals", [0, 0, 0, 0, 0, 0, 0, 0])
    }
    if (userDB.get(Target.id).modules.medals.length == 0) {
        gear.paramDefine(Target, "medals", [0, 0, 0, 0, 0, 0, 0, 0])
    }

    if (Target.bot && Target.id != "271394014358405121") {
        gear.paramDefine(Target, "bgID", "bot")
    }



    let join = message.guild.member(Target).joinedAt
    let joinstamp = `${join.getDate()}/${join.getMonth()+1}/${join.getFullYear()} - ${join.toLocaleTimeString()}`;

    var favcolor = (userDB.get(Target.id).modules.favcolor || "2211EB")
    var backgroundId = userDB.get(Target.id).modules.bgID
    var medals = (userDB.get(Target.id).modules.medals || [0, 0, 0, 0, 0, 0, 0, 0])
    var persotex = (userDB.get(Target.id).modules.persotext || "I have no personal text because i'm lazy as a sloth.")
    var nametag = Target.username + "#" + Target.discriminator
    var nickname = Server.member(Target).displayName
    var rubys = (userDB.get(Target.id).modules.goodies.toString() || "00")
    var globalrank = "#" + (1 + ranked.findIndex(i => i.id === Target.id)).toString()
    var serverank = "#" + (1 + Sranked.findIndex(i => i.id === Target.id)).toString()
    var exp = userDB.get(Target.id).modules.exp.toString()
    var level = userDB.get(Target.id).modules.level.toString()
    var exptoNex = Math.trunc(Math.pow((Number(level) + 1) / 0.18, 2)).toString()
    var exptoThis = Math.trunc(Math.pow((Number(level)) / 0.18, 2)).toString()
    var frameofact = Math.trunc(Math.pow((Number(level) + 1) / 0.18, 2)) - Math.trunc(Math.pow((Number(level)) / 0.18, 2))
    // console.log(exptoThis)
    //console.log(frameofact)
    var percent = (((Number(exp) - Number(exptoThis)) / frameofact) * 100).toFixed(0)
    // var percent     = ((Number(exptoThis) / exptoNex)*100).toFixed(0)
    var membSince = joinstamp
    var rep = userDB.get(Target.id).modules.rep
    var propic = (Target.avatarURL.replace(/gif/g, "png") || Target.defaultAvatarURL.replace(/gif/g, "png"))
    rep = rep.toString()
    var medals = userDB.get(Target.id).modules.medals


    var m = `

favcolor:   ${favcolor}
medals:   ${medals}
persotex:   ${persotex}
nametag:   ${nametag}
nickname:   ${nickname}
rubys:   ${rubys}
globalrank:   ${globalrank}
serverank:   ${serverank}
exp:   ${exp}
level:   ${level}
exptoNex:   ${exptoNex}
percent:   ${percent}
membSince:   ${membSince}
rep:   ${rep}
`


*/


//Set global menu <---- Pull this from external JSON or smth
var menu = [
                 [
                 ["Fruki Guaraná", "fruki", 400]
                 , ["Twitch", "twitch", 400]
                 , ["SNES Controller", "snes", 400]
                 , ["Hylian Shield", "hyruleshield", 400]
                 , ["Hamburger", "burger", 400]
                 , ["Gardevoir", "gardevoir", 400]
             ], [
                  ["Pollux", "pollux", 1400]
             ]
                        ]

// Finders
var nums = ['0⃣', '1⃣', '2⃣', '3⃣', '4⃣', '5⃣', '6⃣', '7⃣', '8⃣', '9⃣'];
var arr = {}

//Verbose
    var v = {
        whatShop        : mm("shop.whatShop",{lngs:LANG}),
        medalShop       : mm("shop.medalShop",{lngs:LANG}),
        bgShop          : mm("shop.bgShop",{lngs:LANG}),
        goodShop        : mm("shop.goodShop",{lngs:LANG}),
        useBelow        : mm("shop.useBelow",{lngs:LANG}),
        noFundsFormal   : mm("shop.noFundsFormal",{lngs:LANG}),
        noFundsResponse : mm("$.noFunds",{lngs:LANG}),
        processing      : mm("shop.processing",{lngs:LANG}),
        youSure         : mm("shop.youSure",{lngs:LANG}),
        confirmed       : mm("shop.confirmed",{lngs:LANG}),
        cancelled       : mm("shop.cancelled",{lngs:LANG}),
        timeout         : mm("shop.timeout",{lngs:LANG}),
        alreadyPosess   : mm("shop.alreadyPosess",{lngs:LANG})
    }

// Emojifest
const medalEmoj = "🎖";
const bkgEmoj = "🏔";
const toolsEmoj = "📦";
const check = bot.emojis.get("314349398811475968") || "✅";
const xmark = bot.emojis.get("314349398824058880") || "❌";

//Choose Shop
let emb = new Discord.RichEmbed
emb.setColor("#5743c6")
emb.setTitle(v.whatShop)
emb.addField(v.bgShop, bkgEmoj, true)
emb.addField(v.medalShop, medalEmoj, true)
emb.addField(v.goodShop, toolsEmoj, true)
emb.setFooter(v.useBelow)



//Machine
message.channel.send({
    embed: emb
}).then(async msg => {
    //Add Options
    await msg.react(bkgEmoj)
    await msg.react(medalEmoj)
    await msg.react(toolsEmoj)
    await msg.react(xmark)

    //Check Inputs
    return new Promise(async resolve => {


        const responses = await msg.awaitReactions(react =>
            react.users.has(Author.id), {
                maxEmojis: 1,
                time: 20000
            } // has no foolproof for custom added reactions yet
        ).catch();
        if (responses.size === 0) {
            msg.delete();
            message.reply(v.timeout);
            message.delete();
        } else {

            let rea = responses.first()

            // if X
            if (rea.emoji == xmark) {
                message.reply(xmark + v.cancelled)
                msg.delete();
                message.delete();
                return
            }
            //if Background
            if (rea.emoji == bkgEmoj) {
                msg.delete();
                return message.reply("Unavailable");
              //  return callA(0) // call s shop
            }
            //if Medal
            if (rea.emoji == medalEmoj) {
                msg.delete();
                return callB(0) // call s shop
            }
            //if Goodies
            if (rea.emoji == toolsEmoj) {
                msg.delete();
                return message.reply("Unavailable");
               // return callC(0) // call s shop
            }
        }




    })

})

function createpage(peeji) {


    var ary = {}
    for (i = 1; i < peeji.length + 1; i++) {

        ary[nums[i]] = {
            name: peeji[i - 1][0], // ????
            icon: peeji[i - 1][1],
            price: peeji[i - 1][2]
        }
    }

    return ary;

}
function buildPage(page) {

    console.log("FUNCTION: buildPage \n CURRPAGE: " + page)
    let currentPage = page || 0;
    let menuArr = menu[currentPage]; // MENU IS GLOBAL
    let pageObj = createpage(menu[currentPage]); // reaction pagination
    let emb = new Discord.RichEmbed
    emb.setColor("#e12f55")
    emb.setTitle(medalEmoj + " "+v.medalShop.toUpperCase())
    for (i = 0; i < menuArr.length; i++) {
        // emb.addField("1","1",true)
        emb.addField(nums[i + 1], gear.emoji(menuArr[i][1]) + " **" + menuArr[i][0] + "** \n" + gear.emoji("ruby") + " **" + menuArr[i][2] + "** Rubys", true)
    }

    return {
        embed: emb,
        menuArr: menuArr,
        reacts: pageObj
    }

}
function processCheckout(item, index, m) {

    let icon = gear.emoji(item[0])
    let medal_file = item[0]
    let price = item[1]
    let name = item[2]

    let funds = gear.checkGoods(price, Author)
    if (!funds) {
        Channel.send(v.noFundsResponse).then(m => m.delete(2500))
        return refresh(index, m, v.noFundsFormal)
    };
    let processing = new Discord.RichEmbed;
    processing.setColor("#2bb955")
    m.clearReactions();
    processing.setTitle(v.processing)
    processing.setDescription(`${icon} ${name} :: ${gear.emoji("ruby")}**${price}**
${v.youSure}`)
    m.edit({
        embed: processing
    }).then(async m2 => {


        await m2.react(check)
        await m2.react(xmark)


        return new Promise(async resolve => {

            const responses = await m2.awaitReactions(react =>
                react.users.has(Author.id), {
                    maxEmojis: 1,
                    time: 20000
                }
            ).catch();

            if (responses.size === 0) {

            } else {

                let rea = responses.first()

                if (rea.emoji == check && rea.count > 1) {

                    let inv= userDB.get(Author.id).modules.medalInventory
                    if(inv.includes(medal_file)){

                        Channel.send(v.alreadyPosess).then(m => m.delete(2500))
                        return refresh(index, m, v.alreadyPosess)

                    }


                    m2.delete()
                    message.reply(check + " "+v.confirmed)
                    message.delete()
                    return gear.paramAdd(Author, "medalInventory", medal_file)
                }
                if (rea.emoji == xmark && rea.count > 1) {
                    //m.delete()
                    return refresh(index, m)


                }
            } // await emmiter end

        })


    })


}

async function callB(index, recycle, messIn, optMsg) {

    console.log("FUNCTION: callB \n INDEX: " + index) //undefined?
    let current = index;
    var optMsg = optMsg || "";
    let menuPage = await buildPage(current)
    // console.log(menuPage)
    if (!recycle) {

        //TOSS
        return message.channel.sendEmbed(menuPage.embed).then(async m => pageResolve(m, menuPage, current))
    }
    return messIn.edit(optMsg, {
        embed: menuPage.embed
    }).then(async m => pageResolve(m, menuPage, current))
    //return await messIn.delete();
    // return await Channel.sendEmbed(menuPage.embed).then(async m => pageResolve(m, menuPage,current))
}
async function loadMedalShop(m, menuPage, index) {

    console.log("FUNCTION: loadMedalShop")
    for (i = 0; i < menuPage.menuArr.length; i++) {
        await m.react(nums[i + 1]);
    }
    if (index !== 0) {
        await m.react("◀");
    }
    if (index != menu.length - 1) {
        await m.react("▶");
    }
    await m.react(xmark)

}
async function pageResolve(m, menuPage, index) {

    var index = index || 0;


    console.log("FUNCTION: pageResolve \n INDEX: " + index)
    //generate list for this page
    loadMedalShop(m, menuPage, index)

    //reactmonitor
    return new Promise(async resolve => {

        const responses = await m.awaitReactions(react =>
            react.users.has(Author.id), {
                maxEmojis: 1,
                time: 20000

            }
        ).catch();

        if (responses.size === 0) {
            m.delete();
            message.reply(v.timeout);
            message.delete();
        } else {

            let rea = responses.first()
            let finder = menuPage.reacts[rea.emoji]

            if (rea.emoji == xmark) {

                message.reply(xmark + v.cancelled)
                m.delete();
                message.delete();
                return
            }
            //equals ARRitm
            if (finder && rea.count > 1) {
                //return message.reply("ok" + gear.emoji(finder.icon))

                let item = [finder.icon,
                finder.price,
                finder.name]
                processCheckout(item, index, m)

            }
            //equalsARROW
            if (rea.emoji == "▶" && rea.count > 1) {
                console.log("index " + index)
                console.log("===========CALL B >>")
                return refresh(index + 1, m)

            } // arrow >> end
            if (rea.emoji == "◀" && rea.count > 1) {
                console.log("index " + index)
                console.log("===========CALL B <<")
                return refresh(index - 1, m) // << this call errors
            } // arrow >> end
        } // await emmiter end

    })

}
async function refresh(index, m, optm) {
    await m.clearReactions();
    return callB(index, true, m, optm);
}

} // MODULE END

module.exports = {
    pub: true,
    cmd: cmd,
    perms: 3,
    init: init,
    cat: 'misc'
};
