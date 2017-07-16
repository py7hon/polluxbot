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
    ///-------------------------------------------------------------------------------------
    ///-------------------------------------------------------------------------------------
    ///-------------------------------------------------------------------------------------
    ///-------------------------------------------------------------------------------------
    ///----------------------------            START      ----------------------------------
    ///-------------------------------------------------------------------------------------
    ///-------------------------------------------------------------------------------------
    ///-------------------------------------------------------------------------------------
    ///-------------------------------------------------------------------------------------



    //Set global menu
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

    var nums = ['0⃣', '1⃣', '2⃣', '3⃣', '4⃣', '5⃣', '6⃣', '7⃣', '8⃣', '9⃣'];
    var arr = {}

    createpage(menu[0])




    //menu embed build and send

    let emb = new Discord.RichEmbed
    emb.setTitle("What Shop?")
    emb.addField("Background Shop", ":regional_indicator_a:", true)
    emb.addField("Medal Shop", ":regional_indicator_b:", true)
    emb.addField("Goodies Shop", ":regional_indicator_c:", true)
    emb.setFooter("Use the Reactions below")

    message.channel.sendEmbed(emb).then(async msg => {

        //menu reas add
        await msg.react("🇦")
        await msg.react("🇧")
        await msg.react("🇨")


        return new Promise(async resolve => {


            const reacts = await bot.on("messageReactionAdd", rea => {
            //    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAA")
                //detect B
                if (rea.emoji == "🇧" && rea.count > 1 && rea.message.id == msg.id && rea.users.has(Author.id)) {
                    bot.removeListener("messageReactionAdd", a => {console.log(a)});
                    msg.delete();
                    console.log("===========CALL B 1")
                    return callB() // call s shop
                }

            })
        })

    })



      function createpage(peeji) {

        for (i = 1; i < peeji.length; i++) {

            arr[nums[i]] = {
                name: peeji[i - 1][0], // ????
                icon: peeji[i - 1][1],
                price: peeji[i - 1][3]
            }
            // console.log(arr)
        }
        return arr;

    }


                async function callB(index,recycle, messIn) {

                    console.log("FUNCTION: callB \n INDEX: "+index)
                    let current = index || 0;
                    let menuPage = buildPage(current)

                    if (!recycle){

                    //TOSS
                    return message.channel.sendEmbed(menuPage.embed).then(async m => pageResolve(m, menuPage,current))
                    }
                    return messIn.edit("",{embed:menuPage.embed}).then(async m => pageResolve(m, menuPage,current))
                     //return await messIn.delete();
                   // return await Channel.sendEmbed(menuPage.embed).then(async m => pageResolve(m, menuPage,current))
                }


                function buildPage(page) {

                    console.log("FUNCTION: buildPage \n CURRPAGE: "+page)
                    let currentPage = page || 0;
                    let menuArr = menu[currentPage]; // MENU IS GLOBAL
                    let pageObj = createpage(menu[currentPage]); // reaction pagination
                    let emb = new Discord.RichEmbed

                    emb.setTitle("MEDAL SHOP")
                    for (i = 0; i < menuArr.length; i++) {
                        emb.addField("1","1",true)
                       // emb.addField(nums[i + 1], gear.emoji(menuArr[i][1]) + " **" + menuArr[i][0] + "** \n" + gear.emoji("ruby") + " **" + menuArr[i][2] + "** Rubys", true)
                    }

                    return {
                        embed: emb,
                        menuArr: menuArr,
                        reacts: pageObj
                    }

                }


                async function loadMedalShop(m, menuPage, index) {

                    console.log("FUNCTION: loadMedalShop")
                    for (i = 0; i < menuPage.menuArr.length; i++) {
                        await m.react(nums[i + 1]);
                    }
                    if (index !== 0){
                    await m.react("◀");
                    }
                    if (index != menu.length-1){
                    await m.react("▶");
                    }
                }



                async function pageResolve(m, menuPage, index) {

                    var index = index || 0;
                    console.log("FUNCTION: pageResolve \n INDEX: "+index)
                    //generate list for this page
                    loadMedalShop(m, menuPage, index)

                    //reactmonitor
                    const reactsB = await bot.on("messageReactionAdd", async rea => {
                console.log("rea")
                        if (rea.message.id != m.id && !rea.users.has(Author.id)) return;
                        bot.removeListener("messageReactionAdd", () => {});


                        //equals ARRitm
                        if (arr[rea.emoji] && rea.count > 1) {
                            return message.reply("ok" + gear.emoji(arr[rea.emoji].icon))
                        }
                        //equalsARROW
                        if (rea.emoji == "▶" && rea.count > 1) {
                            console.log("index "+index)
                            console.log("===========CALL B >>")
                            //await m.clearReactions();
                            return callB(index+1,true,m)
                        } // arrow >> end
                        if (rea.emoji == "◀" && rea.count > 1) {
                            console.log("index "+index)
                            console.log("===========CALL B <<")
                            //await m.clearReactions();
                            return callB(index-1,true,m) // << this call errors
                        } // arrow >> end
                    }) // await emmiter end

                }



} // MODULE END


//    ◀️ CANT FIND LENGHT OF PEEJI (insert with createpage)

/*
             set menu (global available)
             make pages (max 6)
             pages >> menu

         Menu embed send --
         menu reactions add --

         detect(B){  call B  }

             B(args){

            current page 0 --
             send menu page 1 --
             toss(pageresolve(message + menu page))

             }

             toss/resolve(m and mp){  >> process, does not return

             }

             /*







             /*   const responses = await Channel.awaitMessages(msg2 =>
                    msg2.content === '+pick', {
                        maxMatches: 1
                    }
                ).catch("DROP.JS 67 -- ERROR");
                if (responses.size === 0) {} else {
                    if (oldDropsly > Channel.DROPSLY) {

                        return resolve(true);
                    }

                    let Picker = responses.first().author


                    console.log("----------- SUCCESSFUL PICK by" + Picker.username)
                    message.channel.sendMessage(mm('$.pick', {
                        lngs: LANG,
                        good: GOOD,
                        user: Picker.username,
                        count: Channel.DROPSLY,
                        emoji: ""
                    }) + " " + emojya).then(function (c) {

                        c.delete(500000)
                        r.delete(0)
                    }).catch();

                    gear.paramIncrement(Picker, 'goodies', Channel.DROPSLY)
                    gear.paramIncrement(Picker, 'earnings.drops', Channel.DROPSLY)
                    Channel.DROPSLY = 0


                    return resolve(true);

                }
                return resolve(true);
            })

         */




module.exports = {
    pub: true,
    cmd: cmd,
    perms: 3,
    init: init,
    cat: 'misc'
};
