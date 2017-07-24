const Jimp = require("jimp");
const Discord = require("discord.js");
const arraySort = require('array-sort')
const fs = require("fs");
const gear = require('../../gearbox.js')
var paths = require("../../paths.js");
var locale = require('../../../utils/multilang_b');
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


    //HELP TRIGGER
    let helpkey = mm("helpkey",{lngs:message.lang})
if (MSG.split(" ")[1]==helpkey || MSG.split(" ")[1]=="?"|| MSG.split(" ")[1]=="help"){
    return gear.usage(cmd,message);
}
//------------

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
    var nums = ['0⃣', '1⃣', '2⃣', '3⃣', '4⃣', '5⃣', '6⃣', '7⃣', '8⃣', '9⃣'];
    var reindex = {
        '0⃣': 0,
        '1⃣': 1,
        '2⃣': 2,
        '3⃣': 3,
        '4⃣': 4,
        '5⃣': 5,
        '6⃣': 6,
        '7⃣': 7,
        '8⃣': 8,
        '9⃣': 9
    };

    let inventory = userDB.get(message.author.id).modules.medalInventory

if (inventory == undefined){
    gear.paramDefine(Author,"medalInventory",[])
     inventory = userDB.get(message.author.id).modules.medalInventory

}

    if (inventory.length == 0) return Channel.send("No Medals to Equip");
    console.log(inventory)

    var equipArray = getEquips(userDB.get(message.author.id).modules.medals)

    var menu = []
    for (i = 0; i < inventory.length; i += 5) {
        menu.push(inventory.slice(i, i + 5))
    }



    console.log(menu)



    // Finders

    var arr = {}

    //Verbose
    var v = {
        equipMenu: mm("equip.equip", {
            lngs: LANG
        }),
        success: mm("equip.success", {
            lngs: LANG
        }),
        choose: mm("equip.choose", {
            lngs: LANG
        }),
        equip: mm("equip.equipSlot", {
            lngs: LANG
        }),
        youSure: mm("equip.youSure", {
            lngs: LANG
        }),
        confirmed: mm("equip.confirmed", {
            lngs: LANG
        }),
        cancelled: mm("equip.cancelled", {
            lngs: LANG
        }),
        timeout: mm("equip.timeout", {
            lngs: LANG
        }),
        pleaseWaitReas: mm("equip.pleaseWaitReas", {
            lngs: LANG
        })
    }

    var perms = {
        MNG_MESS: mm("permission.MNG_MESS", {
            lngs: LANG
        }),
        ADD_REA: mm("permission.ADD_REA", {
            lngs: LANG
        })

    }


    // Emojifest
    const medalEmoj = "🎖";
    const bkgEmoj = "🏔";
    const toolsEmoj = "📦";
    const check = bot.emojis.get("314349398811475968") || "✅";
    const xmark = bot.emojis.get("314349398824058880") || "❌";

    //Choose Shop


    //Machine


    callB(0);





    function createpage(peeji) {
        //NAVIGATION
        console.log(peeji)
        var ary = {}
        for (i = 1; i < peeji.length + 1; i++) {

            ary[nums[i]] = {
                name: peeji[i - 1], // ????
                icon: peeji[i - 1],
                price: 0
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
        emb.setColor("#e18f2f")
        emb.setTitle(":diamond_shape_with_a_dot_inside:" + v.equipMenu)
        emb.setDescription(v.choose)
        for (i = 0; i < menuArr.length; i++) {

            emb.addField(nums[i + 1], gear.emoji(menuArr[i][0]) + " **" + menuArr[i][1] + "**", true)
        }
            emb.addField(":negative_squared_cross_mark:", "UNEQUIP", true)

        return {
            embed: emb,
            menuArr: menuArr,
            reacts: pageObj
        }

    }

    function processCheckout(item, index, m) {



        console.log(item)
        let icon = gear.emoji(item[0])
        let medal_file = item
        // let price = item[1]
        let name = item[1]


        let processing = new Discord.RichEmbed;
        processing.setColor("#2bb955")
        m.clearReactions().catch(e => {
            message.reply(

                mm("error.iNeedThesePerms", {
                    lngs: LANG,
                    PERMSLIST: `**${perms.MNG_MESS}**`
                })

            );
        });
        processing.setTitle(v.equip) // EQUIP THIS?
        processing.setDescription(equipArray);

        m.edit({
            embed: processing
        }).then(async m2 => {



            for (i = 0; i < 8; i++) {
                await m.react(nums[i + 1]);
            }

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
                    let finder = reindex[rea.emoji]

                    //equals ARRitm
                    if (finder && rea.count > 1) {
                        // return message.reply("ok" + finder)

                        let pseudoequip = userDB.get(message.author.id).modules.medals;

                        pseudoequip[finder - 1] = medal_file;
                        processing.setDescription(getEquips(pseudoequip))

                        m.edit(v.youSure, {
                            embed: processing
                        }).then(async me => {
                            await me.clearReactions().catch(e => {
                                message.reply(mm("error.iNeedThesePerms", {
                                    lngs: LANG,
                                    PERMSLIST: `**${perms.MNG_MESS}**`
                                }));
                            });
                            await me.react(check)
                            await me.react(xmark)


                            return new Promise(async resolve => {
                                const responses = await m2.awaitReactions(react =>
                                    react.users.has(Author.id), {
                                        maxEmojis: 1,
                                        time: 20000
                                    }
                                ).catch();
                                if (responses.size === 0) {} else {
                                    let rea = responses.first()
                                    if (rea.emoji == check && rea.count > 1) {

                                        let u = userDB.get(message.author.id);
                                        console.log(medal_file)
                                        u.modules.medals[finder - 1] = medal_file
                                        userDB.set(Author.id, u)
                                        me.delete().catch();
                                        return message.reply(check + v.success)

                                    }
                                    if (rea.emoji == xmark && rea.count > 1) {

                                        message.reply(xmark + v.cancelled)
                                        m.delete();
                                        message.delete();
                                        return
                                    }
                                }
                            })
                        })


                    }

                    if (rea.emoji == check && rea.count > 1) {

                        let inv = userDB.get(Author.id).modules.medalInventory
                        if (inv.includes(medal_file)) {

                            Channel.send(v.alreadyPosess).then(m => m.delete(2500))
                            return refresh(index, m, v.alreadyPosess)

                        }


                        m2.delete().catch()
                        message.reply(check + " " + v.confirmed)
                        message.delete().catch()
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

    async function callB(index, recycle, messIn, optMsg, neoEmb) {

        console.log("FUNCTION: callB \n INDEX: " + index) //undefined?
        let current = index;
        var optMsg = optMsg || "";
        let menuPage = await buildPage(current)
        // console.log(menuPage)
        if (!recycle) {

            //TOSS
            return message.channel.sendEmbed(menuPage.embed).then(async m => pageResolve(m, menuPage, current))
        }

        if (neoEmb) {
            let item = menuPage.menuArr
            return processCheckout(item, index, messIn)
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
                   await m.react("❎");

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
                m.delete().catch();
                message.reply(v.timeout);
                message.delete().catch();
            } else {

                let rea = responses.first()
                let finder = reindex[rea.emoji]

                if (rea.emoji == xmark) {

                    message.reply(xmark + v.cancelled)
                    m.delete();
                    message.delete().catch();
                    return
                }
                //equals ARRitm
                if (finder && rea.count > 1) {
                    //return message.reply("ok" + finder)
                    let item = menuPage.menuArr[finder - 1]

                    processCheckout(item, index, m)

                }


                       if (rea.emoji == "❎" && rea.count > 1) {
                    //return message.reply("ok" + finder)
                    let item = [0,0]

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
        await m.clearReactions().catch(e => {
            message.reply(mm("error.iNeedThesePerms", {
                lngs: LANG,
                PERMSLIST: `**${perms.MNG_MESS}**`
            }));
        });
        return callB(index, true, m, optm);
    }

    function getEquips(equipped) {

        let equips = []
        for (i = 0; i < equipped.length; i++) {
            if (equipped[i][0]) {
                equips.push(gear.emoji(equipped[i][0]));
            } else {
                equips.push(nums[i + 1]);
            }
        }
        equips = equips.toString().replace(/,/g, " ")
        return equips
    }
} // MODULE END

module.exports = {
    pub: true,
    cmd: cmd,
    perms: 3,
    init: init,
    cat: 'misc'
};
