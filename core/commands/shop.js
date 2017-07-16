
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

return;

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





    let img = Target.defaultAvatarURL.substr(0, Target.defaultAvatarURL.length - 10).replace(/gif/g,"png")
    if (Target.avatarURL) {
        img = Target.avatarURL.substr(0, Target.avatarURL.length - 10).replace(/gif/g,"png");
    }

    let tgtData = userDB.get(Target.id).modules;

 //   let adm = gear.checkAdm(message, Target).toLowerCase()


gear.superDefine(Target,"ID",Target.id)

        var ranked = []
        userDB.forEach(j=>{
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
        userDB.forEach(j=>{
            var i = JSON.parse(j)
            var SrankItem = {}
            if (Server.members.get(i.ID)==undefined) return;
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

    var favcolor    = (userDB.get(Target.id).modules.favcolor || "2211EB")
    var backgroundId    = userDB.get(Target.id).modules.bgID
    var medals      = (userDB.get(Target.id).modules.medals || [0,0,0,0,0,0,0,0])
    var persotex    = (userDB.get(Target.id).modules.persotext || "I have no personal text because i'm lazy as a sloth.")
    var nametag     = Target.username + "#" + Target.discriminator
    var nickname    = Server.member(Target).displayName
    var rubys       = (userDB.get(Target.id).modules.goodies.toString() || "00")
    var globalrank  = "#"+(1+ranked.findIndex(i => i.id === Target.id)).toString()
    var serverank   = "#"+(1+Sranked.findIndex(i => i.id === Target.id)).toString()
    var exp         = userDB.get(Target.id).modules.exp.toString()
    var level       = userDB.get(Target.id).modules.level.toString()
    var exptoNex    = Math.trunc(Math.pow((Number(level) + 1) / 0.18, 2)).toString()
    var exptoThis    = Math.trunc(Math.pow((Number(level)) / 0.18, 2)).toString()
    var frameofact = Math.trunc(Math.pow((Number(level) + 1) / 0.18, 2))-Math.trunc(Math.pow((Number(level)) / 0.18, 2))
    console.log(exptoThis)
    console.log(frameofact)
     var percent     = (((Number(exp) - Number(exptoThis)) / frameofact)*100).toFixed(0)
   // var percent     = ((Number(exptoThis) / exptoNex)*100).toFixed(0)
    var membSince   = joinstamp
    var rep         = userDB.get(Target.id).modules.rep
    var propic      = (Target.avatarURL.replace(/gif/g,"png") || Target.defaultAvatarURL.replace(/gif/g,"png"))
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






    let emb = new Discord.RichEmbed
        emb.setTitle("What Shop?")
        emb.addField("Background Shop",":regional_indicator_a:",true)
        emb.addField("Medal Shop",":regional_indicator_b:",true)
        emb.addField("Goodies Shop",":regional_indicator_c:",true)
        emb.setFooter("Use the Reactions below")

     message.channel.sendEmbed(emb).then(async msg =>{
        await msg.react("🇦")
        await msg.react("🇧")
        await msg.react("🇨")


         return new Promise(async resolve => {


             const reacts = await bot.on("messageReactionAdd",rea=>{

              if(rea.emoji == "🇧" && rea.count > 1 && rea.message.id == msg.id && rea.users.has(Author.id)){
                     callB()
              }


             }

             )


             var pages = [[

                 {name:"Gardevoir",price:400,tags:"pokemon", file:"8"},
                 {name:"Twitch",price:500,tags:"services", file:"2"},
                 {name:"Fruki Guaraná",price:250,tags:"products", file:"4"},
                 {name:" ",price:"---",tags:" ", file:"undefined"},
                 {name:" ",price:"---",tags:" ", file:"undefined"},
                 {name:" ",price:"---",tags:" ", file:"undefined"},
                 {name:" ",price:"---",tags:" ", file:"undefined"},
                 {name:" ",price:"---",tags:" ", file:"undefined"},
                 {name:" ",price:"---",tags:" ", file:"undefined"},
                 {name:" ",price:"---",tags:" ", file:"undefined"},
                 {name:" ",price:"---",tags:" ", file:"undefined"},
                 {name:" ",price:"---",tags:" ", file:"undefined"},
                 {name:" ",price:"---",tags:" ", file:"undefined"},
                 {name:" ",price:"---",tags:" ", file:"undefined"},
                 {name:" ",price:"---",tags:" ", file:"undefined"},
                 {name:" ",price:"---",tags:" ", file:"undefined"},
                 {name:" ",price:"---",tags:" ", file:"undefined"},
                 {name:" ",price:"---",tags:" ", file:"undefined"},
                 {name:" ",price:"---",tags:" ", file:"undefined"},
              ],
              [

                 {name:"Hamburger",price:400,tags:"food", file:"burger"}
             ]]

             var medals = pages[0]

             function callB(mess){

    Jimp.read(paths.MEDALS+ medals[0].file+'.png').then(function (md1) {
    Jimp.read(paths.MEDALS+ medals[1].file+'.png').then(function (md2) {
    Jimp.read(paths.MEDALS+ medals[2].file+'.png').then(function (md3) {
    Jimp.read(paths.MEDALS+ medals[3].file+'.png').then(function (md4) {
    Jimp.read(paths.MEDALS+ medals[4].file+'.png').then(function (md5) {
    Jimp.read(paths.MEDALS+ medals[5].file+'.png').then(function (md6) {
    Jimp.read(paths.MEDALS+ medals[6].file+'.png').then(function (md7) {
    Jimp.read(paths.MEDALS+ medals[7].file+'.png').then(function (md8) {
    Jimp.read(paths.MEDALS+ medals[8].file+'.png').then(function (md9) {
    Jimp.read(paths.MEDALS+ medals[9].file+'.png').then(function (md10) {
    Jimp.read(paths.MEDALS+ medals[10].file+'.png').then(function (md11) {
    Jimp.read(paths.MEDALS+ medals[11].file+'.png').then(function (md12) {
    Jimp.read(paths.MEDALS+ medals[12].file+'.png').then(function (md13) {
    Jimp.read(paths.MEDALS+ medals[13].file+'.png').then(function (md14) {
    Jimp.read(paths.MEDALS+ medals[14].file+'.png').then(function (md15) {
    Jimp.read(paths.MEDALS+ medals[15].file+'.png').then(function (md16) {
    Jimp.read(paths.MEDALS+ medals[16].file+'.png').then(function (md17) {
    Jimp.read(paths.MEDALS+ medals[17].file+'.png').then(function (md18) {

                 Jimp.read(paths.BUILD +'/store/mainframe.png').then(function (frame) {
                 Jimp.read(propic).then(function (pic) {


                     pic.resize(30, 30)
                     frame.composite(pic, 22, 238)


                     Jimp.loadFont(paths.FONTS + "product_24_black_bold.fnt").then(function (levelf) {
 Jimp.loadFont(paths.FONTS + "visitor_12_black.fnt").then(async function (rfont) {

                                 var rrank = new Jimp(90, 32, 0x00000000, function (err, image) {});
                                 rrank.print(levelf, 0, 0, `${rubys} x`,80, Jimp.ALIGN_FONT_RIGHT);
                                frame.composite(rrank, 256, 55)



     for (i=0;i<medals.length/3-1;i++){
        // if (medals[i].file=="undefined") return;
         let ii = 43*i+1
         var nametag = new Jimp(32, 10, 0x00000000, async function (err, image) {});
         nametag.print(rfont, 0, 0, `${medals[i].name}`, 30, Jimp.ALIGN_FONT_CENTER);
         await frame.composite(nametag, 128 + ii, 86)

         var pricetag = new Jimp(32, 10, 0x00000000, async function (err, image) {});
         pricetag.print(rfont, 0, 0, `${medals[i].price}`, 30, Jimp.ALIGN_FONT_CENTER);
         await frame.composite(pricetag, 128 + ii, 130)

         //----
          var nametag = new Jimp(32, 10, 0x00000000, async function (err, image) {});
         nametag.print(rfont, 0, 0, `${medals[i+6].name}`, 30, Jimp.ALIGN_FONT_CENTER);
         await frame.composite(nametag, 128 + ii, 150)

         var pricetag = new Jimp(32, 10, 0x00000000, async function (err, image) {});
         pricetag.print(rfont, 0, 0, `${medals[i+6].price}`, 30, Jimp.ALIGN_FONT_CENTER);
         await frame.composite(pricetag, 128 + ii, 195)

         //----
          var nametag = new Jimp(32, 10, 0x00000000, async function (err, image) {});
         nametag.print(rfont, 0, 0, `${medals[i+12].name}`, 30, Jimp.ALIGN_FONT_CENTER);
         await frame.composite(nametag, 128 + ii, 216)

         var pricetag = new Jimp(32, 10, 0x00000000, async function (err, image) {});
         pricetag.print(rfont, 0, 0, `${medals[i+12].price}`, 30, Jimp.ALIGN_FONT_CENTER);
         await frame.composite(pricetag, 128 + ii, 260)

         //----

     }

              frame.composite(md1, 130, 98) //+25 down
              frame.composite(md2, 130+44, 98) //+25 down
              frame.composite(md3, 130+88, 98) //+25 down




                                 frame.getBuffer(Jimp.MIME_PNG, async function (err, image) {
                                await message.channel.sendFile(image)
                                 })

                 }).catch(e=>console.log(e))
                 }).catch(e=>console.log(e))
                 }).catch(e=>console.log(e))
                 }).catch(e=>console.log(e))
                 }).catch(e=>console.log(e))
                 }).catch(e=>console.log(e))
                 }).catch(e=>console.log(e))
                 }).catch(e=>console.log(e))
                 }).catch(e=>console.log(e))
                 }).catch(e=>console.log(e))
                 }).catch(e=>console.log(e))
                 }).catch(e=>console.log(e))
                 }).catch(e=>console.log(e))
                 }).catch(e=>console.log(e))
                 }).catch(e=>console.log(e))
                 }).catch(e=>console.log(e))
                 }).catch(e=>console.log(e))
                 }).catch(e=>console.log(e))
                 }).catch(e=>console.log(e))
                 }).catch(e=>console.log(e))
                 }).catch(e=>console.log(e))
                 }).catch(e=>console.log(e))




                 message.channel.sendMessage("Type Medal Number").then(me=>{
                      return new Promise(async resolve => {

                var oldDropsly = Channel.DROPSLY
                const responses = await Channel.awaitMessages(msg2 =>
                    msg2.content === '1'||
                    msg2.content === '2'||
                    msg2.content === '3'
                    , {
                        maxMatches: 1
                    }
                ).catch();
                if (responses.size === 0) {} else {
                    var index = Number(responses.first().content);
                    var medal = medals[index-1]
                    Channel.sendFile(paths.MEDALS+ medal.file+'.png', "medal.png", "This one? \n You Need "+medal.price+gear.emoji("ruby")+"\n `ok` Confirm \n `c` Cancel").then(me=>{
                      return new Promise(async resolve => {

                var oldDropsly = Channel.DROPSLY
                const responses = await Channel.awaitMessages(msg3 =>
                    msg3.content === 'c'||
                    msg3.content === 'ok'
                    , {
                        maxMatches: 1
                    }
                ).catch();
                if (responses.size === 0) {} else {

                    if(responses.first().content == "ok"){
                      //  if (!gear.checkGoods(medal.price,Author)){
                      //      return message.reply("No Funds")
                      //  }else{
                            gear.paramAdd(Author,"medalInventory",medal.file)
                          // gear.paramIncrement(Author,"goodies",-medal.price)
                            return message.reply("Confirmed!")
                      //  }
                    }

                }

                      })


                 }).catch()

                }

                      })


                 })


             }

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


    }
    )
     }





    )

      }



module.exports = {
    pub: true,
    cmd: cmd,
    perms: 3,
    init: init,
    cat: 'misc'
};
