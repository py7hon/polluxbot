
const arraySort = require('array-sort')
const fs = require("fs");
const gear = require('../../gearbox.js')
var locale = require('../../../utils/multilang_b');
var mm = locale.getT();
var cmd = 'cashrank';
var init = function (message,userDB,DB) {


    var Server = message.guild;
    var Channel = message.channel;
    var Author = message.author;
    if (Author.bot) return;
    var Member = Server.member(Author);
    var Target = message.mentions.users.first() || Author;
    var MSG = message.content;
    var bot = message.botUser

    var args = MSG.split(' ').slice(1)[0]
    var LANG = message.lang;
    //-------MAGIC----------------

    gear.paramIncrement(Author,'goodies',0)
      gear.paramIncrement(Author,'goodies',0)



//HELP TRIGGER
    let helpkey = mm("helpkey",{lngs:message.lang})
if (MSG.split(" ")[1]==helpkey || MSG.split(" ")[1]=="?"|| MSG.split(" ")[1]=="help"){
    return gear.usage(cmd,message);
}
//------------




var emojya = bot.emojis.get('276878246589497344')
    let GOODMOJI = emojya
    let GOOD = 'Ruby'
    if (DB.get(Server.id).modules.GOODMOJI) {
        GOODMOJI = DB.get(Server.id).modules.GOODMOJI
    }
    if (DB.get(Server.id).modules.GOODNAME) {
        GOOD = DB.get(Server.id).modules.GOODNAME
    }
    emb = new gear.Discord.RichEmbed();
    var rankItem = []
    var ranked = []
     userDB.forEach(j=>{
            var i = JSON.parse(j)


   if (args === "sv"|| args =="server"||args=="guild"||args=="s") {
        if(!Server.members.has(i.ID)) return;
     }

       if (i.name === 'Pollux' ||i.name == undefined) {}
        else {
            rankItem.name = i.name
            rankItem.goodies = i.modules.goodies
            rankItem.level = i.modules.level
            ranked.push(rankItem)
            rankItem = []
        }
    })
    arraySort(ranked, 'goodies', {
        reverse: true
    })

    emb.setColor('#e22449')
    emb.title = "WEALTH RANK"
    emb.setAuthor('Pollux', bot.user.avatarURL, 'https://github.com/LucasFlicky/polluxbot')
        emb.setFooter('If you are not being displayed here, contact the creator immediately for a fix.')
    emb.setThumbnail("https://raw.githubusercontent.com/LucasFlicky/polluxbot/master/resources/imgres/emoji/ruby.png")
        // emb.setImage("https://raw.githubusercontent.com/LucasFlicky/polluxbot/master/avis/2.png")
        //    emb.description = "Os Top-5 mais rubificadoss do server"
var medals = [':first_place: 1st',
':second_place: 2nd',
':third_place: 3rd'
, ':medal: 4th'
, ':medal: 5th'
]
    console.log("WALRUS")
    for (i = 0; i < ranked.length; i++) {
        if (i < 5) {

            emb.addField(medals[i], ranked[i].name, true)
            emb.addField(GOOD + 's', ranked[i].goodies + "" + GOODMOJI, true)
        }
    }
    message.channel.send({embed:emb}).catch(e=>{message.reply(mm("error.iNeedThesePerms",{lngs:LANG,PERMSLIST:"`SEND ATTACHMENTS`"}))})

}
 module.exports = {
    pub: true
    , cmd: cmd
    , perms: 0
    , init: init
    , cat: 'misc'
};
