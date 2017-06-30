var paths = require("../paths.js");
var gear = require("../gearbox.js");
var locale = require('../../utils/multilang_b');
var mm = locale.getT();
var cmd = 'greet';



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

    var modPass = gear.hasPerms(Member)

    if (!modPass) {
        return message.reply(mm('CMD.moderatioNeeded', {
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


var input="X"
    var v = {
        inON: mm('greet.helloON', {
            lngs: LANG
        }),
        inOFF: mm('greet.helloOFF', {
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
            return Channel.sendMessage(v.tellMsg);
        }
        let offset = MSG.indexOf("msg") + 3
        gear.paramDefine(Server, "GREET.joinText", MSG.substr(offset))
        return Channel.sendMessage(v.inTX);
    }
    if (args.length >= 2 && args[0] === "channel") {
        if (args.length == 2) {
            return Channel.sendMessage(v.tellChn);
        }
        let offset = MSG.indexOf("channel") + 7
        gear.paramDefine(Server, "GREET.greetChan", message.mentions.channels.first())
        return Channel.sendMessage(v.inCX);
    }



    if (DB.get(Server.id).modules.GREET.hi === true) {
        gear.paramDefine(Server, "GREET.hi", false)
        return Channel.sendMessage(v.inOFF);

    } else {
        gear.paramDefine(Server, "GREET.hi", true)
        return Channel.sendMessage(v.inON);
    }





}
module.exports = {
    pub: true,
    cmd: cmd,
    perms: 0,
    init: init,
    cat: 'server'
};
