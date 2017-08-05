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
    if (Author.bot) return;   try{
    var Member = Server.member(Author); }catch(e){}
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
    if (message.channel.type === 'dm') {
       // message.reply(nope)
        // return
    }

    //HELP TRIGGER
    let helpkey = mm("helpkey",{lngs:message.lang})
if (MSG.split(" ")[1]==helpkey || MSG.split(" ")[1]=="?"|| MSG.split(" ")[1]=="help"){
    return gear.usage(cmd,message,this.cat);
}


      var perms = {
          MNG_MESS: mm("permission.MNG_MESS", {
              lngs: LANG
          }),
          ADD_REA: mm("permission.ADD_REA", {
              lngs: LANG
          })
      }
   try{
      if (!message.guild.member(message.botUser.user)
          .permissionsIn(message.channel)
          .hasPermission("ADD_REACTIONS")) {
          return message.reply(

              mm("error.iNeedThesePerms", {
                  lngs: LANG,
                  PERMSLIST: `:small_orange_diamond: **${perms.MNG_MESS+"\n:small_orange_diamond: "+perms.ADD_REA }**`
              })

          );
      };
     }catch(e){}
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
        let emb = new gear.Discord.RichEmbed
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


        let processing = new gear.Discord.RichEmbed;
        processing.setColor("#2bb955")
        m.clearReactions().catch(e => {

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
                ).catch(e=> {let a = (new Error); gear.errLog(e,__filename,a.stack.toString())});

                if (responses.size === 0) {

                } else {

                    let rea = responses.first()
                    let finder = reindex[rea.emoji]

                    //equals ARRitm
                    if (finder && rea.count > 0) {
                        // return message.reply("ok" + finder)

                        let pseudoequip = userDB.get(message.author.id).modules.medals;

                        pseudoequip[finder - 1] = medal_file;
                        processing.setDescription(getEquips(pseudoequip))

                        m.edit(v.youSure, {
                            embed: processing
                        }).then(async me => {
                            await me.clearReactions().catch(e => {

                            });
                            await me.react(check)
                            await me.react(xmark)


                            return new Promise(async resolve => {
                                const responses = await m2.awaitReactions(react =>
                                    react.users.has(Author.id), {
                                        maxEmojis: 1,
                                        time: 20000
                                    }
                                ).catch(e=> {let a = (new Error); gear.errLog(e,__filename,a.stack.toString())});
                                if (responses.size === 0) {} else {
                                    let rea = responses.first()
                                    if (rea.emoji == check && rea.count > 0) {

                                        let u = userDB.get(message.author.id);
                                        console.log(medal_file)
                                        u.modules.medals[finder - 1] = medal_file
                                        userDB.set(Author.id, u)
                                        me.delete().catch(e=> {let a = (new Error); gear.errLog(e,__filename,a.stack.toString())});
                                        return message.reply(check + v.success)

                                    }
                                    if (rea.emoji == xmark && rea.count > 0) {

                                        message.reply(xmark + v.cancelled)
                                        m.delete();
                                        message.delete();
                                        return
                                    }
                                }
                            })
                        })


                    }

                    if (rea.emoji == check && rea.count > 0) {

                        let inv = userDB.get(Author.id).modules.medalInventory
                        if (inv.includes(medal_file)) {

                            Channel.send(v.alreadyPosess).then(m => m.delete(2500))
                            return refresh(index, m, v.alreadyPosess)

                        }


                        m2.delete().catch(e=> {let a = (new Error); gear.errLog(e,__filename,a.stack.toString())})
                        message.reply(check + " " + v.confirmed)
                        message.delete().catch(e=> {let a = (new Error); gear.errLog(e,__filename,a.stack.toString())})
                        return gear.paramAdd(Author, "medalInventory", medal_file)
                    }







                    if (rea.emoji == xmark && rea.count > 0) {
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
            await m.react(nums[i + 1]).catch(e=> {let a = (new Error); gear.errLog(e,__filename,a.stack.toString())});
        }
                   await m.react("❎").catch(e=> {let a = (new Error); gear.errLog(e,__filename,a.stack.toString())});

        if (index !== 0) {
            await m.react("◀").catch(e=> {let a = (new Error); gear.errLog(e,__filename,a.stack.toString())});
        }
        if (index != menu.length - 1) {
            await m.react("▶").catch(e=> {let a = (new Error); gear.errLog(e,__filename,a.stack.toString())});
        }
        await m.react(xmark).catch(e=> {let a = (new Error); gear.errLog(e,__filename,a.stack.toString())})

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
            ).catch(e=> {let a = (new Error); gear.errLog(e,__filename,a.stack.toString())});

            if (responses.size === 0) {
                m.delete().catch(e=> {let a = (new Error); gear.errLog(e,__filename,a.stack.toString())});
                message.reply(v.timeout);
                message.delete().catch(e=> {let a = (new Error); gear.errLog(e,__filename,a.stack.toString())});
            } else {




                let rea = responses.first()
                let finder = reindex[rea.emoji]

                if (rea.emoji == xmark) {

                    message.reply(xmark + v.cancelled)
                    m.delete();
                    message.delete().catch(e=> {let a = (new Error); gear.errLog(e,__filename,a.stack.toString())});
                    return
                }

                //equals ARRitm
                if (finder && rea.count > 0) {
                    //return message.reply("ok" + finder)
                    let item = menuPage.menuArr[finder - 1]

                    processCheckout(item, index, m)

                }


                       if (rea.emoji === "❎" && rea.count > 0) {
                    //return message.reply("ok" + finder)
                    let item = [0,0]

                    processCheckout(item, index, m)

                }



                //equalsARROW
                if (rea.emoji === "▶" && rea.count > 0) {
                    console.log("index " + index)
                    console.log("===========CALL B >>")
                    return refresh(index + 1, m)

                } // arrow >> end
                if (rea.emoji === "◀" && rea.count > 0) {
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
