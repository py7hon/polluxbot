var paths = require("../paths.js");
var gear = require("../gearbox.js");
var locale = require('../../utils/multilang_b');
var mm = locale.getT();


var cmd = 'welcome';



var init = function (message, userDB, DB) {
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

    var modPass = gear.hasPerms(Member,DB)

    if (!modPass) {
        return message.reply(mm('CMD.moderationNeeded', {
            lngs: LANG
        })).catch(console.error);
    }

    let defaultgreet = {
                hi: false,
                joinText: "Welcome to the Server %username%!",
                greetChan: {}
            }
if (!DB.get(Server.id).modules.GREET || DB.get(Server.id).modules.GREET===undefined){
    gear.paramDefine(Server,"GREET",defaultgreet)
}
   var On      = gear.emoji("check")
var Off     = gear.emoji("xmark")

var input="X"
    var v = {
        inON: On+mm('greet.helloON', {
            lngs: LANG
        }),
        inOFF: Off+mm('greet.helloOFF', {
            lngs: LANG
        }),
        inTX: mm('greet.inTex', {
            lngs: LANG,
            intex: input
        }),
        inCX: mm('greet.inChan', {
            lngs: LANG,
            intex: input
        }),
        tellMsg: mm('greet.tellmeMSG', {
            lngs: LANG
        }),
        tellChn: mm('greet.tellmeCHN', {
            lngs: LANG
        })
    }




    if (args.length >= 2 && args[0] === "msg") {
        if (args.length == 2) {
            return Channel.send(v.tellMsg);
        }
        let offset = MSG.indexOf("msg") + 3
        gear.paramDefine(Server, "GREET.joinText", MSG.substr(offset))
         v.inTX = mm('greet.inTex', {
            lngs: LANG,
            wtxt: MSG.substr(offset)
        })
        return Channel.send(v.inTX);
    }
    if (args.length >= 2 && args[0] === "channel") {
        if (args.length == 2) {
            return Channel.send(v.tellChn);
        }
        let offset = MSG.indexOf("channel") + 7
        gear.paramDefine(Server, "GREET.greetChan", message.mentions.channels.first().id)
        return Channel.send(v.inCX);
    }



    if (DB.get(Server.id).modules.GREET.hi === true) {
        gear.paramDefine(Server, "GREET.hi", false)
        gear.paramDefine(Server, "GREET.greetChan", "")
        return Channel.send(v.inOFF);

    } else {
        gear.paramDefine(Server, "GREET.hi", true)
        gear.paramDefine(Server, "GREET.greetChan", "")
        gear.paramDefine(Server, "GREET.greetChan", message.channel.id)
        return Channel.send(v.inON);
    }





}
module.exports = {
    pub: true,
    cmd: cmd,
    perms: 0,
    init: init,
    cat: 'server'
};
